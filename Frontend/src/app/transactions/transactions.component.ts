import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';

export interface FileModel{
  blob: Blob
}

export interface ICryptoTransactionData {
  lp: number;
  name: string;
  priceUSD: number;
  pricePLN: number;
  fullUSDPrice: number;
  fullPLNPrice: number;
  amount: number;
  transactionKind:string;
}

export enum TransactionKind{
  Buy = 1,
  Sell = 2
}

export interface TransactionForm{
  cryptoName: FormControl<string | null>;
  priceUSD: FormControl<number | null>;
  amount: FormControl<number | null>;
  fullUSDPrice: FormControl<number | null>;
  transactionKind: FormControl<TransactionKind | null>;
}

const ELEMENT_DATA: ICryptoTransactionData[] = [
  { lp: 1, name: 'BTC',priceUSD:2, pricePLN:8, amount:3, fullUSDPrice:6, fullPLNPrice:24, transactionKind:'Kupno' },
  { lp: 2, name: 'ETH',priceUSD:1, pricePLN:3, amount:3, fullUSDPrice:6, fullPLNPrice:24, transactionKind:'Kupno' },
];

export interface TransactionColumn{
  column: string;
  columnName: string;
}

@Component({
    selector: 'app-transactions',
    templateUrl: './transactions.component.html',
    styleUrl: './transactions.component.scss',
    standalone: false
})
export class TransactionsComponent implements OnInit, AfterViewInit {
  transactionForm: FormGroup;

  displayedColumns: TransactionColumn[] = [
{column: 'lp', columnName: 'Lp'},
{column: 'name', columnName: 'Nazwa'},
{column: 'priceUSD', columnName: 'Cena w USD'},
{column: 'pricePLN', columnName: 'Cena w PLN'},
{column: 'amount', columnName: 'Ilość'},
{column: 'fullUSDPrice', columnName: 'Cała kwota w USD'},
{column: 'fullPLNPrice', columnName: 'Cała kwota w PLN'},
{column: 'transactionKind', columnName: 'Rodzaj transakcji'}];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  availableOptions = [TransactionKind.Buy, TransactionKind.Sell];

  @ViewChild(MatSort) sort!: MatSort;
  public files: any[] = [];
  constructor(private fb: FormBuilder) {

    this.transactionForm = new FormGroup<TransactionForm>({
      amount: new FormControl<number | null>(null, Validators.required),
      cryptoName: new FormControl<string | null>('', Validators.required),
      fullUSDPrice: new FormControl<number | null>(null),
      priceUSD: new FormControl<number | null>(null, Validators.required),
      transactionKind: new FormControl<TransactionKind | null>(null, Validators.required)
    });
  }

  // onFileChange(event: FileList) {
  //   const file: File = event.item(0)!;

  //   const fileToSend: Blob = new Blob([file], { type: file.type });
  //   const formData: FormData = new FormData();
  //   formData.append('file', fileToSend, file.name); // file.name sets the filename

  //   this.transactionService.uploadFile(formData).subscribe(res => console.log(res));

  //   // this.transactionService.uploadFile(formData).subscribe(
  //   // );
  // }

  onFileChange(event: FileList) {
    const file: File = event.item(0)!;
  
    const formData: FormData = new FormData();
    formData.append('file', file); // 'file' odpowiada nazwie parametru w .NET
   // this.transactionService.uploadFile('test','file',file)
  
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  getOptionLabel(option: TransactionKind) {
    switch (option) {
      case TransactionKind.Buy:
        return "Kupno";
      case TransactionKind.Sell:
        return "Sprzedaż";
      default:
        throw new Error("Unsupported option");
    }
  }

  addNewTransaction() {
    console.log('klikam')
    if(this.transactionForm.valid){
      const formValue = this.transactionForm.value;
     
    }
  
  }

  uploadFile($event: string){
    console.log($event)
  }

  getColumnNames(): string[] {
    return this.displayedColumns.map(col => col.column);
  }
}