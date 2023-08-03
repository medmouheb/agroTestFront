import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Vehicule } from '../models/vehicule';
import { Page } from 'app/shared/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehiculeService {
  constructor(private http: HttpClient) {}

  baseUrl() {
    return `${environment.apiUrl}`;
  }

  save(id: string | null, comp: Vehicule): Observable<Vehicule> {
    if (id) {
      return this.update(id, comp);
    }
    return this.create(comp);
  }

  create(comp: Vehicule): Observable<Vehicule> {
    let url = this.baseUrl()+"/vehicule";
    return this.http.post<Vehicule>(url, comp);
  }

  update(id: string, comp: Vehicule): Observable<Vehicule> {
    let url = `${this.baseUrl()}/vehicule/${id}`;
    return this.http.put<Vehicule>(url, comp);
  }

  findById(id: string): Observable<Vehicule> {
    let url = `${this.baseUrl()}/vehicule/${id}`;
    return this.http.get<Vehicule>(url);
  }

  findAll(): Observable<Array<Vehicule>> {
    let url = this.baseUrl()+'/vehicule';
    return this.http.get<Array<Vehicule>>(url);
  }

  findPage(
    pageNumber: number,
    pageSize: number,
    filter: string
  ): Observable<Page<Vehicule>> {
    let url = this.baseUrl() + "/vehicule/page";
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber);
    params = params.append("pageSize", pageSize);
    params = params.append("filter", filter);
    return this.http.get<Page<Vehicule>>(url, { params });
  }

  delete(id: string): Observable<boolean> {
    let url = `${this.baseUrl()}/vehicule/${id}`;
    return this.http.delete<boolean>(url);
  }

  archive(id: string): Observable<void> {
    let url = `${this.baseUrl()}/vehicule/archiver/${id}`;
    return this.http.get<void>(url);
  }

  disArchive(id: string): Observable<void> {
    let url = `${this.baseUrl()}/vehicule/desarchiver/${id}`;
    return this.http.get<void>(url);
  }

  findArchivedPage(
    pageNumber: number,
    pageSize: number,
    filter: string
  ): Observable<Page<Vehicule>> {
    let url = this.baseUrl() + "/vehicule/archived/page";
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber);
    params = params.append("pageSize", pageSize);
    params = params.append("filter", filter);
    return this.http.get<Page<Vehicule>>(url, { params });
  }
  findbycode(code:any): Observable<Vehicule>{
    let url = `${this.baseUrl()}/vehicule/by-code/${code}`;
    return this.http.get<Vehicule>(url);

  }
  findbyName(name:any): Observable<Vehicule>{
    let url = `${this.baseUrl()}/vehicule/getbyname/${name}`;
    return this.http.get<Vehicule>(url);

  }
}
