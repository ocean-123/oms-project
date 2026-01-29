import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeActivityComponent } from './office-activity.component';

describe('OfficeActivityComponent', () => {
  let component: OfficeActivityComponent;
  let fixture: ComponentFixture<OfficeActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfficeActivityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfficeActivityComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
