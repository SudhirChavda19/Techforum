import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { ForumService } from 'src/app/service/forum.service';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/model/question';
import {
  BreakpointObserver,
  BreakpointState,
  Breakpoints,
} from '@angular/cdk/layout';
import { BlogService } from 'src/app/service/blog.service';
import { AuthService } from 'src/app/service/auth.service';
import { SigninSignupComponent } from 'src/app/layout/header/signin-signup/signin-signup.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription, fromEvent, filter, switchMap } from 'rxjs';
// import { Observable, mergeMap, of, map, catchError, exhaustMap, concatMap, switchMap } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { State, Store, select } from '@ngrx/store';
// import { map, filter, scan } from 'rxjs/operators';
import * as fromQuestion from '../../question.selectors';
import { QuestionActions } from 'src/app/question.actions';
import { questionState } from 'src/app/question.reducer';

@Component({
  selector: 'app-questioncard',
  templateUrl: './questioncard.component.html',
  styleUrls: ['./questioncard.component.css'],
})
export class QuestioncardComponent implements OnInit, AfterViewInit {
  public currentPage: number = 1;
  public hasMore: boolean = false;
  public totalPages: number = 0;
  public totalPageArray: any[];

  @ViewChild('continuousFlow', { static: false }) continuousFlow: ElementRef;
  isMobile!: boolean;
  isUserAuthenticated!: boolean;
  public allBlogs: any[];
  public allBlogst: any[];
  public allQuestions: any[] = [];
  public allBookmarks: any[] = [];
  public filteredQuestions: any[] | null;
  isHandset$: Observable<BreakpointState> = this.breakpointObserver.observe(
    Breakpoints.Handset
  );
  pageNumber = 1;
  pageSize = 10;
  public questionsget: any[] = [];
  public bookmarkget: any[] = [];
  words: string[] = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];

  public ansbyid: any;
  public userId = localStorage.getItem('userId');
  public quetionId: any;
  public tagFrequencies: any = {};

  question: Question = {
    _id: '',
    userId: {
      firstName: '',
      lastName: '',
    },
    answer: {
      answer: '',
    },
    question: '',
    questionDescribe: '',
    tags: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  public popularTags: string[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private forum: ForumService,
    private elementRef: ElementRef,
    private breakpointObserver: BreakpointObserver,
    private blogService: BlogService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private store: Store<questionState>
  ) {
    this.breakpointObserver.observe(Breakpoints.Handset).subscribe((result) => {
      this.isMobile = result.matches;
    });
  }
  lineHeight = 20;
  columnWidth = 14;
  columns: number;
  rows: number[];
  speed = 10;
  intervalId: any;

  ngOnInit() {
    this.getQuestion();
    this.getBookmarkByUserId();

    this.isUserAuthenticated = this.authService.isUserAuthenticated();
    this.authService.authChanged.subscribe((authStatus) => {
      this.isUserAuthenticated = authStatus;
      this.cdr.detectChanges();
    });

    if (!this.isUserAuthenticated) {
      this.forum.getBlogTitle().subscribe(
        (res) => {
          // console.log('Blog Title: ', res);

          this.allBlogst = res.blogs;
          // console.log('Blogs Title: ', this.allBlogst);
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      this.blogService.getAllBlogs(this.pageNumber, this.pageSize).subscribe(
        (res: any) => {
          this.allBlogs = res.blogs;
          this.allBlogs = this.allBlogs;
          // console.log('Blogs: ', this.allBlogs);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  ngAfterViewInit() {
    this.columns = Math.floor(
      this.continuousFlow.nativeElement.offsetWidth / this.columnWidth
    );
    this.rows = Array.from({ length: this.columns }, () => 0);

    this.startFallingWords();

    fromEvent(window, 'resize')
      .pipe(debounceTime(100))
      .subscribe(() => {
        this.columns = Math.floor(
          this.continuousFlow.nativeElement.offsetWidth / this.columnWidth
        );
        this.rows = Array.from({ length: this.columns }, () => 0);
      });
  }
  startFallingWords() {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(() => {
      this.addRow();
    }, this.speed);
  }

  addRow() {
    const rowIndex = Math.floor(Math.random() * this.columns);
    const wordsCount = Math.floor(Math.random() * (5 - 2 + 1) + 2);
    const words: string[] = [];
    const opacities: number[] = [];

    for (let i = 0; i < wordsCount; i++) {
      const letterIndex = Math.floor(Math.random() * this.words.length);
      const letter = this.words[letterIndex];
      words.push(letter);

      const opacity = Math.random() * (1 - 0.3) + 0.3;
      opacities.push(opacity);
    }

    const lineDiv = document.createElement('div');
    lineDiv.className = 'line';

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const opacity = opacities[i];

      const wordDiv = document.createElement('div');
      wordDiv.innerText = word;
      wordDiv.style.opacity = opacity.toString();
      lineDiv.appendChild(wordDiv);
    }

    lineDiv.style.position = 'absolute';
    lineDiv.style.right = `${rowIndex * this.columnWidth}px`;
    lineDiv.style.top = `${-this.lineHeight}px`;
    this.continuousFlow.nativeElement.appendChild(lineDiv);

    const animationTime = 130;
    const distance =
      this.continuousFlow.nativeElement.offsetHeight + this.lineHeight;
    const speed = distance / animationTime;

    let currentPosition = -this.lineHeight;
    const interval = setInterval(() => {
      currentPosition += speed;
      if (currentPosition >= distance) {
        clearInterval(interval);
        this.continuousFlow.nativeElement.removeChild(lineDiv);
      } else {
        lineDiv.style.top = `${currentPosition}px`;
      }
    }, 7);
  }
  isColliding(top: number, left: number, width: number): boolean {
    const elements =
      this.continuousFlow.nativeElement.querySelectorAll('.line > div');
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i] as HTMLElement;
      const rect = element.getBoundingClientRect();
      if (
        top >= rect.top - this.lineHeight &&
        top <= rect.bottom &&
        left >= rect.left - width &&
        left <= rect.right
      ) {
        return true;
      }
    }
    return false;
  }
  addBookmark(userId: any, questionId: any) {
    this.forum
      .addRemoveBookmark({
        userId: userId,
        questionId: questionId,
      })
      .subscribe({
        next: (res) => {
          this.allBookmarks.push(res);
          this.getBookmarkByUserId();
        },
        error: (err) => {
          console.log('Error while sending the data ' + err);
        },
      });
  }

  openSignInDialog(): void {
    const dialogRef = this.dialog.open(SigninSignupComponent, {
      width: 'auto',
    });
  }

  toggleBookmark(questionId: string) {
    if (!this.userId) {
      this.openSignInDialog();
    } else {
      this.isBookmarked(questionId);
      this.addBookmark(this.userId, questionId);
      this.getBookmarkByUserId();
    }
  }

  isBookmarked(questionId: string) {
    return this.allBookmarks?.some(
      (bookmark) => bookmark.questionId === questionId
    );
  }

  public checkData: any;
  getQuestion() {
    let loadingQuestions = false;
    const pageSize = 8;

    const questions$ = this.store.pipe(
      select(fromQuestion.getQuestionsForCurrentPage, {
        currentPage: this.currentPage,
      })
    );

    questions$
      //   .pipe(
      //     filter((res: any) => res.length === 0 && !this.loadingQuestions),
      //     switchMap(() => {
      //       // Set a flag to prevent multiple dispatches
      //       console.log("IN SWITCH MAP");

      //       this.loadingQuestions = true;

      //       // this.store.dispatch(
      //       //   QuestionActions.setCurrentPage({ page: this.currentPage })
      //       // );
      //       // Data for the current page is not in the store, fetch it from the backend
      //       this.store.dispatch(
      //         QuestionActions.loadQuestions({
      //           page: this.currentPage,
      //           limit: pageSize,
      //         })
      //       );

      //       return this.store.pipe(
      //         select(fromQuestion.getQuestionsForCurrentPage, {
      //           currentPage: this.currentPage,
      //         })
      //       );
      //     })
      //   )
      .subscribe((res) => {
        // console.log("RESPONSE: ", res);
        
        if (res.length === 0 && !loadingQuestions) {
          console.log("IN IF-----");
          loadingQuestions = true;
          this.store.dispatch(
            QuestionActions.loadQuestions({
              page: this.currentPage,
              limit: pageSize,
            })
          );

          this.store.pipe(
            select(fromQuestion.getQuestionsForCurrentPage, {
              currentPage: this.currentPage,
            })
          ).subscribe((res) => {
            this.checkData = res;
          });
        } else {
          console.log("IN ELSE---");
          loadingQuestions = true;
          
          this.checkData = res;
        }
        console.log('CHECKDATA-- ', this.checkData);

        this.allQuestions = this.checkData.data;
        this.hasMore = this.checkData.hasMore;
        this.totalPages = this.checkData.totalPages;

        this.totalPageArray = [...Array(this.totalPages).keys()].map(
          (x) => x + 1
        );
        this.getAnswerById();

        this.allQuestions?.forEach((question: any) => {
          question.tags?.forEach((tag: any) => {
            if (tag in this.tagFrequencies) {
              this.tagFrequencies[tag]++;
            } else {
              this.tagFrequencies[tag] = 1;
            }
          });
        });
        // console.log('frequencies tag: ', this.tagFrequencies);
        this.popularTags = Object.keys(this.tagFrequencies).filter(
          (tag) => this.tagFrequencies[tag] > 1
        );

        loadingQuestions = false;
        // console.log('populer tag: ', this.popularTags);
      });

    // this.store.pipe(select(fromQuestion.getError)).subscribe({
    //   next: (res) => {
    //     // this.allQuestions = question;
    //     console.log('NGRX DATA ERROR :: ', res);
    //   },
    // });
  }

  onNextPage() {
    if (this.hasMore) {
      this.currentPage++;
      this.getQuestion();
    }
  }

  onSetPage(page: number) {
    this.currentPage = page;
    this.getQuestion();
  }

  onPrevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getQuestion();
    }
  }

  isCurrentPage(page: number) {
    return this.currentPage === page;
  }

  getBookmarkByUserId() {
    this.forum.getBookmarkByUserId(this.userId).subscribe({
      next: (res) => {
        this.allBookmarks = res.data;
        // console.log('bookmark get: ', this.allBookmarks);
      },
      error: (err) => {
        console.log('Error while getting the data ' + err);
      },
    });
  }
  getAnswerById() {
    for (let question of this.allQuestions) {
      this.forum.getAnswerById(question._id).subscribe((res: any) => {
        question = Object.isExtensible(question) ? question : { ...question };
        question.answer =
          res.data[0] === undefined ? { answer: '' } : res.data[0];
      });
    }
  }
  public getBlog(id: any) {
    this.router.navigate(['blog', id]);
  }

  public queClick(e: any, id: any) {
    e.preventDefault();
    this.router.navigate(['queanspage', id]);
  }

  public filterQuestion(tag: any) {
    this.filteredQuestions = this.allQuestions.filter((question: any) =>
      question.tags?.includes(tag)
    );
    console.log('Filterd Questions: ', this.filteredQuestions);
  }

  public clearFilter() {
    this.filteredQuestions = null;
  }
}
