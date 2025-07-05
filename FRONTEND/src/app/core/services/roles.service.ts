import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { IRoles } from '../../interfaces/iroles.interfaces';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private httpClient = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  getRoles(): Promise<IRoles[]> {

    return lastValueFrom(
      this.httpClient.get<IRoles[]>(`${this.baseUrl}/roles`)
    );
  }
  getRoleById(id: number): Promise<IRoles> {
    return lastValueFrom(this.httpClient.get<IRoles>(`${this.baseUrl}/roles/${id}`));
  }
  createRole(role: IRoles): Promise<IRoles> {
    return lastValueFrom(this.httpClient.post<IRoles>(`${this.baseUrl}/roles`, role));
  }
  updateRole(id: number, role: IRoles): Promise<IRoles> {
    return lastValueFrom(this.httpClient.put<IRoles>(`${this.baseUrl}/roles/${id}`, role));
  }
  deleteRole(id: number): Promise<void> {
    return lastValueFrom(this.httpClient.delete<void>(`${this.baseUrl}/roles/${id}`));
  }
}
