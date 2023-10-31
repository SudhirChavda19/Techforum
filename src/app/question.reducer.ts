import { createReducer, on } from '@ngrx/store';
import { QuestionActions } from './question.actions';
import { Question } from './model/question';
import { act } from '@ngrx/effects';

export const questionFeatureKey = 'questionsState';

export interface questionState {
  questions: any;
  error: string;
}

export const initialState: questionState = {
  questions: {},
  error: '',
};

const reducer = createReducer(
  initialState,
  on(QuestionActions.loadQuestions, (state, action) => ({ ...state})),
  on(QuestionActions.loadQuestionsFailure, (state, action) => {
    return { ...state, questions: {}, error: action.error };
  }),
  on(QuestionActions.loadQuestionsSuccess, (state, action) => ({
    ...state,
    questions: { ...action.questions },
    error: '',
  }))
);

export function QuestionReducer(state:any,action:any) {
  return reducer(state, action);
}