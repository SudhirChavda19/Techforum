import { createFeatureSelector, createSelector } from '@ngrx/store';
import { questionState } from './question.reducer'

const getQuestionFeatureState = createFeatureSelector<questionState>('questionsState');

export const getQuestions = createSelector(
    getQuestionFeatureState,
    state => state.questions    
)

export const getError = createSelector(
    getQuestionFeatureState,
    state => state.error
)