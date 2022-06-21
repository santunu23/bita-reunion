import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfexComponent } from './pdfex.component';

describe('PdfexComponent', () => {
  let component: PdfexComponent;
  let fixture: ComponentFixture<PdfexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdfexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
