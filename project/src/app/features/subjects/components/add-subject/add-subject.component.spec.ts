import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AddSubjectComponent } from './add-subject.component';

describe('AddSubjectComponent', () => {
  let component: AddSubjectComponent;
  let fixture: ComponentFixture<AddSubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSubjectComponent ],
      imports: [HttpClientTestingModule, BrowserAnimationsModule]

    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
