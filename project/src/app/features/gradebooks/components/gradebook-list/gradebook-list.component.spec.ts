import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradebookListComponent } from './gradebook-list.component';

describe('GradebookListComponent', () => {
  let component: GradebookListComponent;
  let fixture: ComponentFixture<GradebookListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GradebookListComponent ],
      imports: [HttpClientTestingModule]

    })
    .compileComponents();

    fixture = TestBed.createComponent(GradebookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
