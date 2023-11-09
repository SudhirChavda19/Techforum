import { QuestionReducer, initialState } from './question.reducer';

describe('Question Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = QuestionReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
