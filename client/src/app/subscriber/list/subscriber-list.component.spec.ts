import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriberListComponent } from './subscriber-list.component';

describe('SubscriberListComponent', () => {
  let component: SubscriberListComponent;
  let fixture: ComponentFixture<SubscriberListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubscriberListComponent]
    });
    fixture = TestBed.createComponent(SubscriberListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
