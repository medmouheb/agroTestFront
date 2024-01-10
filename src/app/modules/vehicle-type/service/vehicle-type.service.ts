import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";

import { VihicleType } from "../models/vehicleType";
import { Page } from "app/shared/models";

@Injectable({
  providedIn: "root",
})
export class VehicleTypeService {
  constructor(private http: HttpClient) {}

  baseUrl() {
    return `${environment.apiUrl}`;
  }

  save(id: string | null, comp: VihicleType): Observable<VihicleType> {
    if (id) {
      return this.update(id, comp);
    }
    return this.create(comp);
  }

  create(vehicleType: VihicleType): Observable<VihicleType> {
    let url = this.baseUrl() + "/vehicleType/create";
    return this.http.post<VihicleType>(url, vehicleType);
  }

  findById(id: string): Observable<VihicleType> {
    let url = `${this.baseUrl()}/vehicleType/getById/${id}`;
    return this.http.get<VihicleType>(url);
  }

  update(id: string, vehicleType: VihicleType): Observable<VihicleType> {
    let url = `${this.baseUrl()}/vehicleType/update/${id}`;
    return this.http.put<VihicleType>(url, vehicleType);
  }

  delete(id: string): Observable<boolean> {
    let url = `${this.baseUrl()}/vehicleType/delete/${id}`;
    return this.http.delete<boolean>(url);
  }

  findbycode(code: any): Observable<VihicleType> {
    let url = `${this.baseUrl()}/vehicleType/by-code/${code}`;
    return this.http.get<VihicleType>(url);
  }

  findPage(
    pageNumber: number,
    pageSize: number,
    filter: string,
  ): Observable<Page<VihicleType>> {
    let url = this.baseUrl() + "/vehicleType/page";
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber);
    params = params.append("pageSize", pageSize);
    params = params.append("filter", filter);
    return this.http.get<Page<VihicleType>>(url, { params });
  }

  findArchivedPage(
    pageNumber: number,
    pageSize: number,
    filter: string,
  ): Observable<Page<VihicleType>> {
    let url = this.baseUrl() + "/vehicleType/archived/page";
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber);
    params = params.append("pageSize", pageSize);
    params = params.append("filter", filter);
    return this.http.get<Page<VihicleType>>(url, { params });
  }

  archive(id: string): Observable<void> {
    let url = `${this.baseUrl()}/vehicleType/archiver/${id}`;
    return this.http.get<void>(url);
  }

  disArchive(id: string): Observable<void> {
    let url = `${this.baseUrl()}/vehicleType/desarchiver/${id}`;
    return this.http.get<void>(url);
  }

  findAll(): Observable<Array<VihicleType>> {
    let url = this.baseUrl() + "/vehicleType/getAll";
    return this.http.get<Array<VihicleType>>(url);
  }
}
