import { Component, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SettingValueType } from 'crypto-api/model';
import { ITrackedPairs } from 'src/app/app-settings/tables/tracked-pair-table/tracked-pair-table.component';

@Component({
  selector: 'app-edit-modal',
  template: `
    <h1 mat-dialog-title>Edit</h1>
    <div mat-dialog-content class="mat-typography">
    <form [formGroup]="editForm">
        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Crypto Currency Symbol</mat-label>
          <input matInput formControlName="cryptoCurrencySymbol" />
        </mat-form-field>
        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Fiat Currency Symbol</mat-label>
          <input matInput formControlName="fiatCurrencySymbol" />
        </mat-form-field>
      </form>
    </div>
    <div mat-dialog-actions class="d-flex justify-content-end">
      <button mat-flat-button color="warn" (click)="close()">Cancel</button>
      <button mat-flat-button color="primary" (click)="save()">Save</button>
    </div>
  `,
  styleUrl: './edit-modal.component.scss',
  standalone: false
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
      cryptoCurrencySymbol: [data.item.cryptoCurrencySymbol, Validators.required],
      fiatCurrencySymbol: [data.item.fiatCurrencySymbol, Validators.required]
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    if(this.editForm.valid){
      const updatedItem: ITrackedPairs = {
        ...this.data.item, 
        ...this.editForm.value,
      };
      this.dialogRef.close(updatedItem);
    }
  }

}
