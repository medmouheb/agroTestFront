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
    const headers = new HttpHeaders().set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${
        JSON.parse(localStorage.getItem("tocken")).accessToken
      }`,
    );
    let url = this.baseUrl() + "/InventaireInitial";
    return this.http.post<BeginningInventory>(url, comp, { headers });
  }

  update(id: string, comp: BeginningInventory): Observable<BeginningInventory> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${
        JSON.parse(localStorage.getItem("tocken")).accessToken
      }`,
    );
    let url = `${this.baseUrl()}/InventaireInitial/${id}`;
    return this.http.put<BeginningInventory>(url, comp, { headers });
  }

  findById(id: string): Observable<BeginningInventory> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${
        JSON.parse(localStorage.getItem("tocken")).accessToken
      }`,
    );
    let url = `${this.baseUrl()}/InventaireInitial/${id}`;
    return this.http.get<BeginningInventory>(url, { headers });
  }

  findAll(): Observable<Array<BeginningInventory>> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${
        JSON.parse(localStorage.getItem("tocken")).accessToken
      }`,
    );
    let url = this.baseUrl() + "/InventaireInitial";
    return this.http.get<Array<BeginningInventory>>(url, { headers });
  }

  findPage(
    pageNumber: number,
    pageSize: number,
    filter: string,
  ): Observable<Page<BeginningInventory>> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${
        JSON.parse(localStorage.getItem("tocken")).accessToken
      }`,
    );
    let url = this.baseUrl() + "/InventaireInitial/page";
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber);
    params = params.append("pageSize", pageSize);
    params = params.append("filter", filter);
    return this.http.get<Page<BeginningInventory>>(url, { params, headers });
  }

  delete(id: string): Observable<boolean> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${
        JSON.parse(localStorage.getItem("tocken")).accessToken
      }`,
    );
    let url = `${this.baseUrl()}/InventaireInitial/${id}`;
    return this.http.delete<boolean>(url, { headers });
  }

  archive(id: string): Observable<void> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${
        JSON.parse(localStorage.getItem("tocken")).accessToken
      }`,
    );
    let url = `${this.baseUrl()}/InventaireInitial/archiver/${id}`;
    return this.http.get<void>(url, { headers });
  }

  disArchive(id: string): Observable<void> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${
        JSON.parse(localStorage.getItem("tocken")).accessToken
      }`,
    );
    let url = `${this.baseUrl()}/InventaireInitial/desarchiver/${id}`;
    return this.http.get<void>(url, { headers });
  }

  findArchivedPage(
    pageNumber: number,
    pageSize: number,
    filter: string,
  ): Observable<Page<BeginningInventory>> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${
        JSON.parse(localStorage.getItem("tocken")).accessToken
      }`,
    );
    let url = this.baseUrl() + "/InventaireInitial/archived/page";
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber);
    params = params.append("pageSize", pageSize);
    params = params.append("filter", filter);
    return this.http.get<Page<BeginningInventory>>(url, { params, headers });
  }
  findbycode(code: any): Observable<BeginningInventory> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${
        JSON.parse(localStorage.getItem("tocken")).accessToken
      }`,
    );
    let url = `${this.baseUrl()}/InventaireInitial/by-code/${code}`;
    return this.http.get<BeginningInventory>(url, { headers });
  }
  findbyName(name: any): Observable<BeginningInventory> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${
        JSON.parse(localStorage.getItem("tocken")).accessToken
      }`,
    );
    let url = `${this.baseUrl()}/InventaireInitial/getbyname/${name}`;
    return this.http.get<BeginningInventory>(url, { headers });
  }

  // findbycompanyname(): Observable<string[]>{
  //   let url = `${this.baseUrl()}/InventaireInitial/getbydivision`;
  //   return this.http.get<string[]>(url);
  // }
}
