import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Page } from "app/shared/models";
import { Observable } from "rxjs";
import { Delivery } from "../models/delivery";
import { environment } from "environments/environment";

@Injectable({
  providedIn: "root",
})
export class DeliveryService {
  constructor(private http: HttpClient) {}

  baseUrl() {
    return `${environment.apiUrl}`;
  }

  save(id: string | null, delivery: Delivery): Observable<Delivery> {
    if (id) {
      return this.update(id, delivery);
    }
    return this.create(delivery);
  }

  create(delivery: Delivery): Observable<Delivery> {
    let url = this.baseUrl() + "/delivery";
    return this.http.post<Delivery>(url, delivery);
  }

  update(id: string, delivery: Delivery): Observable<Delivery> {
    let url = `${this.baseUrl()}/delivery/${id}`;
    return this.http.put<Delivery>(url, delivery);
  }

  findById(id: string): Observable<Delivery> {
    let url = `${this.baseUrl()}/delivery/${id}`;
    return this.http.get<Delivery>(url);
  }

  findAll(): Observable<Array<Delivery>> {
    let url = this.baseUrl() + "/delivery";
    return this.http.get<Array<Delivery>>(url);
  }

  findPage(
    pageNumber: number,
    pageSize: number,
    filter: string,
  ): Observable<Page<Delivery>> {
    let url = this.baseUrl() + "/delivery/page";
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber);
    params = params.append("pageSize", pageSize);
    params = params.append("filter", filter);
    return this.http.get<Page<Delivery>>(url, { params });
  }

  delete(id: string): Observable<boolean> {
    let url = `${this.baseUrl()}/delivery/${id}`;
    return this.http.delete<boolean>(url);
  }

  archive(id: string): Observable<void> {
    let url = `${this.baseUrl()}/delivery/archiver/${id}`;
    return this.http.get<void>(url);
  }

  disArchive(id: string): Observable<void> {
    let url = `${this.baseUrl()}/delivery/desarchiver/${id}`;
    return this.http.get<void>(url);
  }

  findArchivedPage(
    pageNumber: number,
    pageSize: number,
    filter: string,
  ): Observable<Page<Delivery>> {
    let url = this.baseUrl() + "/delivery/archived/page";
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber);
    params = params.append("pageSize", pageSize);
    params = params.append("filter", filter);
    return this.http.get<Page<Delivery>>(url, { params });
  }
  findbycode(code: any): Observable<Delivery> {
    let url = `${this.baseUrl()}/delivery/by-code/${code}`;
    return this.http.get<Delivery>(url);
  }
  findbyName(name: any): Observable<Delivery> {
    let url = `${this.baseUrl()}/delivery/getbyname/${name}`;
    return this.http.get<Delivery>(url);
  }
}
