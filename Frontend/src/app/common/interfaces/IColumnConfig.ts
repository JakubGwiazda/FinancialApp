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
  action?: (item: any) => void;
}