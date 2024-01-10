import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Charge } from "../models/charge.model";
import { Page } from "app/shared/models";

@Injectable({
  providedIn: "root",
})
export class ChargeService {
  constructor(private http: HttpClient) {}

  baseUrl() {
    return `${environment.apiUrl}`;
  }

  save(id: string | null, charge: Charge): Observable<Charge> {
    if (id) {
      return this.update(id, charge);
    }
    return this.create(charge);
  }

  create(charge: Charge): Observable<Charge> {
    let url = this.baseUrl() + "/charge";
    return this.http.post<Charge>(url, charge);
  }

  update(id: string, charge: Charge): Observable<Charge> {
    let url = `${this.baseUrl()}/charge/${id}`;
    return this.http.put<Charge>(url, charge);
  }

  importCSV(formData: FormData): Observable<void> {
    let url = this.baseUrl() + "/charge/import";

    let headers = new HttpHeaders();
    headers.append("Content-Type", "multipart/form-data");
    const options = { headers };

    return this.http.post<void>(url, formData, options);
  }

  findById(id: string): Observable<Charge> {
    let url = `${this.baseUrl()}/charge/${id}`;
    return this.http.get<Charge>(url);
  }

  findAll(): Observable<Array<Charge>> {
    let url = this.baseUrl() + "/charge";
    return this.http.get<Array<Charge>>(url);
  }

  findPage(
    pageNumber: number,
    pageSize: number,
    filter: string,
  ): Observable<Page<Charge>> {
    let url = this.baseUrl() + "/charge/page";
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber);
    params = params.append("pageSize", pageSize);
    params = params.append("filter", filter);
    return this.http.get<Page<Charge>>(url, { params });
  }

  delete(id: string): Observable<boolean> {
    let url = `${this.baseUrl()}/charge/${id}`;
    return this.http.delete<boolean>(url);
  }

  downloadCSVTemplate(): Observable<any> {
    let url = `${this.baseUrl()}/charge/csv-template`;
    return this.http.get(url, { responseType: "blob" });
  }

  archive(id: string): Observable<void> {
    let url = `${this.baseUrl()}/charge/archiver/${id}`;
    return this.http.get<void>(url);
  }

  disArchive(id: string): Observable<void> {
    let url = `${this.baseUrl()}/charge/desarchiver/${id}`;
    return this.http.get<void>(url);
  }

  findArchivedPage(
    pageNumber: number,
    pageSize: number,
    filter: string,
  ): Observable<Page<Charge>> {
    let url = this.baseUrl() + "/charge/archived/page";
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber);
    params = params.append("pageSize", pageSize);
    params = params.append("filter", filter);
    return this.http.get<Page<Charge>>(url, { params });
  }
}
