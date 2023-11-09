import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import * as fromQuestion from '../question.reducer';


export interface State {

  [fromQuestion.questionFeatureKey]: fromQuestion.questionState;
  // [fromQuestion.postQuestionFeatureKey]: fromQuestion.postQuestionState;
};

export const reducers: ActionReducerMap<State> = {

  [fromQuestion.questionFeatureKey]: fromQuestion.QuestionReducer,
  // [fromQuestion.postQuestionFeatureKey]: fromQuestion.postQuestionReducer,
};


export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
