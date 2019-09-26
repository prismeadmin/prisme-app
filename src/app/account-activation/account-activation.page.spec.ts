import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountActivationPage } from './account-activation.page';

describe('AccountActivationPage', () => {
  let component: AccountActivationPage;
  let fixture: ComponentFixture<AccountActivationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountActivationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountActivationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
