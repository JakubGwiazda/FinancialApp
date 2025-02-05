import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SettingValueType } from 'crypto-api/model';

@Component({
  selector: 'app-edit-modal',
  template: `
    <h1 mat-dialog-title>Edit</h1>
    <div mat-dialog-content class="mat-typography">
      <div *ngFor="let key of objectKeys(item)">
      <div class="row mb-3">
        <div class="col-6">
          <label>{{key}}</label>
        </div>
        <div class="col-6">
          <input
            *ngIf="isString(item[key])"
            [(ngModel)]="item[key]"
            type="text"
            matInput
          />
          <input
            *ngIf="isNumber(item[key])"
            [(ngModel)]="item[key]"
            type="number"
            matInput
          />
          <input
            *ngIf="isDate(item[key])"
            [(ngModel)]="item[key]"
            type="date"
            matInput
          />
        </div>
      </div>
    </div>
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
  @Input() item: any;

  constructor(
    public dialogRef: MatDialogRef<EditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.item = data.item;
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
   console.log('this.data')
   console.log(this.data)
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  // Type checking methods for dynamic input
  isString(value: any): boolean {
    return typeof value === 'string';
  }

  isNumber(value: any): boolean {
    return typeof value === 'number';
  }

  isDate(value: any): boolean {
    return value instanceof Date;
  }
}
