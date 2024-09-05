import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginoptionsPage } from './loginoptions.page';

describe('LoginoptionsPage', () => {
  let component: LoginoptionsPage;
  let fixture: ComponentFixture<LoginoptionsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginoptionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
