import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorpListComponent } from './corp-list.component';

describe('CorpListComponent', () => {
  let component: CorpListComponent;
  let fixture: ComponentFixture<CorpListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorpListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorpListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
