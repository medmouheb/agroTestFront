import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Willaya } from '../models/willaya';
import { Observable } from 'rxjs';
import { Page } from 'app/shared/models';

@Injectable({
  providedIn: 'root'
})
export class WillayaService {

  constructor(private http: HttpClient) { }
  baseUrl() {
    return `${environment.apiUrl}`;
  }
  save(id: string | null, willaya: Willaya): Observable<Willaya> {
    if (id) {
      return this.update(id, willaya);
    }
    return this.create(willaya);
  }
  create(willaya: Willaya): Observable<Willaya> {
    let url = this.baseUrl()+"/willaya";
    return this.http.post<Willaya>(url, willaya);
  }

  update(id: string, willaya: Willaya): Observable<Willaya> {
    let url = `${this.baseUrl()}/willaya/${id}`;
    return this.http.put<Willaya>(url, willaya);
  }

  findById(id: string): Observable<Willaya> {
    let url = `${this.baseUrl()}/willaya/${id}`;
    return this.http.get<Willaya>(url);
  }
  findAll(): Observable<Array<Willaya>> {
    let url = this.baseUrl()+'/willaya';
    return this.http.get<Array<Willaya>>(url);
  }

  findPage(
    pageNumber: number,
    pageSize: number,
    filter: string
  ): Observable<Page<Willaya>> {
    let url = this.baseUrl() + "/willaya/page";
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber);
    params = params.append("pageSize", pageSize);
    params = params.append("filter", filter);
    return this.http.get<Page<Willaya>>(url, { params });
  }

  delete(id: string): Observable<boolean> {
    let url = `${this.baseUrl()}/willaya/${id}`;
    return this.http.delete<boolean>(url);
  }

  archive(id: string): Observable<void> {
    let url = `${this.baseUrl()}/willaya/archiver/${id}`;
    return this.http.get<void>(url);
  }

  disArchive(id: string): Observable<void> {
    let url = `${this.baseUrl()}/willaya/desarchiver/${id}`;
    return this.http.get<void>(url);
  }

  findArchivedPage(
    pageNumber: number,
    pageSize: number,
    filter: string
  ): Observable<Page<Willaya>> {
    let url = this.baseUrl() + "/willaya/archived/page";
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber);
    params = params.append("pageSize", pageSize);
    params = params.append("filter", filter);
    return this.http.get<Page<Willaya>>(url, { params });
  }
}
