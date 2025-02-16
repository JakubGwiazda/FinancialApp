import { ApplicationRef, Component, ComponentFactoryResolver, ComponentRef, ElementRef, EventEmitter, HostListener, Injector, Output, Renderer2, ViewChild } from '@angular/core';
import { PopUpComponent } from '../pop-up/pop-up.component';

@Component({
  selector: 'app-draggable-window',
  template: `<div #draggable class="draggable" draggable="true">Przeciągnij mnie!</div>`,
    styles: [`
    .draggable {
      width: 200px;
      height: 100px;
      background: lightblue;
      cursor: grab;
      text-align: center;
      line-height: 100px;
      font-weight: bold;
      border: 2px solid blue;
    }
  `],
  standalone: false
})
export class DraggableWindowComponent {
  @ViewChild('draggable') draggableElement!: ElementRef;
  @Output() windowOpened = new EventEmitter<Window>();

  private newWindow: Window | null = null;
  private componentRef: any;
  private isDragging = false;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  ngAfterViewInit() {
    const element = this.draggableElement.nativeElement;

    element.addEventListener('dragstart', () => {
      this.isDragging = true;
    });

    element.addEventListener('dragend', (event: DragEvent) => {
      this.isDragging = false;
      if (this.isOutsideWindow(event)) {
        this.openNewWindow();
      }
    });
  }

  private isOutsideWindow(event: DragEvent): boolean {
    return (
      event.clientX < 0 ||
      event.clientY < 0 ||
      event.clientX > window.innerWidth ||
      event.clientY > window.innerHeight
    );
  }

  private openNewWindow() {
    if (this.newWindow && !this.newWindow.closed) {
      this.newWindow.focus();
      return;
    }

    this.newWindow = window.open('', '_blank', 'width=400,height=300');
    if (this.newWindow) {
      this.newWindow.document.write(`
        <html>
          <head>
            <title>Nowe Okno</title>
            <style>
              body { margin: 0; display: flex; align-items: center; justify-content: center; height: 100vh; }
              #app-root { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; }
            </style>
          </head>
          <body>
            <div id="app-root"></div>
            <script>
              window.opener.postMessage({ opened: true }, "*");
              window.addEventListener("message", (event) => {
                if (event.data && event.data.color) {
                  document.body.style.background = event.data.color;
                }
              });
              window.addEventListener("beforeunload", () => {
                window.opener.postMessage({ closed: true }, "*");
              });
            </script>
          </body>
        </html>
      `);

      setTimeout(() => this.bootstrapNewWindow(), 0);

      // Emitujemy referencję do nowego okna
      this.windowOpened.emit(this.newWindow);
    }
  }

  private bootstrapNewWindow() {
    if (!this.newWindow) return;

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(PopUpComponent);
    this.componentRef = componentFactory.create(this.injector);

    this.appRef.attachView(this.componentRef.hostView);
    
    const newWindowBody = this.newWindow.document.getElementById('app-root');
    if (newWindowBody) {
      newWindowBody.appendChild((this.componentRef.hostView as any).rootNodes[0]);
    }
  }

  sendMessageToPopup(color: string) {
    if (this.newWindow && !this.newWindow.closed) {
      this.newWindow.postMessage({ color }, '*');
    }
  }
}
