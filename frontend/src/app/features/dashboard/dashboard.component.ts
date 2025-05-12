import {Component, OnInit} from '@angular/core';
import {UsersService} from '../../core/services/users.service';
import {DocumentsService} from '../../core/services/documents.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  documents: any[] = [];
  tree: any[] = [];
  users: any[] = [];

  constructor(private usersService: UsersService, private documentsService: DocumentsService) {
  }

  ngOnInit() {
    this.usersService.getUsers().subscribe((users) => {
      this.users = users;
    });

    this.documentsService.getDocuments().subscribe((documents) => {
      this.documents = documents;
      this.tree = this.buildTree(this.documents, null);
    });
  }

  buildTree(items: any[], parentId: number | null): any[] {
    return items
      .filter(item => item.parent_folder_id === parentId)
      .map(item => ({
        ...item,
        children: this.buildTree(items, item.id) // Appel récursif pour les enfants
      }));
  }

}
