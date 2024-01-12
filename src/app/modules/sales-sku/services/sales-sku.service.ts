import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
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
    const headers = new HttpHeaders().set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${
        JSON.parse(localStorage.getItem("tocken")).accessToken
      }`,
    );
    let url = this.baseUrl() + "/salesSku";
    return this.http.post<SalesSKU>(url, salessku, { headers });
  }

  update(id: string, salessku: SalesSKU): Observable<SalesSKU> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${
        JSON.parse(localStorage.getItem("tocken")).accessToken
      }`,
    );
    let url = `${this.baseUrl()}/salesSku/${id}`;
    return this.http.put<SalesSKU>(url, salessku, { headers });
  }

  findById(id: string): Observable<SalesSKU> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${
        JSON.parse(localStorage.getItem("tocken")).accessToken
      }`,
    );
    let url = `${this.baseUrl()}/salesSku/${id}`;
    return this.http.get<SalesSKU>(url, { headers });
  }

  findAll(): Observable<Array<SalesSKU>> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${
        JSON.parse(localStorage.getItem("tocken")).accessToken
      }`,
    );
    let url = this.baseUrl() + "/salesSku";
    return this.http.get<Array<SalesSKU>>(url, { headers });
  }

  findPage(
    pageNumber: number,
    pageSize: number,
    filter: string,
  ): Observable<Page<SalesSKU>> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${
        JSON.parse(localStorage.getItem("tocken")).accessToken
      }`,
    );
    let url = this.baseUrl() + "/salesSku/page";
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber);
    params = params.append("pageSize", pageSize);
    params = params.append("filter", filter);
    return this.http.get<Page<SalesSKU>>(url, { params, ...{ headers } });
  }
  delete(id: string): Observable<boolean> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${
        JSON.parse(localStorage.getItem("tocken")).accessToken
      }`,
    );
    let url = `${this.baseUrl()}/salesSku/${id}`;
    return this.http.delete<boolean>(url, { headers });
  }

  archive(id: string): Observable<void> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${
        JSON.parse(localStorage.getItem("tocken")).accessToken
      }`,
    );
    let url = `${this.baseUrl()}/salesSku/archiver/${id}`;
    return this.http.get<void>(url, { headers });
  }

  disArchive(id: string): Observable<void> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${
        JSON.parse(localStorage.getItem("tocken")).accessToken
      }`,
    );
    let url = `${this.baseUrl()}/salesSku/desarchiver/${id}`;
    return this.http.get<void>(url, { headers });
  }

  findArchivedPage(
    pageNumber: number,
    pageSize: number,
    filter: string,
  ): Observable<Page<SalesSKU>> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${
        JSON.parse(localStorage.getItem("tocken")).accessToken
      }`,
    );
    let url = this.baseUrl() + "/salesSku/archived/page";
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber);
    params = params.append("pageSize", pageSize);
    params = params.append("filter", filter);
    return this.http.get<Page<SalesSKU>>(url, { params, ...{ headers } });
  }
}
