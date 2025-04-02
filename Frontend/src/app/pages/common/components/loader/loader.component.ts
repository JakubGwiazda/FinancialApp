import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  template: `
    <div class="loader-overlay" *ngIf="loading">
        <div class="spinner"></div>
    </div>`,
  styleUrl: './loader.component.scss',
  standalone: false
})
export class LoaderComponent {
  @Input() loading!: boolean;
}
