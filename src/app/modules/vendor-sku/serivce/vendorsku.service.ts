import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { VendorSKU } from '../models/vendorsku';
import { Page } from 'app/shared/models';

@Injectable({
  providedIn: 'root'
})
export class VendorskuService {
  constructor(private http: HttpClient) {}
  baseUrl() {
    return `${environment.apiUrl}`;
  }
  save(id: string | null, vendorsku: VendorSKU): Observable<VendorSKU> {
    if (id) {
      return this.update(id, vendorsku);
    }
    return this.create(vendorsku);
  }

  create(vendorsku: VendorSKU): Observable<VendorSKU> {
    const headers = new HttpHeaders()
      .set(
        "Authorization",
        `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
      )
    let url = this.baseUrl()+"/vendorSku";
    return this.http.post<VendorSKU>(url, vendorsku , {headers});
  }

  update(id: string, vendorsku: VendorSKU): Observable<VendorSKU> {
    const headers = new HttpHeaders()
      .set(
        "Authorization",
        `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
      )
    let url = `${this.baseUrl()}/vendorSku/${id}`;
    return this.http.put<VendorSKU>(url, vendorsku , {headers});
  }

  findById(id: string): Observable<VendorSKU> {
    const headers = new HttpHeaders()
      .set(
        "Authorization",
        `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
      )
    let url = `${this.baseUrl()}/vendorSku/${id}`;
    return this.http.get<VendorSKU>(url , {headers});
  }

  findAll(): Observable<Array<VendorSKU>> {
    const headers = new HttpHeaders()
      .set(
        "Authorization",
        `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
      )
    let url = this.baseUrl()+'/vendorSku';
    return this.http.get<Array<VendorSKU>>(url , {headers});
  }

  findPage(
    pageNumber: number,
    pageSize: number,
    filter: string
  ): Observable<Page<VendorSKU>> {
    const headers = new HttpHeaders()
      .set(
        "Authorization",
        `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
      )
    let url = this.baseUrl() + "/vendorSku/page";
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber);
    params = params.append("pageSize", pageSize);
    params = params.append("filter", filter);
    return this.http.get<Page<VendorSKU>>(url, { params , ...{headers} });
  }
  delete(id: string): Observable<boolean> {
    const headers = new HttpHeaders()
      .set(
        "Authorization",
        `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
      )
    let url = `${this.baseUrl()}/vendorSku/${id}`;
    return this.http.delete<boolean>(url);
  }

  archive(id: string): Observable<void> {
    const headers = new HttpHeaders()
      .set(
        "Authorization",
        `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
      )
    let url = `${this.baseUrl()}/vendorSku/archiver/${id}`;
    return this.http.get<void>(url , {headers});
  }

  disArchive(id: string): Observable<void> {
    const headers = new HttpHeaders()
      .set(
        "Authorization",
        `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
      )
    let url = `${this.baseUrl()}/vendorSku/desarchiver/${id}`;
    return this.http.get<void>(url , {headers});
  }

  findArchivedPage(
    pageNumber: number,
    pageSize: number,
    filter: string
  ): Observable<Page<VendorSKU>> {
    const headers = new HttpHeaders()
      .set(
        "Authorization",
        `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
      )
    let url = this.baseUrl() + "/vendorSku/archived/page";
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber);
    params = params.append("pageSize", pageSize);
    params = params.append("filter", filter);
    return this.http.get<Page<VendorSKU>>(url, { params ,... {headers} });
  }
}
