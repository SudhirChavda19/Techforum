import { createFeatureSelector, createSelector } from '@ngrx/store';
import { questionState, postQuestionState } from './question.reducer'

const getQuestionFeatureState = createFeatureSelector<questionState>('questionsState');
const postQuestionFeatureState = createFeatureSelector<postQuestionState>('postQuestionState');

export const getQuestions = createSelector(
    getQuestionFeatureState,
    state => state.questions    
)

export const getError = createSelector(
    getQuestionFeatureState,
    state => state.error
)

export const PostQuestion = createSelector(
    postQuestionFeatureState,
    state => state.postQuestion    
)

export const postError = createSelector(
    postQuestionFeatureState,
    state => state.error
)