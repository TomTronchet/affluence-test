import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffluenceFormComponent } from './affluence-form.component';

describe('AffluenceFormComponent', () => {
  let component: AffluenceFormComponent;
  let fixture: ComponentFixture<AffluenceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffluenceFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffluenceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
