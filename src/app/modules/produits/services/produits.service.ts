import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Produit } from "../models/produit.model";
import { Page } from "app/shared/models";

@Injectable({
  providedIn: "root",
})
export class ProduitsService {
  constructor(private http: HttpClient) {}

  baseUrl() {
    return `${environment.apiUrl}`;
  }

  save(id: string | null, produit: Produit): Observable<Produit> {
    if (id) {
      return this.update(id, produit);
    }
    return this.create(produit);
  }

  create(produit: Produit): Observable<Produit> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${
        JSON.parse(localStorage.getItem("tocken")).accessToken
      }`,
    );
    let url = this.baseUrl() + "/produit";
    return this.http.post<Produit>(url, produit, { headers });
  }

  update(id: string, produit: Produit): Observable<Produit> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${
        JSON.parse(localStorage.getItem("tocken")).accessToken
      }`,
    );
    let url = `${this.baseUrl()}/produit/${id}`;
    return this.http.put<Produit>(url, produit, { headers });
  }

  importCSV(formData: FormData): Observable<void> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${
        JSON.parse(localStorage.getItem("tocken")).accessToken
      }`,
    );
    let url = this.baseUrl() + "/produit/import";

    headers.append("Content-Type", "multipart/form-data");
    const options = { headers };

    return this.http.post<void>(url, formData, options);
  }

  findById(id: string): Observable<Produit> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${
        JSON.parse(localStorage.getItem("tocken")).accessToken
      }`,
    );
    let url = `${this.baseUrl()}/produit/${id}`;
    return this.http.get<Produit>(url, { headers });
  }

  findAll(): Observable<Array<Produit>> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${
        JSON.parse(localStorage.getItem("tocken")).accessToken
      }`,
    );
    let url = this.baseUrl() + "/produit";
    return this.http.get<Array<Produit>>(url, { headers });
  }

  findPage(
    pageNumber: number,
    pageSize: number,
    filter: string,
  ): Observable<Page<Produit>> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${
        JSON.parse(localStorage.getItem("tocken")).accessToken
      }`,
    );
    let url = this.baseUrl() + "/produit/page";
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber);
    params = params.append("pageSize", pageSize);
    params = params.append("filter", filter);
    return this.http.get<Page<Produit>>(url, { params, ...{ headers } });
  }

  delete(id: string): Observable<boolean> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${
        JSON.parse(localStorage.getItem("tocken")).accessToken
      }`,
    );
    let url = `${this.baseUrl()}/produit/${id}`;
    return this.http.delete<boolean>(url, { headers });
  }

  downloadCSVTemplate(): Observable<any> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${
        JSON.parse(localStorage.getItem("tocken")).accessToken
      }`,
    );
    let url = `${this.baseUrl()}/produit/csv-template`;
    return this.http.get(url, { responseType: "blob", ...{ headers } });
  }

  archive(id: string): Observable<void> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${
        JSON.parse(localStorage.getItem("tocken")).accessToken
      }`,
    );
    let url = `${this.baseUrl()}/produit/archiver/${id}`;
    return this.http.get<void>(url, { headers });
  }

  disArchive(id: string): Observable<void> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${
        JSON.parse(localStorage.getItem("tocken")).accessToken
      }`,
    );
    let url = `${this.baseUrl()}/produit/desarchiver/${id}`;
    return this.http.get<void>(url, { headers });
  }

  findArchivedPage(
    pageNumber: number,
    pageSize: number,
    filter: string,
  ): Observable<Page<Produit>> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${
        JSON.parse(localStorage.getItem("tocken")).accessToken
      }`,
    );
    let url = this.baseUrl() + "/produit/archived/page";
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber);
    params = params.append("pageSize", pageSize);
    params = params.append("filter", filter);
    return this.http.get<Page<Produit>>(url, { params, ...{ headers } });
  }
  findbycode(code: any): Observable<Produit> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${
        JSON.parse(localStorage.getItem("tocken")).accessToken
      }`,
    );
    let url = `${this.baseUrl()}/produit/by-code/${code}`;
    return this.http.get<Produit>(url, { headers });
  }
  findbyName(name: any): Observable<Produit> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${
        JSON.parse(localStorage.getItem("tocken")).accessToken
      }`,
    );
    let url = `${this.baseUrl()}/produit/getbyname/${name}`;
    return this.http.get<Produit>(url, { headers });
  }
}
