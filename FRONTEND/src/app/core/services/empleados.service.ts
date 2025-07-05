import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IEmpleados } from '../../interfaces/iempleados.interfaces';
import { lastValueFrom } from 'rxjs';
import { IResponse } from '../../interfaces/iresponse.interfaces';
import { Observable } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmpleadosService {
  private httpClient = inject(HttpClient);
  private baseUrl = environment.apiUrl;
  private currentPage: number = 1;
  private limit: number = 10;
  private totalPages: number = 2;
  private authService = inject(AuthService);

  getEmpleados(): Promise<IEmpleados[]> {
    return lastValueFrom(
      this.httpClient.get<IEmpleados[]>(`${this.baseUrl}/empleados`)
    );
  }

  async cargarEmpleados(page: number): Promise<IResponse> {
    const url = `${this.baseUrl}/empleados?page=${page}&limit=${this.limit}`;
    return lastValueFrom(this.httpClient.get<IResponse>(url));
  }
  getEmpledosAndTareas(): Promise<IEmpleados[]> {
    return lastValueFrom(
      this.httpClient.get<IEmpleados[]>(`${this.baseUrl}/empleados/tareas`)
    );
  }
  getEmpleadoById(id: number): Promise<IEmpleados> {
    return lastValueFrom(this.httpClient.get<IEmpleados>(`${this.baseUrl}/empleados/${id}`));
  }
  createEmpleado(empleado: IEmpleados): Promise<IEmpleados> {
    return lastValueFrom(this.httpClient.post<IEmpleados>(`${this.baseUrl}/empleados`, empleado));
  }
  updateEmpleadoPerfil(empleado: IEmpleados): Promise<IEmpleados> {
    let { id, ...empleadoBody } = empleado;
    id = Number(id);
    if (!id || isNaN(id)) {
      return Promise.reject('ID de empleado inválido');
    }
    return lastValueFrom(
      this.httpClient.put<IEmpleados>(`${this.baseUrl}/empleados/updateEmpleado/${id}`, empleadoBody)
    );
  }
  updateEmpleado(empleado: IEmpleados): Promise<IEmpleados> {
    let { id, ...empleadoBody } = empleado;
    id = Number(id);
    if (!id || isNaN(id)) {
      return Promise.reject('ID de empleado inválido');
    }
    return lastValueFrom(
      this.httpClient.put<IEmpleados>(`${this.baseUrl}/empleados/${id}`, empleadoBody)
    );
  }
  deleteEmpleado(id: number): Promise<void> {
    return lastValueFrom(this.httpClient.delete<void>(`${this.baseUrl}/empleados/${id}`));
  }
  obtenerRoles(id: number): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.baseUrl}/empleados/role/${id}`);
  }
  cambiarContraseña(empleadoId: number, nuevaContraseña: string): Promise<any> {
    return lastValueFrom(
      this.httpClient.post(
        `${this.baseUrl}/empleados/cambiar-contrasena/${empleadoId}`,
        { nuevaContraseña }
      )
    );
  }
  getCurrentUser(): Promise<any> {
    const userId = this.authService.getEmpleadoId();
    if (!userId) {
      return Promise.reject(new Error('ID de empleado no válido'));
    }
    const url = `${this.baseUrl}/empleados/${userId}`;
    return lastValueFrom(this.httpClient.get(url));
  }
}
