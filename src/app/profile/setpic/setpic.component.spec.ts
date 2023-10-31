import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetpicComponent } from './setpic.component';

describe('SetpicComponent', () => {
  let component: SetpicComponent;
  let fixture: ComponentFixture<SetpicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetpicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetpicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
