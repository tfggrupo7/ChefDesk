import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITareas } from '../../interfaces/itareas.interfaces';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TareasService {
  private httpClient = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  getTareas(): Promise<ITareas[]> {
    return lastValueFrom(this.httpClient.get<ITareas[]>(`${this.baseUrl}/tareas`));
  }
  getTareasAndEmpleadoById(id: number): Promise<ITareas[]> {
    return lastValueFrom(
      this.httpClient.get<ITareas[]>(`${this.baseUrl}/tareas/empleado/${id}`)
    );
  }
  getTareaById(id: number): Promise<ITareas> {
    return lastValueFrom(this.httpClient.get<ITareas>(`${this.baseUrl}/tareas/${id}`));
  }
  createTarea(tarea: ITareas): Promise<ITareas> {
    return lastValueFrom(this.httpClient.post<ITareas>(`${this.baseUrl}/tareas`, tarea));
  }
  updateTarea(id: number, tarea: ITareas): Promise<ITareas> {
    return lastValueFrom(
      this.httpClient.put<ITareas>(`${this.baseUrl}/tareas/${id}`, tarea)
    );
  }
  deleteTarea(id: number): Promise<void> {
    return lastValueFrom(this.httpClient.delete<void>(`${this.baseUrl}/tareas/${id}`));
  }
  sendTareasByEmail(tareas: ITareas[]): Promise<void> {
    return lastValueFrom(
      this.httpClient.post<void>(
        `${this.baseUrl}/tareas/send/pdf`,
        { tareas }
      )
    );
  }
  sendTareasEmpleadoByEmail(empleadoId: number, email: string): Promise<void> {
    return lastValueFrom(
      this.httpClient.post<void>(
        `${this.baseUrl}/tareas/empleado/${empleadoId}/send/pdf`,
        { empleadoId, email }
      )
    );
  }
  downloadTareas(): Promise<Blob> {
    const token = localStorage.getItem('token');
    return lastValueFrom(
      this.httpClient.get(`${this.baseUrl}/tareas/export/pdf`, {
        responseType: 'blob'
      })
    );
  }
  downloadTareasPorId(empleadoId: number): Promise<Blob> {
    return lastValueFrom(
      this.httpClient.get(`${this.baseUrl}/tareas/empleado/${empleadoId}/export/pdf`, {
        responseType: 'blob'
      })
    );
  }
}
