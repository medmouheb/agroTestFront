import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { ProductUsage } from '../model/product-usage';
import { Page } from 'app/shared/models';

@Injectable({
  providedIn: 'root'
})
export class ProductUsageService {
  constructor(private http: HttpClient) { }

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
    const headers = new HttpHeaders()
      .set(
        "Authorization",
        `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
      )
    let url = this.baseUrl() + "/UtilisationDuProduit";
    return this.http.post<ProductUsage>(url, comp, { headers });
  }

  update(id: string, comp: ProductUsage): Observable<ProductUsage> {
    const headers = new HttpHeaders()
      .set(
        "Authorization",
        `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
      )
    let url = `${this.baseUrl()}/UtilisationDuProduit/${id}`;
    return this.http.put<ProductUsage>(url, comp, { headers });
  }

  findById(id: string): Observable<ProductUsage> {
    const headers = new HttpHeaders()
      .set(
        "Authorization",
        `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
      )
    let url = `${this.baseUrl()}/UtilisationDuProduit/${id}`;
    return this.http.get<ProductUsage>(url, { headers });
  }

  findAll(): Observable<Array<ProductUsage>> {
    const headers = new HttpHeaders()
      .set(
        "Authorization",
        `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
      )
    let url = this.baseUrl() + '/UtilisationDuProduit';
    return this.http.get<Array<ProductUsage>>(url, { headers });
  }

  findPage(
    pageNumber: number,
    pageSize: number,
    filter: string
  ): Observable<Page<ProductUsage>> {
    const headers = new HttpHeaders()
      .set(
        "Authorization",
        `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
      )
    let url = this.baseUrl() + "/UtilisationDuProduit/page";
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber);
    params = params.append("pageSize", pageSize);
    params = params.append("filter", filter);
    return this.http.get<Page<ProductUsage>>(url, { params, ...{ headers } });
  }

  delete(id: string): Observable<boolean> {
    const headers = new HttpHeaders()
      .set(
        "Authorization",
        `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
      )
    let url = `${this.baseUrl()}/UtilisationDuProduit/${id}`;
    return this.http.delete<boolean>(url, { headers });
  }

  archive(id: string): Observable<void> {
    const headers = new HttpHeaders()
      .set(
        "Authorization",
        `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
      )
    let url = `${this.baseUrl()}/UtilisationDuProduit/archiver/${id}`;
    return this.http.get<void>(url, { headers });
  }

  disArchive(id: string): Observable<void> {
    const headers = new HttpHeaders()
      .set(
        "Authorization",
        `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
      )
    let url = `${this.baseUrl()}/UtilisationDuProduit/desarchiver/${id}`;
    return this.http.get<void>(url, { headers });
  }



  findArchivedPage(
    pageNumber: number,
    pageSize: number,
    filter: string
  ): Observable<Page<ProductUsage>> {
    const headers = new HttpHeaders()
      .set(
        "Authorization",
        `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
      )
    let url = this.baseUrl() + "/UtilisationDuProduit/archived/page";
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber);
    params = params.append("pageSize", pageSize);
    params = params.append("filter", filter);
    return this.http.get<Page<ProductUsage>>(url, { params, ...{ headers } });
  }
  findbycode(code: any): Observable<ProductUsage> {
    const headers = new HttpHeaders()
      .set(
        "Authorization",
        `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
      )
    let url = `${this.baseUrl()}/UtilisationDuProduit/by-code/${code}`;
    return this.http.get<ProductUsage>(url, { headers });

  }
  findbyName(name: any): Observable<ProductUsage> {
    const headers = new HttpHeaders()
      .set(
        "Authorization",
        `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
      )
    let url = `${this.baseUrl()}/UtilisationDuProduit/getbyname/${name}`;
    return this.http.get<ProductUsage>(url, { headers });
  }


  getAllproduit(): Observable<string[]> {
    const headers = new HttpHeaders()
      .set(
        "Authorization",
        `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
      )
    let url = `${this.baseUrl()}/UtilisationDuProduit/getAllproduit`;
    return this.http.get<string[]>(url, { headers });

  }
  findProduitName(code: string): Observable<any> {
    const headers = new HttpHeaders()
      .set(
        "Authorization",
        `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
      )
    let url = `${this.baseUrl()}/UtilisationDuProduit/getAllproduit/${code}`;
    return this.http.get(url, { headers });

  }



}
