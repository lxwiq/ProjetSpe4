import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
  standalone: true
})
export class ButtonComponent {
  @Input() disabled: boolean = false;
  @Input() class: string = '';
}
