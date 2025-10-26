import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  formSubmitted = false;
  loginError = false;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
  }

  onSubmit(): void {
    this.formSubmitted = true;

    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      this.authService.login({ username, password }).subscribe({  
        next: (res) => {
          console.log('Login exitoso');
          // Almacenar token en localStorage
          localStorage.setItem('token', res.token);
          // Opcional: guardar también el rol o nombre del usuario
          localStorage.setItem('user', JSON.stringify({ username: res.username, role: res.role, id: res.user_id }));
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error('Error de login', err);
          this.loginError = true;
        }
      });
    }
  }
}
