import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClaveModalPage } from './clave-modal.page';

describe('ClaveModalPage', () => {
  let component: ClaveModalPage;
  let fixture: ComponentFixture<ClaveModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaveModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
