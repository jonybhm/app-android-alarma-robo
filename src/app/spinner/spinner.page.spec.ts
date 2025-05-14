import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpinnerPage } from './spinner.page';

describe('SpinnerPage', () => {
  let component: SpinnerPage;
  let fixture: ComponentFixture<SpinnerPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
