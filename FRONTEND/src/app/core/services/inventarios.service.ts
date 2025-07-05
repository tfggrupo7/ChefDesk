import { Injectable, inject } from '@angular/core';
import { IInventarios } from '../../interfaces/iinventarios.interfaces';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class InventariosService {
  private httpClient = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  getInventarios(): Promise<IInventarios[]> {
    return lastValueFrom(this.httpClient.get<IInventarios[]>(`${this.baseUrl}/inventarios`));
  }
  getInventarioById(id: number): Promise<IInventarios> {
    return lastValueFrom(
      this.httpClient.get<IInventarios>(`${this.baseUrl}/inventarios/${id}`)
    );
  }
  createInventario(inventario: IInventarios): Promise<IInventarios> {
    return lastValueFrom(
      this.httpClient.post<IInventarios>(`${this.baseUrl}/inventarios`, inventario)
    );
  }
  updateInventario(
    id: number,
    inventario: IInventarios
  ): Promise<IInventarios> {
    return lastValueFrom(
      this.httpClient.put<IInventarios>(`${this.baseUrl}/inventarios/${id}`, inventario)
    );
  }
  deleteInventario(id: number): Promise<void> {
    return lastValueFrom(this.httpClient.delete<void>(`${this.baseUrl}/inventarios/${id}`));
  }
}
