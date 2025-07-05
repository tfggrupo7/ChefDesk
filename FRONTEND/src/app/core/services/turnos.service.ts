/**
 * Servicio Angular para gestionar la entidad **Turnos**.
 * ------------------------------------------------------
 * Encapsula todas las llamadas HTTP (CRUD) hacia la API
 * `/api/turnos`.
 */
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITurnos } from '../../interfaces/iturnos.interfaces';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root', // Servicio singleton a nivel de aplicación
})
export class TurnosService {

  private httpClient = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  /**
   * GET /api/turnos
   * --------------------------------------------------
   * Recupera todos los turnos. La API espera un JWT en la cabecera
   * `Authorization`.  Si el token no existe, se lanza un error
   * sin llegar a hacer la petición.
   *
   * @returns Promise<ITurnos[]> Resuelve con el array recibido
   */
  getTurnos(): Promise<ITurnos[]> {
   
    // lastValueFrom convierte Observable en Promise<response>
    return lastValueFrom(
      this.httpClient.get<{ data: ITurnos[] }>(`${this.baseUrl}/turnos`)
    ).then(r => r.data);
  }

  /**
   * GET /api/turnos/hoy?date=YYYY-MM-DD
   * --------------------------------------------------
   * Recupera los turnos filtrados por una fecha concreta.
   * @param date Fecha en formato YYYY-MM-DD
   * @returns Promise<ITurnos[]> Array de turnos para la fecha indicada
   */
  getTurnosByDate(date: string): Promise<ITurnos[]> {

    return lastValueFrom(
      this.httpClient.get<ITurnos[]>(`${this.baseUrl}/turnos/date/${date}`)
    );
  }


  /**
   * GET /api/turnos/:id
   * --------------------------------------------------
   * Obtiene un turno por su ID.
   * @param id PK del turno
   * @returns Promise<ITurnos>
   */
  getTurnoById(id: number): Promise<ITurnos> {
    return lastValueFrom(this.httpClient.get<ITurnos>(`${this.baseUrl}/turnos/${id}`));
  }

  /**
   * POST /api/turnos
   * --------------------------------------------------
   * Crea un turno nuevo.
   * @param turno Payload que cumple la interfaz ITurnos
   * @returns Promise<ITurnos> Registro creado
   */
  createTurno(turno: ITurnos): Promise<ITurnos> {
    return lastValueFrom(this.httpClient.post<ITurnos>(`${this.baseUrl}/turnos`, turno));
  }

  /**
   * PUT /api/turnos/:id
   * --------------------------------------------------
   * Actualiza un turno existente.
   * @param id    Clave primaria
   * @param turno Campos modificados
   * @returns Promise<ITurnos> Registro resultante
   */
  updateTurno(id: number, turno: ITurnos): Promise<ITurnos> {
    return lastValueFrom(
      this.httpClient.put<ITurnos>(`${this.baseUrl}/turnos/${id}`, turno)
    );
  }

  /**
   * DELETE /api/turnos/:id
   * --------------------------------------------------
   * Elimina un turno.  La API responde con un mensaje y la lista
   * restante de turnos; el genérico refleja esa estructura.
   * @param id PK del turno a borrar
   * @returns Promise<{ message: string; data: ITurnos[] }>
   */
  deleteTurno(id: number): Promise<{ message: string; data: ITurnos[] }> {

    return lastValueFrom(
      this.httpClient.delete<{ message: string; data: ITurnos[] }>(
        `${this.baseUrl}/turnos/${id}`
    )
  )
  }

  getTurnosByEmpleado(empleadoId: number): Promise<ITurnos[]> {
  return lastValueFrom (this.httpClient.get<ITurnos[]>(`${this.baseUrl}/turnos/empleado/${empleadoId}`));
}

  // En tu turnosService
getTurnosByDateAndEmpleado(fecha: string, empleadoId: number): Promise<ITurnos[]> {
  return lastValueFrom(this.httpClient.get<ITurnos[]>(`${this.baseUrl}/turnos/fecha/${fecha}/empleado/${empleadoId}`));
}
 sendTurnosByEmail(turnos: ITurnos[]): Promise<void> {
    return lastValueFrom(
      this.httpClient.post<void>(
        `${this.baseUrl}/turnos/send/pdf`,
        { turnos }
      )
    );
  }
  sendTurnosEmpleadoByEmail(empleadoId: number, email: string): Promise<void> {
    return lastValueFrom(
      this.httpClient.post<void>(
        `${this.baseUrl}/turnos/empleado/${empleadoId}/send/pdf`,
        { empleadoId, email }
      )
    );
  }
  downloadTurnos(): Promise<Blob> {
    return lastValueFrom(
      this.httpClient.get(`${this.baseUrl}/turnos/export/pdf`, {
        responseType: 'blob'
      })
    );
  }
  downloadTurnosPorId(empleadoId: number): Promise<Blob> {
    return lastValueFrom(
      this.httpClient.get(`${this.baseUrl}/turnos/empleado/${empleadoId}/pdf`, {
        responseType: 'blob'
      })
    );
  }
  getTurnosAndEmpleadoById(id: number): Promise<ITurnos[]> {
      return lastValueFrom(
        this.httpClient.get<ITurnos[]>(`${this.baseUrl}/turnos/empleado/${id}`)
      );
    }
}
