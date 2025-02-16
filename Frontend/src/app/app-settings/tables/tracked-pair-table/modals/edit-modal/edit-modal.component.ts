import { Component, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SettingValueType } from 'crypto-api/model';
import { ITrackedPairs } from 'src/app/common/interfaces/ITrackedPairs';

@Component({
  selector: 'app-edit-modal',
  template: `
    <h1 mat-dialog-title>Edit</h1>
    <div mat-dialog-content class="mat-typography">
      <div>Crypto symbol: {{ this.data.item.cryptoCurrencySymbol }}</div>
      <div>Reference currency: {{ this.data.item.fiatCurrencySymbol }}</div>
      <form [formGroup]="editForm">
        <mat-checkbox formControlName="collectData">Collect data</mat-checkbox>
      </form>
    </div>
    <div mat-dialog-actions class="d-flex justify-content-end">
      <button mat-flat-button color="warn" (click)="close()">Cancel</button>
      <button mat-flat-button color="primary" (click)="save()">Save</button>
    </div>
  `,
  styleUrl: './edit-modal.component.scss',
  standalone: false,
})
export class EditModalComponent {
  @Input() item: ITrackedPairs;

  editForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.item = data.item;
    this.editForm = this.fb.group({
      collectData: [data.item.collectData],
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    if (this.editForm.valid) {
      const updatedItem: ITrackedPairs = {
        ...this.data.item,
        ...this.editForm.value,
      };
      this.dialogRef.close(updatedItem);
    }
  }
}
