import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IIngredientes } from '../../interfaces/iingredientes.interfaces';
import { lastValueFrom } from 'rxjs';
import { IInventarioResumen } from '../../interfaces/iinventarioresumen.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IngredientesService {

  private httpClient = inject(HttpClient);
  private baseUrl = environment.apiUrl;
  private _totalItems = 0;

  get totalItems() { return this._totalItems; }

  getIngredientes(
    page: number = 1,
    limit: number = 10,
    search: string = '',
    orderBy: string = 'nombre',
    direction: string = '',
    userId: string = '',
    tipo: string = ''
  ): Promise<IIngredientes[]> {
    const params = new HttpParams()
      .set('page', page)
      .set('limit', limit)
      .set('search', search)
      .set('orderBy', orderBy)
      .set('direction', direction)
      .set('id', userId)
      .set('tipo', tipo);

    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}/ingredientes`, { params })).then(
      (resp) => {
        this._totalItems = resp.total;
        return resp.data as IIngredientes[];
      }
    );
  }

  getAllIngredientes(tipo: string, userId: any): Promise<IIngredientes[]> {
    const params = new HttpParams()
      .set('tipo', tipo)
      .set('id', userId);
    return lastValueFrom(this.httpClient.get<IIngredientes[]>(`${this.baseUrl}/ingredientes/all`, {params}));
  }

  getIngredienteById(id: number): Promise<IIngredientes> {
    return lastValueFrom(this.httpClient.get<IIngredientes>(`${this.baseUrl}/ingredientes/${id}`));
  }

  getResumen(tipo: string, userId: string): Promise<IInventarioResumen> {
    const params = new HttpParams()
      .set('id', userId)
      .set('tipo', tipo);
    return lastValueFrom(this.httpClient.get<IInventarioResumen>(`${this.baseUrl}/ingredientes/summary`, { params }));
  }

  createIngrediente(ingrediente: IIngredientes): Promise<IIngredientes> {
    return lastValueFrom(this.httpClient.post<IIngredientes>(`${this.baseUrl}/ingredientes`, ingrediente));
  }
  updateIngrediente(id: number, ingrediente: IIngredientes): Promise<IIngredientes> {
    return lastValueFrom(this.httpClient.put<IIngredientes>(`${this.baseUrl}/ingredientes/${id}`, ingrediente));
  }
  deleteIngrediente(id: number): Promise<void> {
    return lastValueFrom(this.httpClient.delete<void>(`${this.baseUrl}/ingredientes/${id}`));
  }
}
