import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";

import { Page } from "app/shared/models";
import { CostCenter } from "../model/cost-center";

@Injectable({
  providedIn: "root",
})
export class CostCenterService {
  constructor(private http: HttpClient) {}

  baseUrl() {
    return `${environment.apiUrl}`;
  }

  save(id: string | null, costcenter: CostCenter): Observable<CostCenter> {
    if (id) {
      return this.update(id, costcenter);
    }
    return this.create(costcenter);
  }

  create(costcenter: CostCenter): Observable<CostCenter> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${
        JSON.parse(localStorage.getItem("tocken")).accessToken
      }`,
    );
    let url = this.baseUrl() + "/costcenter";
    return this.http.post<CostCenter>(url, costcenter, { headers });
  }

  update(id: string, costcenter: CostCenter): Observable<CostCenter> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${
        JSON.parse(localStorage.getItem("tocken")).accessToken
      }`,
    );
    let url = `${this.baseUrl()}/costcenter/${id}`;
    return this.http.put<CostCenter>(url, costcenter, { headers });
  }

  findById(id: string): Observable<CostCenter> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${
        JSON.parse(localStorage.getItem("tocken")).accessToken
      }`,
    );
    let url = `${this.baseUrl()}/costcenter/${id}`;
    return this.http.get<CostCenter>(url, { headers });
  }

  findAll(): Observable<Array<CostCenter>> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${
        JSON.parse(localStorage.getItem("tocken")).accessToken
      }`,
    );
    let url = this.baseUrl() + "/costcenter";
    return this.http.get<Array<CostCenter>>(url, { headers });
  }

  findPage(
    pageNumber: number,
    pageSize: number,
    filter: string,
  ): Observable<Page<CostCenter>> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${
        JSON.parse(localStorage.getItem("tocken")).accessToken
      }`,
    );
    let url = this.baseUrl() + "/costcenter/page";
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber);
    params = params.append("pageSize", pageSize);
    params = params.append("filter", filter);
    return this.http.get<Page<CostCenter>>(url, { params, headers });
  }

  delete(id: string): Observable<boolean> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${
        JSON.parse(localStorage.getItem("tocken")).accessToken
      }`,
    );
    let url = `${this.baseUrl()}/costcenter/${id}`;
    return this.http.delete<boolean>(url, { headers });
  }

  archive(id: string): Observable<void> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${
        JSON.parse(localStorage.getItem("tocken")).accessToken
      }`,
    );
    let url = `${this.baseUrl()}/costcenter/archiver/${id}`;
    return this.http.get<void>(url, { headers });
  }

  disArchive(id: string): Observable<void> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${
        JSON.parse(localStorage.getItem("tocken")).accessToken
      }`,
    );
    let url = `${this.baseUrl()}/costcenter/desarchiver/${id}`;
    return this.http.get<void>(url, { headers });
  }

  findArchivedPage(
    pageNumber: number,
    pageSize: number,
    filter: string,
  ): Observable<Page<CostCenter>> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${
        JSON.parse(localStorage.getItem("tocken")).accessToken
      }`,
    );
    let url = this.baseUrl() + "/costcenter/archived/page";
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber);
    params = params.append("pageSize", pageSize);
    params = params.append("filter", filter);
    return this.http.get<Page<CostCenter>>(url, { params, headers });
  }
  findbycode(code: any): Observable<CostCenter> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${
        JSON.parse(localStorage.getItem("tocken")).accessToken
      }`,
    );
    let url = `${this.baseUrl()}/costcenter/by-code/${code}`;
    return this.http.get<CostCenter>(url, { headers });
  }
  findbyName(name: any): Observable<CostCenter> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${
        JSON.parse(localStorage.getItem("tocken")).accessToken
      }`,
    );
    let url = `${this.baseUrl()}/costcenter/getbyname/${name}`;
    return this.http.get<CostCenter>(url, { headers });
  }
}
