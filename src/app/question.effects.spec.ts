import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { QuestionEffects } from './question.effects';

describe('QuestionEffects', () => {
  let actions$: Observable<any>;
  let effects: QuestionEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        QuestionEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(QuestionEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
