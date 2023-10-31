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

  public pageSize = 8;

  loadQuestions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuestionActions.QuestionActions.loadQuestions),
      exhaustMap((action) =>
        this.questionService.questionPagination(action.page, action.limit).pipe(
          map((questions) => ({
            type: QuestionActions.QuestionActions.loadQuestionsSuccess.type,
            questions: questions,
          })),
          catchError((error) =>
            of({
              type: QuestionActions.QuestionActions.loadQuestionsFailure.type,
              error: error.error.message,
            })
          )
        )
      )
    )
  );
}
