import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFilmsListComponent } from './admin-films-list.component';

describe('AdminFilmsListComponent', () => {
  let component: AdminFilmsListComponent;
  let fixture: ComponentFixture<AdminFilmsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminFilmsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFilmsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
