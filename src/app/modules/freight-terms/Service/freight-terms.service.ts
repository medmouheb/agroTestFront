import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FreightTerms } from '../models/freightterms';
import { Page } from 'app/shared/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FreightTermsService {
  constructor(private http: HttpClient) { }
  baseUrl() {
   // return `${environment.apiUrl}`;
   return "http://localhost:8080" 

  }
  save(id: string | null, freightterms: FreightTerms): Observable<FreightTerms> {
    if (id) {
      return this.update(id, freightterms);
    }
    return this.create(freightterms);
  }
  create(freightterms: FreightTerms): Observable<FreightTerms> {
    let url = this.baseUrl()+"/freightTerms";
    return this.http.post<FreightTerms>(url, freightterms);
  }

  update(id: string, freightterms: FreightTerms): Observable<FreightTerms> {
    let url = `${this.baseUrl()}/freightTerms/${id}`;
    return this.http.put<FreightTerms>(url, freightterms);
  }

  findById(id: string): Observable<FreightTerms> {
    let url = `${this.baseUrl()}/freightTerms/${id}`;
    return this.http.get<FreightTerms>(url);
  }
  findAll(): Observable<Array<FreightTerms>> {
    let url = this.baseUrl()+'/freightTerms';
    return this.http.get<Array<FreightTerms>>(url);
  }

  findPage(
    pageNumber: number,
    pageSize: number,
    filter: string
  ): Observable<Page<FreightTerms>> {
    let url = this.baseUrl() + "/freightTerms/page";
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber);
    params = params.append("pageSize", pageSize);
    params = params.append("filter", filter);
    return this.http.get<Page<FreightTerms>>(url, { params });
  }

  delete(id: string): Observable<boolean> {
    let url = `${this.baseUrl()}/freightTerms/${id}`;
    return this.http.delete<boolean>(url);
  }

  archive(id: string): Observable<void> {
    let url = `${this.baseUrl()}/freightTerms/archiver/${id}`;
    return this.http.get<void>(url);
  }

  disArchive(id: string): Observable<void> {
    let url = `${this.baseUrl()}/freightTerms/desarchiver/${id}`;
    return this.http.get<void>(url);
  }

  findArchivedPage(
    pageNumber: number,
    pageSize: number,
    filter: string
  ): Observable<Page<FreightTerms>> {
    let url = this.baseUrl() + "/freightTerms/archived/page";
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber);
    params = params.append("pageSize", pageSize);
    params = params.append("filter", filter);
    return this.http.get<Page<FreightTerms>>(url, { params });
  }

  findbycode(code:any): Observable<FreightTerms>{
    let url = `${this.baseUrl()}/freightTerms/by-freighttermcode/${code}`;
    return this.http.get<FreightTerms>(url);

  }
  findbyName(name:any): Observable<FreightTerms>{
    let url = `${this.baseUrl()}/freightTerms/getbyfreighttermname/${name}`;
    return this.http.get<FreightTerms>(url);

  }
}
