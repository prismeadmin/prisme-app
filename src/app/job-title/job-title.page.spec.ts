import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobTitlePage } from './job-title.page';

describe('JobTitlePage', () => {
  let component: JobTitlePage;
  let fixture: ComponentFixture<JobTitlePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobTitlePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobTitlePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
