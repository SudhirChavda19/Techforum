import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, mergeMap, of, map, catchError, exhaustMap } from 'rxjs';
import * as QuestionActions from './question.actions';
import { ForumService } from './service/forum.service';
import { Question } from './model/question';

@Injectable()
export class QuestionEffects {
  constructor(
    private actions$: Actions,
    private questionService: ForumService
  ) {}

  loadQuestions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuestionActions.QuestionActions.loadQuestions),
      exhaustMap((action) =>
        this.questionService.questionPagination(action.page, action.limit).pipe(
          map((questions) => {
            console.log("QUESTION: ", questions);
            return QuestionActions.QuestionActions.loadQuestionsSuccess({
              questions: questions,
            })
          }),
          catchError((error) =>
            of(QuestionActions.QuestionActions.loadQuestionsFailure({error: error.error.message}))
        )
      )
    )
  ));

  postQuestions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuestionActions.PostQuestionActions.postQuestions),
      exhaustMap((action) =>
        this.questionService.postQuestion(action.postQuestionData).pipe(
          map((postQuestion) => {
            console.log("QUESTION: ", postQuestion);
            return QuestionActions.PostQuestionActions.postQuestionsSuccess({
              postQuestion: postQuestion,
            })
          }),
          catchError((error) =>
            of(QuestionActions.PostQuestionActions.postQuestionsFailure({error: error.error.message}))
        )
      )
    )
  ));
}
