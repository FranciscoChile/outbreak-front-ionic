import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RadioPage } from './radio.page';

describe('RadioPage', () => {
  let component: RadioPage;
  let fixture: ComponentFixture<RadioPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RadioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
