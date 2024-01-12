import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";

import { Page } from "app/shared/models";
import { Company } from "../models/comany";

@Injectable({
  providedIn: "root",
})
export class CompanyService {
  constructor(private http: HttpClient) { }

  baseUrl() {
    return `${environment.apiUrl}`;
  }

  save(id: string | null, comp: Company): Observable<Company> {
    if (id) {
      return this.update(id, comp);
    }
    return this.create(comp);
  }

  create(comp: Company): Observable<Company> {
    let url = this.baseUrl() + "/campany";
    const headers = new HttpHeaders()
      .set("Authorization", `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`)
    return this.http.post<Company>(url, comp,{'headers':headers});
  }

  update(id: string, comp: Company): Observable<Company> {
    let url = `${this.baseUrl()}/campany/${id}`;
    const headers = new HttpHeaders()
      .set("Authorization", `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`)
    return this.http.put<Company>(url, comp,{'headers':headers});
  }

  findById(id: string): Observable<Company> {
    let url = `${this.baseUrl()}/campany/${id}`;
    const headers = new HttpHeaders()
      .set("Authorization", `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`)
    return this.http.get<Company>(url,{'headers':headers});
  }

  findAll(): Observable<Array<Company>> {
    let url = this.baseUrl() + '/campany';
    const headers = new HttpHeaders()
      .set("Authorization", `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`)
    return this.http.get<Array<Company>>(url,{'headers':headers});
  }

  findPage(
    pageNumber: number,
    pageSize: number,
    filter: string
  ): Observable<Page<Company>> {
    let url = this.baseUrl() + "/campany/page";
    let params = new HttpParams();
    console.log(`${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`);
    const headers = new HttpHeaders()
      .set("Authorization", `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`)
    params = params.append("pageNumber", pageNumber);
    params = params.append("pageSize", pageSize);
    params = params.append("filter", filter);
    return this.http.get<Page<Company>>(url, { params, headers });
  }

  delete(id: string): Observable<boolean> {
    let url = `${this.baseUrl()}/campany/${id}`;
    const headers = new HttpHeaders()
      .set(
        "Authorization",
        `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
      )
    return this.http.delete<boolean>(url,{'headers':headers});
  }

  archive(id: string): Observable<void> {
    let url = `${this.baseUrl()}/campany/archiver/${id}`;
    const headers = new HttpHeaders()
      .set(
        "Authorization",
        `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
      )
    return this.http.get<void>(url,{'headers':headers});
  }

  disArchive(id: string): Observable<void> {
    let url = `${this.baseUrl()}/campany/desarchiver/${id}`;
    const headers = new HttpHeaders()
      .set(
        "Authorization",
        `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
      )
    return this.http.get<void>(url,{'headers':headers});
  }

  findArchivedPage(
    pageNumber: number,
    pageSize: number,
    filter: string
  ): Observable<Page<Company>> {
    let url = this.baseUrl() + "/campany/archived/page";
    const headers = new HttpHeaders()
      .set(
        "Authorization",
        `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
      )
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber);
    params = params.append("pageSize", pageSize);
    params = params.append("filter", filter);
    return this.http.get<Page<Company>>(url, { params,'headers':headers });
  }
  findbycode(code: any): Observable<Company> {
    let url = `${this.baseUrl()}/campany/by-code/${code}`;
    const headers = new HttpHeaders()
      .set(
        "Authorization",
        `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
      )
    return this.http.get<Company>(url,{'headers':headers});

  }
  findbyName(name: any): Observable<Company> {
    let url = `${this.baseUrl()}/campany/getbyname/${name}`;
    const headers = new HttpHeaders()
      .set(
        "Authorization",
        `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
      )
    return this.http.get<Company>(url,{'headers':headers});

  }
}
