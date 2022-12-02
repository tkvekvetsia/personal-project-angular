import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradebookWrapperComponent } from './gradebook-wrapper.component';

describe('GradebookWrapperComponent', () => {
  let component: GradebookWrapperComponent;
  let fixture: ComponentFixture<GradebookWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GradebookWrapperComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GradebookWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
