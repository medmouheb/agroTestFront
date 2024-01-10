import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { BeginningInventory } from "../models/beginninginventory.model";
import { Page } from "app/shared/models";
@Injectable({
  providedIn: "root",
})
export class BeginninginventoryService {
  constructor(private http: HttpClient) {}

  baseUrl() {
    return `${environment.apiUrl}`;
  }

  save(
    id: string | null,
    comp: BeginningInventory,
  ): Observable<BeginningInventory> {
    if (id) {
      return this.update(id, comp);
    }
    return this.create(comp);
  }

  create(comp: BeginningInventory): Observable<BeginningInventory> {
    let url = this.baseUrl() + "/InventaireInitial";
    return this.http.post<BeginningInventory>(url, comp);
  }

  update(id: string, comp: BeginningInventory): Observable<BeginningInventory> {
    let url = `${this.baseUrl()}/InventaireInitial/${id}`;
    return this.http.put<BeginningInventory>(url, comp);
  }

  findById(id: string): Observable<BeginningInventory> {
    let url = `${this.baseUrl()}/InventaireInitial/${id}`;
    return this.http.get<BeginningInventory>(url);
  }

  findAll(): Observable<Array<BeginningInventory>> {
    let url = this.baseUrl() + "/InventaireInitial";
    return this.http.get<Array<BeginningInventory>>(url);
  }

  findPage(
    pageNumber: number,
    pageSize: number,
    filter: string,
  ): Observable<Page<BeginningInventory>> {
    let url = this.baseUrl() + "/InventaireInitial/page";
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber);
    params = params.append("pageSize", pageSize);
    params = params.append("filter", filter);
    return this.http.get<Page<BeginningInventory>>(url, { params });
  }

  delete(id: string): Observable<boolean> {
    let url = `${this.baseUrl()}/InventaireInitial/${id}`;
    return this.http.delete<boolean>(url);
  }

  archive(id: string): Observable<void> {
    let url = `${this.baseUrl()}/InventaireInitial/archiver/${id}`;
    return this.http.get<void>(url);
  }

  disArchive(id: string): Observable<void> {
    let url = `${this.baseUrl()}/InventaireInitial/desarchiver/${id}`;
    return this.http.get<void>(url);
  }

  findArchivedPage(
    pageNumber: number,
    pageSize: number,
    filter: string,
  ): Observable<Page<BeginningInventory>> {
    let url = this.baseUrl() + "/InventaireInitial/archived/page";
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber);
    params = params.append("pageSize", pageSize);
    params = params.append("filter", filter);
    return this.http.get<Page<BeginningInventory>>(url, { params });
  }
  findbycode(code: any): Observable<BeginningInventory> {
    let url = `${this.baseUrl()}/InventaireInitial/by-code/${code}`;
    return this.http.get<BeginningInventory>(url);
  }
  findbyName(name: any): Observable<BeginningInventory> {
    let url = `${this.baseUrl()}/InventaireInitial/getbyname/${name}`;
    return this.http.get<BeginningInventory>(url);
  }
}
