import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourinvovementComponent } from './yourinvovement.component';

describe('YourinvovementComponent', () => {
  let component: YourinvovementComponent;
  let fixture: ComponentFixture<YourinvovementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YourinvovementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YourinvovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
