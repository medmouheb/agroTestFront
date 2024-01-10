import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Drivers } from "../models/drivers";
import { Observable } from "rxjs";
import { Page } from "app/shared/models";

@Injectable({
  providedIn: "root",
})
export class DriversService {
  constructor(private http: HttpClient) {}

  baseUrl() {
    return `${environment.apiUrl}`;
  }

  save(id: string | null, comp: Drivers): Observable<Drivers> {
    if (id) {
      return this.update(id, comp);
    }
    return this.create(comp);
  }

  create(comp: Drivers): Observable<Drivers> {
    let url = this.baseUrl() + "/drivers";
    return this.http.post<Drivers>(url, comp);
  }

  update(id: string, comp: Drivers): Observable<Drivers> {
    let url = `${this.baseUrl()}/drivers/${id}`;
    return this.http.put<Drivers>(url, comp);
  }

  findById(id: string): Observable<Drivers> {
    let url = `${this.baseUrl()}/drivers/${id}`;
    return this.http.get<Drivers>(url);
  }

  findAll(): Observable<Array<Drivers>> {
    let url = this.baseUrl() + "/drivers";
    return this.http.get<Array<Drivers>>(url);
  }

  findPage(
    pageNumber: number,
    pageSize: number,
    filter: string,
  ): Observable<Page<Drivers>> {
    let url = this.baseUrl() + "/drivers/page";
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber);
    params = params.append("pageSize", pageSize);
    params = params.append("filter", filter);
    return this.http.get<Page<Drivers>>(url, { params });
  }

  delete(id: string): Observable<boolean> {
    let url = `${this.baseUrl()}/drivers/${id}`;
    return this.http.delete<boolean>(url);
  }

  archive(id: string): Observable<void> {
    let url = `${this.baseUrl()}/drivers/archiver/${id}`;
    return this.http.get<void>(url);
  }

  disArchive(id: string): Observable<void> {
    let url = `${this.baseUrl()}/drivers/desarchiver/${id}`;
    return this.http.get<void>(url);
  }

  findArchivedPage(
    pageNumber: number,
    pageSize: number,
    filter: string,
  ): Observable<Page<Drivers>> {
    let url = this.baseUrl() + "/drivers/archived/page";
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber);
    params = params.append("pageSize", pageSize);
    params = params.append("filter", filter);
    return this.http.get<Page<Drivers>>(url, { params });
  }
  findbycode(code: any): Observable<Drivers> {
    let url = `${this.baseUrl()}/drivers/by-code/${code}`;
    return this.http.get<Drivers>(url);
  }
  findbyName(name: any): Observable<Drivers> {
    let url = `${this.baseUrl()}/drivers/getbyname/${name}`;
    return this.http.get<Drivers>(url);
  }

  findbycompanyname(): Observable<string[]> {
    let url = `${this.baseUrl()}/drivers/getbydivision`;
    return this.http.get<string[]>(url);
  }
}
