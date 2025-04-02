export interface ITableDefinition<T> {
  columns: IColumnDefinition[];
  dataSource: T[];
  displayedColumns: string[];
  dataType: string;
}

export interface IColumnDefinition{
  columnDef: string;
  header: string;
  width?: string;
  editable: boolean;
  cell?: (element: any) => string;
  actions?: { 
    label: string;
    operationKind: OperationKind; 
    icon: string;
  }[];
}

export enum OperationKind{
  Remove = 1,
  Update = 2
}