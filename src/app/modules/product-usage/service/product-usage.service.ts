import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { ProductUsage } from "../model/product-usage";
import { Page } from "app/shared/models";

@Injectable({
  providedIn: "root",
})
export class ProductUsageService {
  constructor(private http: HttpClient) {}

  baseUrl() {
    return `${environment.apiUrl}`;
  }

  save(id: string | null, comp: ProductUsage): Observable<ProductUsage> {
    if (id) {
      return this.update(id, comp);
    }
    return this.create(comp);
  }

  create(comp: ProductUsage): Observable<ProductUsage> {
    let url = this.baseUrl() + "/UtilisationDuProduit";
    return this.http.post<ProductUsage>(url, comp);
  }

  update(id: string, comp: ProductUsage): Observable<ProductUsage> {
    let url = `${this.baseUrl()}/UtilisationDuProduit/${id}`;
    return this.http.put<ProductUsage>(url, comp);
  }

  findById(id: string): Observable<ProductUsage> {
    let url = `${this.baseUrl()}/UtilisationDuProduit/${id}`;
    return this.http.get<ProductUsage>(url);
  }

  findAll(): Observable<Array<ProductUsage>> {
    let url = this.baseUrl() + "/UtilisationDuProduit";
    return this.http.get<Array<ProductUsage>>(url);
  }

  findPage(
    pageNumber: number,
    pageSize: number,
    filter: string,
  ): Observable<Page<ProductUsage>> {
    let url = this.baseUrl() + "/UtilisationDuProduit/page";
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber);
    params = params.append("pageSize", pageSize);
    params = params.append("filter", filter);
    return this.http.get<Page<ProductUsage>>(url, { params });
  }

  delete(id: string): Observable<boolean> {
    let url = `${this.baseUrl()}/UtilisationDuProduit/${id}`;
    return this.http.delete<boolean>(url);
  }

  archive(id: string): Observable<void> {
    let url = `${this.baseUrl()}/UtilisationDuProduit/archiver/${id}`;
    return this.http.get<void>(url);
  }

  disArchive(id: string): Observable<void> {
    let url = `${this.baseUrl()}/UtilisationDuProduit/desarchiver/${id}`;
    return this.http.get<void>(url);
  }

  findArchivedPage(
    pageNumber: number,
    pageSize: number,
    filter: string,
  ): Observable<Page<ProductUsage>> {
    let url = this.baseUrl() + "/UtilisationDuProduit/archived/page";
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber);
    params = params.append("pageSize", pageSize);
    params = params.append("filter", filter);
    return this.http.get<Page<ProductUsage>>(url, { params });
  }
  findbycode(code: any): Observable<ProductUsage> {
    let url = `${this.baseUrl()}/UtilisationDuProduit/by-code/${code}`;
    return this.http.get<ProductUsage>(url);
  }
  findbyName(name: any): Observable<ProductUsage> {
    let url = `${this.baseUrl()}/UtilisationDuProduit/getbyname/${name}`;
    return this.http.get<ProductUsage>(url);
  }

  getAllproduit(): Observable<string[]> {
    let url = `${this.baseUrl()}/UtilisationDuProduit/getAllproduit`;
    return this.http.get<string[]>(url);
  }
  findProduitName(code: string): Observable<any> {
    let url = `${this.baseUrl()}/UtilisationDuProduit/getAllproduit/${code}`;
    return this.http.get(url);
  }
}
