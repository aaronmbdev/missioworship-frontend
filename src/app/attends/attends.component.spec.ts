import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendsComponent } from './attends.component';

describe('AttendsComponent', () => {
  let component: AttendsComponent;
  let fixture: ComponentFixture<AttendsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
