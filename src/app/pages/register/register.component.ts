import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [NgIf, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  formSubmitted = false;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  passwordsMatch(): boolean {
    return this.registerForm.value.password === this.registerForm.value.confirmPassword;
  }

  onSubmit(): void {
    this.formSubmitted = true;

    if (this.registerForm.valid && this.passwordsMatch()) {
      const { name, email, password } = this.registerForm.value;

      this.authService.register({
        username: name,
        password: password,
        mail: email
      }).subscribe({
        next: () => {
          console.log('Registro exitoso');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Error en el registro:', err);
        }
      });
    }
  }
}
