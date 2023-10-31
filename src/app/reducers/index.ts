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
}

export const reducers: ActionReducerMap<State> = {

  [fromQuestion.questionFeatureKey]: fromQuestion.QuestionReducer,
};


export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
