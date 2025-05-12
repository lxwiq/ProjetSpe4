import {Component, OnInit} from '@angular/core';
import {UsersService} from '../../core/services/users.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  users : any[] = [];
  constructor(private usersService: UsersService) {
  }

  ngOnInit() {
    this.usersService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }
}
