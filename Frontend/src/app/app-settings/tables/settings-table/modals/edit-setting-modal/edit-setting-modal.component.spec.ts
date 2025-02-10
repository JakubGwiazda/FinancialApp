import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSettingModalComponent } from './edit-setting-modal.component';

describe('EditSettingModalComponent', () => {
  let component: EditSettingModalComponent;
  let fixture: ComponentFixture<EditSettingModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditSettingModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSettingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
