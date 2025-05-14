import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-stats.component.html'
})
export class UserStatsComponent {
  @Input() documentCount = 0;
  @Input() folderCount = 0;
  @Input() collaborativeDocumentCount = 0;
}
