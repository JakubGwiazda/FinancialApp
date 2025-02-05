export interface ITableDefinition {
  columns: IColumnDefinition[];
  dataSource: [];
  displayedColumns: string[];
}

export interface IColumnDefinition{
  columnDef: string;
  header: string;
  width?: string;
  cell?: (element: any) => string;
  actions?: { 
    label: string;
    operationKind: OperationKind 
  }[];
}

export enum OperationKind{
  Remove = 1,
  Update = 2
}