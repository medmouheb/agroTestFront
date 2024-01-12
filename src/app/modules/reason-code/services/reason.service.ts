import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { reason } from "../models/reason.model";
import { environment } from "environments/environment";

@Injectable({
  providedIn: "root",
})
export class reasonService {
  baseUrl() {
    return `${environment.apiUrl}`;
  }
  constructor(private http: HttpClient) {}

  getActiveReasons(): Observable<reason[]> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${
        JSON.parse(localStorage.getItem("tocken")).accessToken
      }`,
    );
    return this.http.get<reason[]>(this.baseUrl() + "/reason/active", {
      headers,
    });
  }
  getArchivedReasons(): Observable<reason[]> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${
        JSON.parse(localStorage.getItem("tocken")).accessToken
      }`,
    );
    return this.http.get<reason[]>(this.baseUrl() + "/reason/archived", {
      headers,
    });
  }

  save(id: string | null, reason: reason): Observable<reason> {
    if (id) {
      return this.update(id, reason);
    }
    return this.create(reason);
  }
  create(reason: reason): Observable<reason> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${
        JSON.parse(localStorage.getItem("tocken")).accessToken
      }`,
    );
    let url = this.baseUrl() + "/reason";
    return this.http.post<reason>(url, reason, { headers });
  }

  update(id: string, reason: reason): Observable<reason> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${
        JSON.parse(localStorage.getItem("tocken")).accessToken
      }`,
    );
    let url = `${this.baseUrl()}/reason/${id}`;
    return this.http.put<reason>(url, reason, { headers });
  }
  delete(id: string): Observable<boolean> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${
        JSON.parse(localStorage.getItem("tocken")).accessToken
      }`,
    );
    let url = `${this.baseUrl()}/reason/${id}`;
    return this.http.delete<boolean>(url, { headers });
  }

  findReasonById(id: string): Observable<reason> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${
        JSON.parse(localStorage.getItem("tocken")).accessToken
      }`,
    );
    let url = `${this.baseUrl()}/reason/${id}`;
    return this.http.get<reason>(url, { headers });
  }

  searchReasonByNameActive(reasonName: string): Observable<reason[]> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${
        JSON.parse(localStorage.getItem("tocken")).accessToken
      }`,
    );
    const params = { reasonName: reasonName };
    return this.http.get<reason[]>(this.baseUrl() + "/reason/searchactive", {
      params,
      ...{ headers },
    });
  }
  searchReasonByNameArchived(reasonName: string): Observable<reason[]> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${
        JSON.parse(localStorage.getItem("tocken")).accessToken
      }`,
    );
    const params = { reasonName: reasonName };
    return this.http.get<reason[]>(this.baseUrl() + "/reason/searcharchived", {
      params,
      ...{ headers },
    });
  }

  deactivateReason(id: string): Observable<void> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${
        JSON.parse(localStorage.getItem("tocken")).accessToken
      }`,
    );
    const url = `${this.baseUrl()}/reason/deactivate/${id}`;
    return this.http.patch<void>(url, null, { headers });
  }

  ActivateReason(id: string): Observable<void> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${
        JSON.parse(localStorage.getItem("tocken")).accessToken
      }`,
    );
    const url = `${this.baseUrl()}/reason/activate/${id}`;
    return this.http.patch<void>(url, null, { headers });
  }
}
