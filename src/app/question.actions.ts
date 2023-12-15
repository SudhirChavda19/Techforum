import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Question } from './model/question';
import { PostQuestion, Questions } from './model/questions';

export const QuestionActions = createActionGroup({
  source: 'Question',
  events: {
    'Load Questions': props<{page:number, limit:number}>(),
    // 'Set Current Page': props<{page:number}>(),
    'Load Questions Success': props<{ questions: Questions}>(),
    'Load Questions Failure': props<{ error: string }>(),
  }
});