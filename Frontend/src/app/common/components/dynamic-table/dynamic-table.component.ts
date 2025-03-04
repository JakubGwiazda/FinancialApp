import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  output,
  SimpleChanges,
} from '@angular/core';
import {
  ITableDefinition,
  OperationKind,
} from '../../interfaces/IColumnConfig';

@Component({
  selector: 'app-dynamic-table',
  template: `<div class="table-container">
    <table class="custom-table">
      <thead>
        <tr>
          @for (column of tableData.columns; track $index) {
          <th [style.width]="column.width">
            {{ column.header }}
          </th>
          }
        </tr>
      </thead>
      <tbody>
        @for (row of tableData.dataSource; track $index){
        <tr>
          @for (column of tableData.columns; track $index) {
          <td [style.width]="column.width">
            <ng-container *ngIf="column.cell; else actionButton">
              {{ column?.cell(row) }}
            </ng-container>
            <ng-template #actionButton>
              <button mat-button
                *ngFor="let action of column.actions"
                (click)="onActionClick(row, action.operationKind)"
              >
                <img [src]="action.icon" />
              </button>
            </ng-template>
          </td>
          }
        </tr>
        }
      </tbody>
      <tfoot *ngIf="!tableData.dataSource.length">
        <tr class="no-data">
          <td colspan="4">No data matching the filter</td>
        </tr>
      </tfoot>
    </table>
  </div> `,
  styleUrl: './dynamic-table.component.scss',
  standalone: false,
})
export class DynamicTableComponent<T> {
  @Input() tableData!: ITableDefinition<T>;
  @Output() itemAction = new EventEmitter<{
    item: T;
    operationKind: OperationKind;
    dataType: string;
  }>();

  constructor() {}

  onActionClick(item: T, operationKind: OperationKind) {
    this.itemAction.emit({
      item,
      operationKind,
      dataType: this.tableData.dataType,
    });
  }
}
