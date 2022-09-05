import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalGradebookComponent } from './personal-gradebook.component';

describe('PersonalGradebookComponent', () => {
  let component: PersonalGradebookComponent;
  let fixture: ComponentFixture<PersonalGradebookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalGradebookComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalGradebookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
