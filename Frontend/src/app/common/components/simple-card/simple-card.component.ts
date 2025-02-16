import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-simple-card',
  imports: [MatCardModule],
  templateUrl: './simple-card.component.html',
  styleUrl: './simple-card.component.scss',
})
export class SimpleCardComponent {

@Input() title!: string;

}
