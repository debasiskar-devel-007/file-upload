import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewFilesComponent } from './preview-files.component';

describe('PreviewFilesComponent', () => {
  let component: PreviewFilesComponent;
  let fixture: ComponentFixture<PreviewFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewFilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
