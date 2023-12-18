import { createReducer, on } from '@ngrx/store';
import { QuestionActions } from './question.actions';
import { act } from '@ngrx/effects';
import { PostQuestion, Questions } from './model/questions';
import { Pagination } from './model/pagination';

export const questionFeatureKey = 'questionsState';

export interface questionState {
  pages: { [page: number]: Questions[] };
  currentPage: number;
  limit: number;
  error: string;
}
export const initialState: questionState = {
  pages: {},
  currentPage: 0,
  limit: 0,
  error: '',
};

const reducer = createReducer(
  initialState,
  on(QuestionActions.loadQuestions, (state, action) => ({
    ...state,
    currentPage: action.page,
    limit: action.limit,
  })),
  // on(QuestionActions.setCurrentPage, (state, action) => ({
  //   ...state,
  //   currentPage: action.page,
  // })),
  on(QuestionActions.loadQuestionsFailure, (state:any, action:any) => {
    return { ...state, pages: { ...state.pages, [state.currentPage]: [] }, error: action.error };
  }),
  on(QuestionActions.loadQuestionsSuccess, (state:any, action:any) => {
    // console.log('STATE: ', state);
    // console.log('ACTION: ', action);
    return {
      ...state,
      pages: { ...state.pages, [state.currentPage]: action.questions },
      error: '',
    };
  })
);

export function QuestionReducer(state: any, action: any) {
  return reducer(state, action);
}

