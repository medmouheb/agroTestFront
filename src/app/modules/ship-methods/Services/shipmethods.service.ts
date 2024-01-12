import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShipMethods } from '../models/shipsmethods';
import { Observable } from 'rxjs';
import { Page } from 'app/shared/models';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShipmethodsService {
  constructor(private http: HttpClient) { }
  baseUrl() {
   return `${environment.apiUrl}`;
  //  return "http://localhost:8080"

  }
  save(id: string | null, shipmethods: ShipMethods): Observable<ShipMethods> {
    if (id) {
      return this.update(id, shipmethods);
    }
    return this.create(shipmethods);
  }
  create(shipmethods: ShipMethods): Observable<ShipMethods> {
    const headers = new HttpHeaders()
      .set(
        "Authorization",
        `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
      )
    let url = this.baseUrl()+"/shipmethods";
    return this.http.post<ShipMethods>(url, shipmethods , {headers});
  }

  update(id: string, shipmethods: ShipMethods): Observable<ShipMethods> {
    const headers = new HttpHeaders()
      .set(
        "Authorization",
        `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
      )
    let url = `${this.baseUrl()}/shipmethods/${id}`;
    return this.http.put<ShipMethods>(url, shipmethods , {headers});
  }

  findById(id: string): Observable<ShipMethods> {
    const headers = new HttpHeaders()
      .set(
        "Authorization",
        `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
      )
    let url = `${this.baseUrl()}/shipmethods/${id}`;
    return this.http.get<ShipMethods>(url , {headers});
  }
  findAll(): Observable<Array<ShipMethods>> {
    const headers = new HttpHeaders()
      .set(
        "Authorization",
        `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
      )
    let url = this.baseUrl()+'/shipmethods';
    return this.http.get<Array<ShipMethods>>(url , {headers});
  }

  findPage(
    pageNumber: number,
    pageSize: number,
    filter: string
  ): Observable<Page<ShipMethods>> {
    const headers = new HttpHeaders()
      .set(
        "Authorization",
        `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
      )
    let url = this.baseUrl() + "/shipmethods/page";
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber);
    params = params.append("pageSize", pageSize);
    params = params.append("filter", filter);
    return this.http.get<Page<ShipMethods>>(url, { params  , ...{headers}});
  }

  delete(id: string): Observable<boolean> {
    const headers = new HttpHeaders()
      .set(
        "Authorization",
        `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
      )
    let url = `${this.baseUrl()}/shipmethods/${id}`;
    return this.http.delete<boolean>(url , {headers});
  }

  archive(id: string): Observable<void> {
    const headers = new HttpHeaders()
      .set(
        "Authorization",
        `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
      )
    let url = `${this.baseUrl()}/shipmethods/archiver/${id}`;
    return this.http.get<void>(url , {headers});
  }

  disArchive(id: string): Observable<void> {
    const headers = new HttpHeaders()
      .set(
        "Authorization",
        `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
      )
    let url = `${this.baseUrl()}/shipmethods/desarchiver/${id}`;
    return this.http.get<void>(url , {headers});
  }

  findArchivedPage(
    pageNumber: number,
    pageSize: number,
    filter: string
  ): Observable<Page<ShipMethods>> {
    const headers = new HttpHeaders()
      .set(
        "Authorization",
        `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
      )
    let url = this.baseUrl() + "/shipmethods/archived/page";
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber);
    params = params.append("pageSize", pageSize);
    params = params.append("filter", filter);
    return this.http.get<Page<ShipMethods>>(url, { params  , ...{headers}});
  }

  findbycode(code:any): Observable<ShipMethods>{
    const headers = new HttpHeaders()
      .set(
        "Authorization",
        `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
      )
    let url = `${this.baseUrl()}/shipmethods/by-code/${code}`;
    return this.http.get<ShipMethods>(url , {headers});

  }
  findbyName(name:any): Observable<ShipMethods>{
    const headers = new HttpHeaders()
      .set(
        "Authorization",
        `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
      )
    let url = `${this.baseUrl()}/shipmethods/getbyname/${name}`;
    return this.http.get<ShipMethods>(url , {headers});

  }
}
