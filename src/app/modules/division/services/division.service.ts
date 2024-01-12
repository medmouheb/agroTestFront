import { HttpClient, HttpParams , HttpHeaders} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Page } from "app/shared/models";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { Division } from "../models/division";

@Injectable({
  providedIn: "root",
})
export class DivisionService {
  constructor(private http: HttpClient) {}

  baseUrl() {
    return `${environment.apiUrl}`;
  }

  save(id: string | null, division: Division): Observable<Division> {
    if (id) {
      return this.update(id, division);
    }
    return this.create(division);
  }

  create(division: Division): Observable<Division> {
    const headers = new HttpHeaders()
      .set(
        "Authorization",
        `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
      )
    let url = this.baseUrl()+'/division';
    return this.http.post<Division>(url, division , {headers});
  }

  update(id: string, division: Division): Observable<Division> {
    const headers = new HttpHeaders()
      .set(
        "Authorization",
        `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
      )
    let url = `${this.baseUrl()}/division/${id}`;
    return this.http.put<Division>(url, division , {headers});
  }

  findById(id: string): Observable<Division> {
    const headers = new HttpHeaders()
      .set(
        "Authorization",
        `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
      )
    let url = `${this.baseUrl()}/division/${id}`;
    return this.http.get<Division>(url , {headers});
  }

  findAll(): Observable<Array<Division>> {
    const headers = new HttpHeaders()
      .set(
        "Authorization",
        `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
      )
    let url = this.baseUrl()+'/division';
    return this.http.get<Array<Division>>(url , {headers});
  }

  findPage(
    pageNumber: number,
    pageSize: number,
    filter: string
  ): Observable<Page<Division>> {
    const headers = new HttpHeaders()
      .set(
        "Authorization",
        `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
      )
    let url = this.baseUrl() + "/division/page";
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber);
    params = params.append("pageSize", pageSize);
    params = params.append("filter", filter);
    return this.http.get<Page<Division>>(url, { params , headers });
  }

  delete(id: string): Observable<boolean> {
    const headers = new HttpHeaders()
      .set(
        "Authorization",
        `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
      )
    let url = `${this.baseUrl()}/division/${id}`;
    return this.http.delete<boolean>(url , {headers});
  }

  archive(id: string): Observable<void> {
    const headers = new HttpHeaders()
      .set(
        "Authorization",
        `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
      )
    let url = `${this.baseUrl()}/division/archiver/${id}`;
    return this.http.get<void>(url , {headers});
  }

  disArchive(id: string): Observable<void> {
    const headers = new HttpHeaders()
      .set(
        "Authorization",
        `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
      )
    let url = `${this.baseUrl()}/division/desarchiver/${id}`;
    return this.http.get<void>(url , {headers});
  }

  findArchivedPage(
    pageNumber: number,
    pageSize: number,
    filter: string
  ): Observable<Page<Division>> {
    const headers = new HttpHeaders()
      .set(
        "Authorization",
        `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
      )
    let url = this.baseUrl() + "/division/archived/page";
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber);
    params = params.append("pageSize", pageSize);
    params = params.append("filter", filter);
    return this.http.get<Page<Division>>(url, { params , headers });
  }
  findbycode(code:any): Observable<Division>{
    const headers = new HttpHeaders()
      .set(
        "Authorization",
        `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
      )
    let url = `${this.baseUrl()}/division/by-code/${code}`;
    return this.http.get<Division>(url , {headers});

  }
  findbyName(name:any): Observable<Division>{
    const headers = new HttpHeaders()
      .set(
        "Authorization",
        `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
      )
    let url = `${this.baseUrl()}/division/getbyname/${name}`;
    return this.http.get<Division>(url , {headers});

  }
}
