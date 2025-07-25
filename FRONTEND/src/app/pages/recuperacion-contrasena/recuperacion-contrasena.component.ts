// recuperar-contrasena.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../core/services/usuario.service';
import { HeaderComponent } from '../../shared/header/header.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-recuperar-contrasena',
  imports: [ReactiveFormsModule,HeaderComponent],
  templateUrl: './recuperacion-contrasena.component.html',
  styleUrl: './recuperacion-contrasena.component.css',
})
export class RecuperarContrasenaComponent {
  form: FormGroup;
  mensaje = '';
  error = '';
  
  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  async enviar() {
    this.mensaje = '';
    this.error = '';
    if (this.form.invalid) return;
    try {
      await this.usuarioService.recuperarContrasena(this.form.value.email);
      this.mensaje = 'Si el correo existe, se ha enviado un enlace para restablecer la contraseña.';
      setTimeout(() => {
      this.router.navigate(['/login']);
    }, 3000); 
    } catch (e) {
      this.error = 'Ocurrió un error. Intenta de nuevo más tarde.';
    }
  }
}