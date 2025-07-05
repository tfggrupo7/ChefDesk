import { Injectable,  inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { IUsuario } from '../../interfaces/iusuario.interfaces';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../core/services/auth.service';
import { environment } from '../../../environments/environment';

export interface ILogin {
  // Define the properties of ILogin as needed, for example:
  email:string;
  contraseña: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private baseUrl = environment.apiUrl;

 
  httpClient = inject(HttpClient);
  authService = inject(AuthService);

 
  login(usuario: IUsuario): Promise<IUsuario> {
    return lastValueFrom(
      this.httpClient.post<IUsuario>(`${this.baseUrl}/usuarios/login`, usuario, { observe: 'response' })
    ).then(response => response.body as IUsuario);
  }
  register(usuario:IUsuario): Promise<IUsuario> {
    return lastValueFrom(this.httpClient.post<IUsuario>(`${this.baseUrl}/usuarios/registro`, usuario));
  }
  recuperarContrasena(email: string): Promise<void> {
    return lastValueFrom(this.httpClient.post<void>(`${this.baseUrl}/usuarios/recuperar-contrasena`, { email }));
  }

  actualizarContrasena(token: string, nuevaContrasena: string): Promise<any> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  return lastValueFrom(this.httpClient.post(`${this.baseUrl}/usuarios/restablecer-contrasena/${token}`, { nuevaContrasena }, { headers }));
}

cambiarContraseña (token: string, nuevaContraseña: string): Promise<any> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  return lastValueFrom(this.httpClient.post(`${this.baseUrl}/usuarios/cambiar-contrasena/${token}`, { nuevaContraseña }, { headers }));
}

updateUsuario(usuario: IUsuario): Promise<IUsuario> {
  return lastValueFrom(
    this.httpClient.put<IUsuario>(
      `${this.baseUrl}/usuarios`,
      usuario
    )
  );
}
deleteUsuario(id: string): Promise<void> {
  return lastValueFrom(
    this.httpClient.delete<void>(`${this.baseUrl}/usuarios/${id}`)
  );
}

// user.service.ts
getCurrentUser(): Promise<any> {
  const userId = this.authService.getUserId();

  if (!userId) {
    return Promise.reject(new Error('ID de usuario no válido'));
  }

  const url = `${this.baseUrl}/usuarios/${userId}`;
  return lastValueFrom(this.httpClient.get(url));
}
}
