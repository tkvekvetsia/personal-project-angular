import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AddGradebookComponent } from './add-gradebook.component';

describe('AddGradebookComponent', () => {
  let component: AddGradebookComponent;
  let fixture: ComponentFixture<AddGradebookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddGradebookComponent ],
      imports:[BrowserAnimationsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddGradebookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
