import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { LogisticUnit } from '../models/logistic-unit';
import { Page } from 'app/shared/models';
import { Company } from 'app/modules/company/models/comany';

@Injectable({
  providedIn: 'root'
})
export class LogisticUnitService {
  constructor(private http: HttpClient) {}

  baseUrl() {
    return `${environment.apiUrl}`;
  }

  save(id: string | null, comp: LogisticUnit): Observable<LogisticUnit> {
    if (id) {
      return this.update(id, comp);
    }
    return this.create(comp);
  }

  create(comp: LogisticUnit): Observable<LogisticUnit> {
    let url = this.baseUrl()+"/logisticunit";
    return this.http.post<LogisticUnit>(url, comp);
  }

  update(id: string, comp: LogisticUnit): Observable<LogisticUnit> {
    let url = `${this.baseUrl()}/logisticunit/${id}`;
    return this.http.put<LogisticUnit>(url, comp);
  }

  findById(id: string): Observable<LogisticUnit> {
    let url = `${this.baseUrl()}/logisticunit/${id}`;
    return this.http.get<LogisticUnit>(url);
  }

  findAll(): Observable<Array<LogisticUnit>> {
    let url = this.baseUrl()+'/logisticunit';
    return this.http.get<Array<LogisticUnit>>(url);
  }

  findPage(
    pageNumber: number,
    pageSize: number,
    filter: string
  ): Observable<Page<LogisticUnit>> {
    let url = this.baseUrl() + "/logisticunit/page";
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber);
    params = params.append("pageSize", pageSize);
    params = params.append("filter", filter);
    return this.http.get<Page<LogisticUnit>>(url, { params });
  }

  delete(id: string): Observable<boolean> {
    let url = `${this.baseUrl()}/logisticunit/${id}`;
    return this.http.delete<boolean>(url);
  }

  archive(id: string): Observable<void> {
    let url = `${this.baseUrl()}/logisticunit/archiver/${id}`;
    return this.http.get<void>(url);
  }

  disArchive(id: string): Observable<void> {
    let url = `${this.baseUrl()}/logisticunit/desarchiver/${id}`;
    return this.http.get<void>(url);
  }



  findArchivedPage(
    pageNumber: number,
    pageSize: number,
    filter: string
  ): Observable<Page<LogisticUnit>> {
    let url = this.baseUrl() + "/logisticunit/archived/page";
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber);
    params = params.append("pageSize", pageSize);
    params = params.append("filter", filter);
    return this.http.get<Page<LogisticUnit>>(url, { params });
  }
  findbycode(code:any): Observable<LogisticUnit>{
    let url = `${this.baseUrl()}/logisticunit/by-code/${code}`;
    return this.http.get<LogisticUnit>(url);

  }
  findbyName(name:any): Observable<LogisticUnit>{
    let url = `${this.baseUrl()}/logisticunit/getbyname/${name}`;
    return this.http.get<LogisticUnit>(url);
  }

  findbycompany(): Observable<string[]>{
    let url = `${this.baseUrl()}/logisticunit/getbycompany`;
    return this.http.get<string[]>(url);
   
  }

  findbydivision(): Observable<string[]>{
    let url = `${this.baseUrl()}/logisticunit/getbydivision`;
    return this.http.get<string[]>(url);
   
  }


}
