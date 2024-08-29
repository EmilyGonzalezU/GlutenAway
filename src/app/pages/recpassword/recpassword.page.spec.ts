import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecpasswordPage } from './recpassword.page';

describe('RecpasswordPage', () => {
  let component: RecpasswordPage;
  let fixture: ComponentFixture<RecpasswordPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RecpasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
