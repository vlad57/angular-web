import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFilmAddComponent } from './admin-film-add.component';

describe('AdminFilmAddComponent', () => {
  let component: AdminFilmAddComponent;
  let fixture: ComponentFixture<AdminFilmAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminFilmAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFilmAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
