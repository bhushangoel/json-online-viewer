import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegexHelpComponent } from './regex-help.component';

describe('RegexHelpComponent', () => {
  let component: RegexHelpComponent;
  let fixture: ComponentFixture<RegexHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegexHelpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegexHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
