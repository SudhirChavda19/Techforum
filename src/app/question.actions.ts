import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Question } from './model/question';
import { PostQuestion, Questions } from './model/questions';

export const QuestionActions = createActionGroup({
  source: 'Question',
  events: {
    'Load Questions': props<{page:number, limit:number}>(),
    'Load Questions Success': props<{ questions: Questions}>(),
    'Load Questions Failure': props<{ error: string }>(),
  }
});

export const PostQuestionActions = createActionGroup({
  source: 'Question',
  events: {
    'Post Questions': props<{postQuestionData:any}>(),
    'Post Questions Success': props<{ postQuestion: PostQuestion}>(),
    'Post Questions Failure': props<{ error: string }>(),
  }
});
  