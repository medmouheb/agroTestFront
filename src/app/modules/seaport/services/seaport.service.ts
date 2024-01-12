import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { seaport } from "../models/seaport.model";
import { environment } from "environments/environment";

@Injectable({
  providedIn: "root",
})
export class seaportService {
  baseUrl() {
    return `${environment.apiUrl}`;
  }
  constructor(private http: HttpClient) {}

  getActiveSeaports(): Observable<seaport[]> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${
        JSON.parse(localStorage.getItem("tocken")).accessToken
      }`,
    );
    return this.http.get<seaport[]>(this.baseUrl() + "/seaport/active", {
      headers,
    });
  }
  getArchivedSeaports(): Observable<seaport[]> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${
        JSON.parse(localStorage.getItem("tocken")).accessToken
      }`,
    );
    return this.http.get<seaport[]>(this.baseUrl() + "/seaport/archived", {
      headers,
    });
  }

  save(id: string | null, seaport: seaport): Observable<seaport> {
    if (id) {
      return this.update(id, seaport);
    }
    return this.create(seaport);
  }
  create(seaport: seaport): Observable<seaport> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${
        JSON.parse(localStorage.getItem("tocken")).accessToken
      }`,
    );
    let url = this.baseUrl() + "/seaport";
    return this.http.post<seaport>(url, seaport, { headers });
  }

  update(id: string, seaport: seaport): Observable<seaport> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${
        JSON.parse(localStorage.getItem("tocken")).accessToken
      }`,
    );
    let url = `${this.baseUrl()}/seaport/${id}`;
    return this.http.put<seaport>(url, seaport, { headers });
  }
  delete(id: string): Observable<boolean> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${
        JSON.parse(localStorage.getItem("tocken")).accessToken
      }`,
    );
    let url = `${this.baseUrl()}/seaport/${id}`;
    return this.http.delete<boolean>(url, { headers });
  }

  findSeaportById(id: string): Observable<seaport> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${
        JSON.parse(localStorage.getItem("tocken")).accessToken
      }`,
    );
    let url = `${this.baseUrl()}/seaport/${id}`;
    return this.http.get<seaport>(url, { headers });
  }

  searchSeaportByNameActive(seaPortName: string): Observable<seaport[]> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${
        JSON.parse(localStorage.getItem("tocken")).accessToken
      }`,
    );
    const params = { seaPortName: seaPortName };
    return this.http.get<seaport[]>(this.baseUrl() + "/seaport/searchactive", {
      params,
      ...{ headers },
    });
  }
  searchSeaportByNameArchived(seaPortName: string): Observable<seaport[]> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${
        JSON.parse(localStorage.getItem("tocken")).accessToken
      }`,
    );
    const params = { seaPortName: seaPortName };
    return this.http.get<seaport[]>(
      this.baseUrl() + "/seaport/searcharchived",
      { params, ...{ headers } },
    );
  }

  deactivateSeaport(id: string): Observable<void> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${
        JSON.parse(localStorage.getItem("tocken")).accessToken
      }`,
    );
    const url = `${this.baseUrl()}/seaport/deactivate/${id}`;
    return this.http.patch<void>(url, null, { headers });
  }

  ActivateSeaport(id: string): Observable<void> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${
        JSON.parse(localStorage.getItem("tocken")).accessToken
      }`,
    );
    const url = `${this.baseUrl()}/seaport/activate/${id}`;
    return this.http.patch<void>(url, null, { headers });
  }
}
