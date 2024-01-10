import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { VendorSKU } from "../models/vendorsku";
import { Page } from "app/shared/models";

@Injectable({
  providedIn: "root",
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
    let url = this.baseUrl() + "/vendorSku";
    return this.http.post<VendorSKU>(url, vendorsku);
  }

  update(id: string, vendorsku: VendorSKU): Observable<VendorSKU> {
    let url = `${this.baseUrl()}/vendorSku/${id}`;
    return this.http.put<VendorSKU>(url, vendorsku);
  }

  findById(id: string): Observable<VendorSKU> {
    let url = `${this.baseUrl()}/vendorSku/${id}`;
    return this.http.get<VendorSKU>(url);
  }

  findAll(): Observable<Array<VendorSKU>> {
    let url = this.baseUrl() + "/vendorSku";
    return this.http.get<Array<VendorSKU>>(url);
  }

  findPage(
    pageNumber: number,
    pageSize: number,
    filter: string,
  ): Observable<Page<VendorSKU>> {
    let url = this.baseUrl() + "/vendorSku/page";
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber);
    params = params.append("pageSize", pageSize);
    params = params.append("filter", filter);
    return this.http.get<Page<VendorSKU>>(url, { params });
  }
  delete(id: string): Observable<boolean> {
    let url = `${this.baseUrl()}/vendorSku/${id}`;
    return this.http.delete<boolean>(url);
  }

  archive(id: string): Observable<void> {
    let url = `${this.baseUrl()}/vendorSku/archiver/${id}`;
    return this.http.get<void>(url);
  }

  disArchive(id: string): Observable<void> {
    let url = `${this.baseUrl()}/vendorSku/desarchiver/${id}`;
    return this.http.get<void>(url);
  }

  findArchivedPage(
    pageNumber: number,
    pageSize: number,
    filter: string,
  ): Observable<Page<VendorSKU>> {
    let url = this.baseUrl() + "/vendorSku/archived/page";
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber);
    params = params.append("pageSize", pageSize);
    params = params.append("filter", filter);
    return this.http.get<Page<VendorSKU>>(url, { params });
  }
}
