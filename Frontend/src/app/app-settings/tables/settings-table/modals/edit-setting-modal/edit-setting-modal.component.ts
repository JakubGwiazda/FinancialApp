import { Component, Inject, Input } from '@angular/core';
import { ISettingsTableData } from '../../settings-table.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-setting-modal',
  template: `
    <h1 mat-dialog-title>Edit</h1>
    <div mat-dialog-content class="mat-typography">
      <div>Setting: {{ this.data.item.name }}</div>
      <form [formGroup]="editForm">
        <mat-form-field>
          <mat-label>Value</mat-label>
          <input matInput formControlName="value" />
        </mat-form-field>
      </form>
    </div>
    <div mat-dialog-actions class="d-flex justify-content-end">
      <button mat-flat-button color="warn" (click)="close()">Cancel</button>
      <button mat-flat-button color="primary" (click)="save()">Save</button>
    </div>
  `,
  styleUrl: './edit-setting-modal.component.scss',
  standalone: false,
})
export class EditSettingModalComponent {
  @Input() item: ISettingsTableData;

  editForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditSettingModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.item = data.item;
    this.editForm = this.fb.group({
      value: [data.item.value],
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    if (this.editForm.valid) {
      const updatedItem: ISettingsTableData = {
        ...this.data.item,
        ...this.editForm.value,
      };
      this.dialogRef.close(updatedItem);
    }
  }
}
