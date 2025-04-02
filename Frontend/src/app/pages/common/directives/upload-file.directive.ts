import { Directive, EventEmitter, HostListener, Output, HostBinding } from '@angular/core';

@Directive({
    selector: '[appUploadFile]',
    standalone: false
})
export class UploadFileDirective {

  @Output() filesChangeEmiter: EventEmitter<FileList> = new EventEmitter();

  @HostBinding('style.background')  background = '#d9ebff';
  @HostBinding('style.border')  borderStyle = '3px dotted rgb(117, 175, 240)';

  constructor() { }

  @HostListener('dragover', ['$event']) public onDragOver(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#95bbe6';
    this.borderStyle = '3px dotted #3c83d5';
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#d9ebff';
    this.borderStyle = '3px dotted rgb(117, 175, 240)';
  }

  @HostListener('drop', ['$event']) public onDrop(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#d9ebff';
    this.borderStyle = '3px dotted rgb(117, 175, 240)';
    if (evt.dataTransfer && evt.dataTransfer.files) {
      this.filesChangeEmiter.emit(evt.dataTransfer.files);
    }
  }
}
