import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFilmsComponent } from './user-films.component';

describe('UserFilmsComponent', () => {
  let component: UserFilmsComponent;
  let fixture: ComponentFixture<UserFilmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFilmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFilmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
