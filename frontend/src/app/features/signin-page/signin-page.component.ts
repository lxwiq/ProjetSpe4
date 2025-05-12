import {Component, OnInit} from '@angular/core';
import {ButtonComponent} from '../../core/components/button/button.component';
import {AuthService} from '../../core/services/auth.service';
import {FormControl, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-signin-page',
  imports: [
    ButtonComponent,
    ReactiveFormsModule
  ],
  templateUrl: './signin-page.component.html',
  styleUrl: './signin-page.component.css'
})
export class SigninPageComponent implements OnInit {
  mail = new FormControl('');
  password = new FormControl('');

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.login(this.mail.value || '', this.password.value || '');
    if (this.authService.isLoggedIn()) {
      window.location.href = '/dashboard';
    }
  }

  onSubmit() {
    this.authService.login(this.mail.value || '', this.password.value || '');
    if (this.authService.isLoggedIn()) {
      window.location.href = '/dashboard';
    } else {
      alert('Identifiants incorrects');
    }
  }
}
