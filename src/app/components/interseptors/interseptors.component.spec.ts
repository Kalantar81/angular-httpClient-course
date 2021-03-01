import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterseptorsComponent } from './interseptors.component';

describe('InterseptorsComponent', () => {
  let component: InterseptorsComponent;
  let fixture: ComponentFixture<InterseptorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterseptorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterseptorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
