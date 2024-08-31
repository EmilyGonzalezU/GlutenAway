import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StarterTabPage } from './starter-tab.page';

describe('StarterTabPage', () => {
  let component: StarterTabPage;
  let fixture: ComponentFixture<StarterTabPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StarterTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
