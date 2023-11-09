import { createReducer, on } from '@ngrx/store';
import { QuestionActions } from './question.actions';
import { act } from '@ngrx/effects';
import { PostQuestion, Questions } from './model/questions';
import { Pagination } from './model/pagination';

export const questionFeatureKey = 'questionsState';

export interface questionState {
  questions: Questions | {};
  page:number;
  limit:number;
  error: string;
}

export const initialState: questionState = {
  questions: {},
  page:0,
  limit:0,
  error: '',
};

const reducer = createReducer(
  initialState,
  on(QuestionActions.loadQuestions, (state, action) => ({ ...state, page:action.page, limit:action.limit})),
  on(QuestionActions.loadQuestionsFailure, (state, action) => {
    return { ...state, questions: {}, error: action.error };
  }),
  on(QuestionActions.loadQuestionsSuccess, (state, action) => ({
    ...state,
    questions: action.questions,
    error: '',
  }))
);

export function QuestionReducer(state:any,action:any) {
  return reducer(state, action);
}


// POST Question:

export const postQuestionFeatureKey = 'postQuestionState';
export interface postQuestionState {
  postQuestion: PostQuestion | {};
  error: string;
}

export const initialPostState: postQuestionState = {
  postQuestion: {},
  error: '',
};

export const postQuestionReducer = createReducer(
  initialState,
  on(QuestionActions.loadQuestions, (state, action) => ({ ...state, page:action.page, limit:action.limit})),
  on(QuestionActions.loadQuestionsFailure, (state, action) => {
    return { ...state, questions: {}, error: action.error };
  }),
  on(QuestionActions.loadQuestionsSuccess, (state, action) => ({
    ...state,
    questions: action.questions,
    error: '',
  }))
);
