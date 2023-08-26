import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Vehicles } from '../models/vehicles';
import { Observable } from 'rxjs';
import { Page } from 'app/shared/models';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {
  constructor(private http: HttpClient) {}

  baseUrl() {
    return `${environment.apiUrl}`;
  }

  save(id: string | null, comp: Vehicles): Observable<Vehicles> {
    if (id) {
      return this.update(id, comp);
    }
    return this.create(comp);
  }

  create(comp: Vehicles): Observable<Vehicles> {
    let url = this.baseUrl()+"/vehicles";
    return this.http.post<Vehicles>(url, comp);
  }

  update(id: string, comp: Vehicles): Observable<Vehicles> {
    let url = `${this.baseUrl()}/vehicles/${id}`;
    return this.http.put<Vehicles>(url, comp);
  }

  findById(id: string): Observable<Vehicles> {
    let url = `${this.baseUrl()}/vehicles/${id}`;
    return this.http.get<Vehicles>(url);
  }

  findAll(): Observable<Array<Vehicles>> {
    let url = this.baseUrl()+'/vehicles';
    return this.http.get<Array<Vehicles>>(url);
  }

  findPage(
    pageNumber: number,
    pageSize: number,
    filter: string
  ): Observable<Page<Vehicles>> {
    let url = this.baseUrl() + "/vehicles/page";
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber);
    params = params.append("pageSize", pageSize);
    params = params.append("filter", filter);
    return this.http.get<Page<Vehicles>>(url, { params });
  }

  delete(id: string): Observable<boolean> {
    let url = `${this.baseUrl()}/vehicles/${id}`;
    return this.http.delete<boolean>(url);
  }

  archive(id: string): Observable<void> {
    let url = `${this.baseUrl()}/vehicles/archiver/${id}`;
    return this.http.get<void>(url);
  }

  disArchive(id: string): Observable<void> {
    let url = `${this.baseUrl()}/vehicles/desarchiver/${id}`;
    return this.http.get<void>(url);
  }

  findArchivedPage(
    pageNumber: number,
    pageSize: number,
    filter: string
  ): Observable<Page<Vehicles>> {
    let url = this.baseUrl() + "/vehicles/archived/page";
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber);
    params = params.append("pageSize", pageSize);
    params = params.append("filter", filter);
    return this.http.get<Page<Vehicles>>(url, { params });
  }
  findbycode(code:any): Observable<Vehicles>{
    let url = `${this.baseUrl()}/vehicles/by-code/${code}`;
    return this.http.get<Vehicles>(url);

  }
  findbyName(name:any): Observable<Vehicles>{
    let url = `${this.baseUrl()}/vehicles/getbyname/${name}`;
    return this.http.get<Vehicles>(url);
  }


  findbylogisticCode(): Observable<string[]>{
    let url = `${this.baseUrl()}/vehicles/getbylogisticUnit`;
    return this.http.get<string[]>(url);
   
  }

}
