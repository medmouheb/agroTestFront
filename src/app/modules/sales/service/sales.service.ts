import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Page } from 'app/shared/models';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Sales } from '../models/sales';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(private http: HttpClient) {}

  baseUrl() {
    return `${environment.apiUrl}`;
  }

  save(id: string | null, sales: Sales): Observable<Sales> {
    if (id) {
      return this.update(id, sales);
    }
    return this.create(sales);
  }

  create(sales: Sales): Observable<Sales> {
    let url = this.baseUrl()+'/sales';
    return this.http.post<Sales>(url, sales);
  }

  update(id: string, sales: Sales): Observable<Sales> {
    let url = `${this.baseUrl()}/sales/${id}`;
    return this.http.put<Sales>(url, sales);
  }

  findById(id: string): Observable<Sales> {
    let url = `${this.baseUrl()}/sales/${id}`;
    return this.http.get<Sales>(url);
  }

  findAll(): Observable<Array<Sales>> {
    let url = this.baseUrl()+'/sales';
    return this.http.get<Array<Sales>>(url);
  }

  findPage(
    pageNumber: number,
    pageSize: number,
    filter: string
  ): Observable<Page<Sales>> {
    let url = this.baseUrl() + "/sales/page";
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber);
    params = params.append("pageSize", pageSize);
    params = params.append("filter", filter);
    return this.http.get<Page<Sales>>(url, { params });
  }

  delete(id: string): Observable<boolean> {
    let url = `${this.baseUrl()}/sales/${id}`;
    return this.http.delete<boolean>(url);
  }

  archive(id: string): Observable<void> {
    let url = `${this.baseUrl()}/sales/archiver/${id}`;
    return this.http.get<void>(url);
  }

  disArchive(id: string): Observable<void> {
    let url = `${this.baseUrl()}/sales/desarchiver/${id}`;
    return this.http.get<void>(url);
  }

  findArchivedPage(
    pageNumber: number,
    pageSize: number,
    filter: string
  ): Observable<Page<Sales>> {
    let url = this.baseUrl() + "/sales/archived/page";
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber);
    params = params.append("pageSize", pageSize);
    params = params.append("filter", filter);
    return this.http.get<Page<Sales>>(url, { params });
  }
  findbycode(code:any): Observable<Sales>{
    let url = `${this.baseUrl()}/sales/by-code/${code}`;
    return this.http.get<Sales>(url);

  }
  findbyName(name:any): Observable<Sales>{
    let url = `${this.baseUrl()}/sales/getbyname/${name}`;
    return this.http.get<Sales>(url);

  }
}
