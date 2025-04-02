import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ITrackedPairs } from 'src/app/pages/common/interfaces/ITrackedPairs';

@Component({
  selector: 'app-delete-modal',
  template: `
  <h1 mat-dialog-title>Remove pair</h1>
    <div mat-dialog-content class="mat-typography">
    {{this.item.cryptoCurrencySymbol}} - {{this.item.fiatCurrencySymbol}} Are you sure to delete pair from tracking?
    </div>
    <div mat-dialog-actions class="d-flex justify-content-end mt-3">
      <button mat-flat-button class="me-3" color="warn" (click)="close()">Cancel</button>
      <button mat-flat-button color="primary" (click)="save()">Save</button>
    </div>
  `,
  styleUrl: './delete-modal.component.scss',
  standalone: false
})
export class DeleteModalComponent {
  @Input() item: ITrackedPairs;

  constructor(public dialogRef: MatDialogRef<DeleteModalComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,){
        this.item = data.item;       
      }

    close(): void {
      this.dialogRef.close(null);
    }
  
    save(): void {     
        this.dialogRef.close(this.item);
    }
}
