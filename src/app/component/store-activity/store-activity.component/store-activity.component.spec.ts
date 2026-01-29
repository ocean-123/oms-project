import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreActivityComponent } from './store-activity.component';

describe('StoreActivityComponent', () => {
  let component: StoreActivityComponent;
  let fixture: ComponentFixture<StoreActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreActivityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreActivityComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
