import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskTrComponent } from './task-tr.component';

describe('TaskTrComponent', () => {
  let component: TaskTrComponent;
  let fixture: ComponentFixture<TaskTrComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskTrComponent]
    });
    fixture = TestBed.createComponent(TaskTrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
