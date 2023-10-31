import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { SigninSignupComponent } from './signin-signup/signin-signup.component';
import {
  BreakpointObserver,
  BreakpointState,
  Breakpoints,
} from '@angular/cdk/layout';
import { Observable, debounce, debounceTime, distinctUntilChanged, fromEvent, map } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../service/auth.service';
import { UserRoleService } from 'src/app/service/user-role.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ForumService } from 'src/app/service/forum.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('input') input: ElementRef;

  public question: string;
  public searchQue: any[];

  isMobile!: boolean;
  isSearchActive = false;
  searchTerm!: string;
  isUserAuthenticated!: boolean;
  isHandset$: Observable<BreakpointState> = this.breakpointObserver.observe(
    Breakpoints.Handset
  );
  userRole: string;
  @Output() public sidenavToggle = new EventEmitter();
  query: string;
  results: any[] = [];
  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    public dialog: MatDialog,
    private authService: AuthService,
    private forumService: ForumService,
    private cdr: ChangeDetectorRef,
    private userRoleService: UserRoleService,
  ) {
    this.breakpointObserver.observe(Breakpoints.Handset).subscribe((result) => {
      this.isMobile = result.matches;
    });
  }
  openSignInDialog(): void {
    const dialogRef = this.dialog.open(SigninSignupComponent, {
      width: 'auto',
    });
  }
  public userId: any = localStorage.getItem('userId');
  ngOnInit(): void {
    this.isUserAuthenticated = this.authService.isUserAuthenticated();
    this.authService.authChanged.subscribe((authStatus) => {
      this.isUserAuthenticated = authStatus;
      this.cdr.detectChanges();
    });
    this.userRoleService.getUserRole(this.userId).subscribe(
      (response) => {
        this.userRole = response.userRole;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  };
  public onAToggleSidenav = () => {
    this.sidenavToggle.emit();
  };

  searchQuestion(value:any) {
    if (value === '') {
      this.searchQue = [];
      return;
    }
    console.log(value);
    this.forumService.searchQuestion(value).subscribe({
      next: (res) => {
        this.searchQue = res.data;
        console.log('Search Question: ', this.searchQue);
      },
      error: (err) => {
        console.log('Error while sending the data ' + err);
      },
    });
  }

  selectResult(id: any, result: any) {
    this.question = result.question;
    this.searchQue = [];
    this.router.navigate(['queanspage', id]);
  }

  // value:any;
    ngAfterViewInit(){
      const value = fromEvent<any>(this.input.nativeElement, 'keyup')
      .pipe(
        map((event:any) => {
          return event.target.value
        }),
        debounceTime(1000),
        // distinctUntilChanged()
      )
      value.subscribe((res:any) => {
          console.log("RES: ",res);
          this.searchQuestion(res)
        }
      )
    }
}
