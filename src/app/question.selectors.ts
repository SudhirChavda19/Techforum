import { createFeatureSelector, createSelector } from '@ngrx/store';
import { questionState } from './question.reducer';

const getQuestionFeatureState =
  createFeatureSelector<questionState>('questionsState');

// export const getQuestions = createSelector(
//     getQuestionFeatureState,
//     state => state.questions
// )

export const getCurrentPage = createSelector(
  getQuestionFeatureState,
  (state) => {
    // console.log("STATE PAGE:  ", state.currentPage);
    return state.currentPage
  }
);

export const getQuestionsForCurrentPage = createSelector(
  getQuestionFeatureState,
  // getCurrentPage,
  (state:any, currentPage:any) => {
    // console.log("CURRENT:::: ", currentPage);
    return state.pages[currentPage.currentPage] || []
  }
);

export const getError = createSelector(
  getQuestionFeatureState,
  (state) => state.error
);
