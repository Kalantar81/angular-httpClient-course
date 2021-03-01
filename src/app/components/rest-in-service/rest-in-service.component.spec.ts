import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestInServiceComponent } from './rest-in-service.component';

describe('RestInServiceComponent', () => {
  let component: RestInServiceComponent;
  let fixture: ComponentFixture<RestInServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestInServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestInServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
