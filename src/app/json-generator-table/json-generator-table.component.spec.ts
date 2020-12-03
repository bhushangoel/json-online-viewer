import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonGeneratorTableComponent } from './json-generator-table.component';

describe('JsonGeneratorTableComponent', () => {
  let component: JsonGeneratorTableComponent;
  let fixture: ComponentFixture<JsonGeneratorTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JsonGeneratorTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JsonGeneratorTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
