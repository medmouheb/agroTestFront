import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ShipMethods } from "../models/shipsmethods";
import { Observable } from "rxjs";
import { Page } from "app/shared/models";
import { environment } from "environments/environment";

@Injectable({
  providedIn: "root",
})
export class ShipmethodsService {
  constructor(private http: HttpClient) {}
  baseUrl() {
    return `${environment.apiUrl}`;
  }
  save(id: string | null, shipmethods: ShipMethods): Observable<ShipMethods> {
    if (id) {
      return this.update(id, shipmethods);
    }
    return this.create(shipmethods);
  }
  create(shipmethods: ShipMethods): Observable<ShipMethods> {
    let url = this.baseUrl() + "/shipmethods";
    return this.http.post<ShipMethods>(url, shipmethods);
  }

  update(id: string, shipmethods: ShipMethods): Observable<ShipMethods> {
    let url = `${this.baseUrl()}/shipmethods/${id}`;
    return this.http.put<ShipMethods>(url, shipmethods);
  }

  findById(id: string): Observable<ShipMethods> {
    let url = `${this.baseUrl()}/shipmethods/${id}`;
    return this.http.get<ShipMethods>(url);
  }
  findAll(): Observable<Array<ShipMethods>> {
    let url = this.baseUrl() + "/shipmethods";
    return this.http.get<Array<ShipMethods>>(url);
  }

  findPage(
    pageNumber: number,
    pageSize: number,
    filter: string,
  ): Observable<Page<ShipMethods>> {
    let url = this.baseUrl() + "/shipmethods/page";
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber);
    params = params.append("pageSize", pageSize);
    params = params.append("filter", filter);
    return this.http.get<Page<ShipMethods>>(url, { params });
  }

  delete(id: string): Observable<boolean> {
    let url = `${this.baseUrl()}/shipmethods/${id}`;
    return this.http.delete<boolean>(url);
  }

  archive(id: string): Observable<void> {
    let url = `${this.baseUrl()}/shipmethods/archiver/${id}`;
    return this.http.get<void>(url);
  }

  disArchive(id: string): Observable<void> {
    let url = `${this.baseUrl()}/shipmethods/desarchiver/${id}`;
    return this.http.get<void>(url);
  }

  findArchivedPage(
    pageNumber: number,
    pageSize: number,
    filter: string,
  ): Observable<Page<ShipMethods>> {
    let url = this.baseUrl() + "/shipmethods/archived/page";
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber);
    params = params.append("pageSize", pageSize);
    params = params.append("filter", filter);
    return this.http.get<Page<ShipMethods>>(url, { params });
  }

  findbycode(code: any): Observable<ShipMethods> {
    let url = `${this.baseUrl()}/shipmethods/by-code/${code}`;
    return this.http.get<ShipMethods>(url);
  }
  findbyName(name: any): Observable<ShipMethods> {
    let url = `${this.baseUrl()}/shipmethods/getbyname/${name}`;
    return this.http.get<ShipMethods>(url);
  }
}
