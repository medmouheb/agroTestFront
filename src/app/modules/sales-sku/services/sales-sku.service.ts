import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Page } from "app/shared/models";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { SalesSKU } from "../models/salesSku";

@Injectable({
  providedIn: "root",
})
export class SalesSkuService {
  constructor(private http: HttpClient) {}
  baseUrl() {
    return `${environment.apiUrl}`;
  }
  save(id: string | null, salessku: SalesSKU): Observable<SalesSKU> {
    if (id) {
      return this.update(id, salessku);
    }
    return this.create(salessku);
  }

  create(salessku: SalesSKU): Observable<SalesSKU> {
    let url = this.baseUrl() + "/salesSku";
    return this.http.post<SalesSKU>(url, salessku);
  }

  update(id: string, salessku: SalesSKU): Observable<SalesSKU> {
    let url = `${this.baseUrl()}/salesSku/${id}`;
    return this.http.put<SalesSKU>(url, salessku);
  }

  findById(id: string): Observable<SalesSKU> {
    let url = `${this.baseUrl()}/salesSku/${id}`;
    return this.http.get<SalesSKU>(url);
  }

  findAll(): Observable<Array<SalesSKU>> {
    let url = this.baseUrl() + "/salesSku";
    return this.http.get<Array<SalesSKU>>(url);
  }

  findPage(
    pageNumber: number,
    pageSize: number,
    filter: string,
  ): Observable<Page<SalesSKU>> {
    let url = this.baseUrl() + "/salesSku/page";
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber);
    params = params.append("pageSize", pageSize);
    params = params.append("filter", filter);
    return this.http.get<Page<SalesSKU>>(url, { params });
  }
  delete(id: string): Observable<boolean> {
    let url = `${this.baseUrl()}/salesSku/${id}`;
    return this.http.delete<boolean>(url);
  }

  archive(id: string): Observable<void> {
    let url = `${this.baseUrl()}/salesSku/archiver/${id}`;
    return this.http.get<void>(url);
  }

  disArchive(id: string): Observable<void> {
    let url = `${this.baseUrl()}/salesSku/desarchiver/${id}`;
    return this.http.get<void>(url);
  }

  findArchivedPage(
    pageNumber: number,
    pageSize: number,
    filter: string,
  ): Observable<Page<SalesSKU>> {
    let url = this.baseUrl() + "/salesSku/archived/page";
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber);
    params = params.append("pageSize", pageSize);
    params = params.append("filter", filter);
    return this.http.get<Page<SalesSKU>>(url, { params });
  }
}
