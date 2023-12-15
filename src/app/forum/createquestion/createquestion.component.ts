import { Component, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatChipEditedEvent } from '@angular/material/chips';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ForumService } from 'src/app/service/forum.service';
import { commonSnackBarConfig } from 'src/app/service/snackbar-config.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store, select } from '@ngrx/store';
import * as fromQuestion from '../../question.selectors';

export interface Fruit {
  tag: string;
}

@Component({
  selector: 'app-createquestion',
  templateUrl: './createquestion.component.html',
  styleUrls: ['./createquestion.component.css'],
})
export class CreatequestionComponent {
  public userId = localStorage.getItem('userId');
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredFruits: Observable<string[]>;
  inputTags: string[] = [];
  allTags: string[] = [];
  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;

  public Editor: any = ClassicEditor;
  public maxLength: number = 2000;

  public question: any;
  public questionDescribe: any;
  public tags: any;
  public submited: boolean = false;
  public getTag: any;

  CreateQuestionForm = new FormGroup({
    question: new FormControl('', [
      Validators.required,
      Validators.maxLength(119),
    ]),
    questionDescribe: new FormControl('', [Validators.maxLength(1200)]),
    tags: new FormControl('', [Validators.maxLength(11)]),
  });

  constructor(private forum: ForumService, private router: Router, private snackBar: MatSnackBar) {
    this.filteredFruits =
      this.CreateQuestionForm.controls.tags.valueChanges.pipe(
        startWith(null),
        map((tag: string | null) =>
          tag ? this._filter(tag) : this.allTags.slice()
        )
      );
  }

  ngOnInit() {
    this.forum.getTags().subscribe({
      next: (res) => {
        this.getTag = res.tags;
        // console.log('Tags: ', this.getTag);
        this.getTag.forEach((tags: any, index: any) => {
          this.allTags[index] = tags.tag;
          // console.log("TAG: ",tags.tag);
        });
        console.log('All Tags: ', this.allTags);
      },
      error: (err: any) => {
        alert('Error while fetching the data' + err);
      },
    });
  }

  get valide() {
    return this.CreateQuestionForm.controls;
  }

  // public isSubmitting = false;
  questionSubmit() {
    // this.submited = true;
    console.log("Ques: ", this.CreateQuestionForm.value);
    console.log("Ques: ", this.inputTags);
    
    if (this.CreateQuestionForm.invalid) return;
    
    // this.store.dispatch(PostQuestionActions.postQuestions({postQuestionData:{
    //   ...this.CreateQuestionForm.value,
    //   tags: this.inputTags,
    //   userId: this.userId,
    // }}));

    // this.store.pipe(select(fromQuestion.PostQuestion)).subscribe({
    //   next: (res:any) => {
    //     console.log('POST DATA NGRX:: ', res);
    //     this.snackBar.open(res.message, 'Dismiss', commonSnackBarConfig);
    //       this.CreateQuestionForm.reset();
    //       this.router.navigate(['/']);
        
    //   },
    //   error: (err) => {
    //     this.snackBar.open(err.error.message, 'Dismiss', commonSnackBarConfig);
    //     console.log("erorr: ", err);
        
    //   },
    // });

    // this.store.pipe(select(fromQuestion.postError)).subscribe({
    //   next: (res) => {
    //     // this.allQuestions = question;
    //     console.log('NGRX DATA ERROR :: ', res);
    //   },
    // });

    this.forum
      .postQuestion({
        ...this.CreateQuestionForm.value,
        tags: this.inputTags,
        userId: this.userId,
      })
      .subscribe({
        next: (result) => {
          console.log(result);
          // this.submited = false;
          this.snackBar.open(result.message, 'Dismiss', commonSnackBarConfig);
          this.CreateQuestionForm.reset();
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.snackBar.open(err.error.message, 'Dismiss', commonSnackBarConfig);
          console.log("erorr: ", err);
          
        },
      });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.inputTags.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
    this.CreateQuestionForm.controls.tags.setValue(null);
  }

  remove(tag: string): void {
    const index = this.inputTags.indexOf(tag);

    if (index >= 0) {
      this.inputTags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.inputTags.push(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.CreateQuestionForm.controls.tags.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTags.filter((tag: any) =>
      tag.toLowerCase().includes(filterValue)
    );
  }
}
function indexOf(tag: any) {
  throw new Error('Function not implemented.');
}
