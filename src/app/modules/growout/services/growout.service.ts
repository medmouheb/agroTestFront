import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";

import { Growout } from "../models/growout";
import { Page } from "app/shared/models";

@Injectable({
  providedIn: "root",
})
export class GrowoutService {
  constructor(private http: HttpClient) {}

  baseUrl() {
    return `${environment.apiUrl}`;
  }

  save(id: string | null, growout: Growout): Observable<Growout> {
    if (id) {
      return this.update(id, growout);
    }
    return this.create(growout);
  }

  findbycode(code: any): Observable<Growout> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${
        JSON.parse(localStorage.getItem("tocken")).accessToken
      }`,
    );
    let url = `${this.baseUrl()}/growout/by-code/${code}`;
    return this.http.get<Growout>(url, { headers });
  }
  findbyName(name: any): Observable<Growout> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${
        JSON.parse(localStorage.getItem("tocken")).accessToken
      }`,
    );
    let url = `${this.baseUrl()}/growout/getbyname/${name}`;
    return this.http.get<Growout>(url, { headers });
  }
  create(growout: Growout): Observable<Growout> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${
        JSON.parse(localStorage.getItem("tocken")).accessToken
      }`,
    );
    let url = this.baseUrl() + "/growout";
    return this.http.post<Growout>(url, growout, { headers });
  }

  update(id: string, growout: Growout): Observable<Growout> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${
        JSON.parse(localStorage.getItem("tocken")).accessToken
      }`,
    );
    let url = `${this.baseUrl()}/growout/${id}`;
    return this.http.put<Growout>(url, growout, { headers });
  }

  findById(id: string): Observable<Growout> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${
        JSON.parse(localStorage.getItem("tocken")).accessToken
      }`,
    );
    let url = `${this.baseUrl()}/growout/${id}`;
    return this.http.get<Growout>(url, { headers });
  }

  findAll(): Observable<Array<Growout>> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${
        JSON.parse(localStorage.getItem("tocken")).accessToken
      }`,
    );
    let url = this.baseUrl() + "/growout";
    return this.http.get<Array<Growout>>(url, { headers });
  }

  findAllNoDeleted(): Observable<Array<Growout>> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${
        JSON.parse(localStorage.getItem("tocken")).accessToken
      }`,
    );
    let url = `${this.baseUrl()}/growout/list`;
    return this.http.get<Array<Growout>>(url, { headers });
  }

  findPage(
    pageNumber: number,
    pageSize: number,
    filter: string,
  ): Observable<Page<Growout>> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${
        JSON.parse(localStorage.getItem("tocken")).accessToken
      }`,
    );
    let url = this.baseUrl() + "/growout/page";
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber);
    params = params.append("pageSize", pageSize);
    params = params.append("filter", filter);
    return this.http.get<Page<Growout>>(url, { params, ...{ headers } });
  }

  delete(id: string): Observable<boolean> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${
        JSON.parse(localStorage.getItem("tocken")).accessToken
      }`,
    );
    let url = `${this.baseUrl()}/growout/${id}`;
    return this.http.delete<boolean>(url, { headers });
  }

  archive(id: string): Observable<void> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${
        JSON.parse(localStorage.getItem("tocken")).accessToken
      }`,
    );
    let url = `${this.baseUrl()}/growout/archiver/${id}`;
    return this.http.get<void>(url, { headers });
  }

  disArchive(id: string): Observable<void> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${
        JSON.parse(localStorage.getItem("tocken")).accessToken
      }`,
    );
    let url = `${this.baseUrl()}/growout/desarchiver/${id}`;
    return this.http.get<void>(url, { headers });
  }

  findArchivedPage(
    pageNumber: number,
    pageSize: number,
    filter: string,
  ): Observable<Page<Growout>> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${
        JSON.parse(localStorage.getItem("tocken")).accessToken
      }`,
    );
    let url = this.baseUrl() + "/growout/archived/page";
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber);
    params = params.append("pageSize", pageSize);
    params = params.append("filter", filter);
    return this.http.get<Page<Growout>>(url, { params, ...{ headers } });
  }
}
