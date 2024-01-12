import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
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
    const headers = new HttpHeaders()
      .set(
        "Authorization",
        `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
      )
    let url = this.baseUrl()+"/vehicule";
    return this.http.post<Vehicule>(url, comp , {headers});
  }

  update(id: string, comp: Vehicule): Observable<Vehicule> {
    const headers = new HttpHeaders()
      .set(
        "Authorization",
        `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
      )
    let url = `${this.baseUrl()}/vehicule/${id}`;
    return this.http.put<Vehicule>(url, comp , {headers});
  }

  findById(id: string): Observable<Vehicule> {
    const headers = new HttpHeaders()
      .set(
        "Authorization",
        `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
      )
    let url = `${this.baseUrl()}/vehicule/${id}`;
    return this.http.get<Vehicule>(url , {headers});
  }

  findAll(): Observable<Array<Vehicule>> {
    const headers = new HttpHeaders()
      .set(
        "Authorization",
        `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
      )
    let url = this.baseUrl()+'/vehicule';
    return this.http.get<Array<Vehicule>>(url , {headers});
  }

  findPage(
    pageNumber: number,
    pageSize: number,
    filter: string
  ): Observable<Page<Vehicule>> {
    const headers = new HttpHeaders()
      .set(
        "Authorization",
        `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
      )
    let url = this.baseUrl() + "/vehicule/page";
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber);
    params = params.append("pageSize", pageSize);
    params = params.append("filter", filter);
    return this.http.get<Page<Vehicule>>(url, { params  , ...{headers}});
  }

  delete(id: string): Observable<boolean> {
    const headers = new HttpHeaders()
      .set(
        "Authorization",
        `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
      )
    let url = `${this.baseUrl()}/vehicule/${id}`;
    return this.http.delete<boolean>(url , {headers});
  }

  archive(id: string): Observable<void> {
    const headers = new HttpHeaders()
      .set(
        "Authorization",
        `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
      )
    let url = `${this.baseUrl()}/vehicule/archiver/${id}`;
    return this.http.get<void>(url , {headers});
  }

  disArchive(id: string): Observable<void> {
    const headers = new HttpHeaders()
      .set(
        "Authorization",
        `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
      )
    let url = `${this.baseUrl()}/vehicule/desarchiver/${id}`;
    return this.http.get<void>(url , {headers});
  }

  findArchivedPage(
    pageNumber: number,
    pageSize: number,
    filter: string
  ): Observable<Page<Vehicule>> {
    const headers = new HttpHeaders()
      .set(
        "Authorization",
        `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
      )
    let url = this.baseUrl() + "/vehicule/archived/page";
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber);
    params = params.append("pageSize", pageSize);
    params = params.append("filter", filter);
    return this.http.get<Page<Vehicule>>(url, { params ,... {headers} });
  }
  findbycode(code:any): Observable<Vehicule>{
    const headers = new HttpHeaders()
      .set(
        "Authorization",
        `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
      )
    let url = `${this.baseUrl()}/vehicule/by-code/${code}`;
    return this.http.get<Vehicule>(url , {headers});

  }
  findbyName(name:any): Observable<Vehicule>{
    const headers = new HttpHeaders()
      .set(
        "Authorization",
        `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
      )
    let url = `${this.baseUrl()}/vehicule/getbyname/${name}`;
    return this.http.get<Vehicule>(url , {headers});

  }
}
