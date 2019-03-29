import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFilmDetailComponent } from './admin-film-detail.component';

describe('AdminFilmDetailComponent', () => {
  let component: AdminFilmDetailComponent;
  let fixture: ComponentFixture<AdminFilmDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminFilmDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFilmDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
