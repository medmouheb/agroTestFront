import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Commande } from "../models/commande.model";
import { Page } from "app/shared/models";

@Injectable({
  providedIn: "root",
})
export class CommandeService {
  constructor(private http: HttpClient) {}

  baseUrl() {
    return `${environment.apiUrl}`;
  }

  save(id: string | null, commande: Commande): Observable<Commande> {
    if (id) {
      return this.update(id, commande);
    }
    return this.create(commande);
  }

  create(commande: Commande): Observable<Commande> {
    let url = this.baseUrl() + "/commande";
    return this.http.post<Commande>(url, commande);
  }

  update(id: string, commande: Commande): Observable<Commande> {
    let url = `${this.baseUrl()}/commande/${id}`;
    return this.http.put<Commande>(url, commande);
  }

  importCSV(formData: FormData): Observable<void> {
    let url = this.baseUrl() + "/commande/import";

    let headers = new HttpHeaders();
    headers.append("Content-Type", "multipart/form-data");
    const options = { headers };

    return this.http.post<void>(url, formData, options);
  }

  findById(id: string): Observable<Commande> {
    let url = `${this.baseUrl()}/commande/${id}`;
    return this.http.get<Commande>(url);
  }

  findAll(): Observable<Array<Commande>> {
    let url = this.baseUrl() + "/commande";
    return this.http.get<Array<Commande>>(url);
  }

  findPage(
    pageNumber: number,
    pageSize: number,
    filter: string,
  ): Observable<Page<Commande>> {
    let url = this.baseUrl() + "/commande/page";
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber);
    params = params.append("pageSize", pageSize);
    params = params.append("filter", filter);
    return this.http.get<Page<Commande>>(url, { params });
  }

  delete(id: string): Observable<boolean> {
    let url = `${this.baseUrl()}/commande/${id}`;
    return this.http.delete<boolean>(url);
  }

  downloadCSVTemplate(): Observable<any> {
    let url = `${this.baseUrl()}/commande/csv-template`;
    return this.http.get(url, { responseType: "blob" });
  }

  archive(id: string): Observable<void> {
    let url = `${this.baseUrl()}/commande/archiver/${id}`;
    return this.http.get<void>(url);
  }

  disArchive(id: string): Observable<void> {
    let url = `${this.baseUrl()}/commande/desarchiver/${id}`;
    return this.http.get<void>(url);
  }

  findArchivedPage(
    pageNumber: number,
    pageSize: number,
    filter: string,
  ): Observable<Page<Commande>> {
    let url = this.baseUrl() + "/commande/archived/page";
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber);
    params = params.append("pageSize", pageSize);
    params = params.append("filter", filter);
    return this.http.get<Page<Commande>>(url, { params });
  }
}
