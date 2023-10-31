import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Question } from './model/question';

export const QuestionActions = createActionGroup({
  source: 'Question',
  events: {
    'Load Questions': props<{page:any, limit:number}>(),
    'Load Questions Success': props<{ questions: any }>(),
    'Load Questions Failure': props<{ error: string }>(),
  }
});
  