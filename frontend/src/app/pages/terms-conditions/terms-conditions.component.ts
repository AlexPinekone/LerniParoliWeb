import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Asegúrate de importar CommonModule si usas *ngFor o *ngIf

@Component({
  selector: 'app-terms-conditions',
  standalone: true, // Asegúrate de que sea standalone
  imports: [CommonModule], // Agrega CommonModule si es necesario
  templateUrl: './terms-conditions.component.html',
  styleUrl: './terms-conditions.component.css'
})
export class TermsConditionsComponent {
  // No se necesita lógica compleja aquí. Es principalmente contenido estático.
}