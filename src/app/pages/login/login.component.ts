import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  formSubmitted = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.formSubmitted = true;
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      // Simulación de autenticación
      if (email === 'test@domain.com' && password === '123456') {
        console.log('Login exitoso');
        this.router.navigate(['/home']);
      } else {
        console.log('Credenciales incorrectas');
      }
    }
  }
}
