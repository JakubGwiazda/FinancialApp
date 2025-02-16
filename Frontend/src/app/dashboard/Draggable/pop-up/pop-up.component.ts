import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pop-up',
  standalone: false,
  template: `
    <div class="popup">
      <h2>Przeciągnięty komponent</h2>
      <p>Otrzymany kolor: {{ backgroundColor }}</p>
    </div>
  `,
  styles: [`
    .popup {
      width: 300px;
      height: 200px;
      background: lightblue;
      border: 3px solid darkblue;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      font-weight: bold;
    }
  `]
})
export class PopUpComponent  implements OnInit{
  backgroundColor: string = 'pink';

  ngOnInit() {
    window.addEventListener("message", (event) => {
      if (event.data && event.data.color) {
        this.backgroundColor = event.data.color;
        document.documentElement.style.setProperty('--bg-color', this.backgroundColor);
      }
    });
  }
}
