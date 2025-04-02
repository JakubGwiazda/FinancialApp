import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackedPairTableComponent } from './tracked-pair-table.component';

describe('TrackedPairTableComponent', () => {
  let component: TrackedPairTableComponent;
  let fixture: ComponentFixture<TrackedPairTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackedPairTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackedPairTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
