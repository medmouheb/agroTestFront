import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Page } from "app/shared/models";
import { Category } from "../models/category.model";

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  baseUrl() {
    return `${environment.apiUrl}`;
  }

  save(id: string | null, category: Category): Observable<Category> {
    if (id) {
      return this.update(id, category);
    }
    return this.create(category);
  }

  create(category: Category): Observable<Category> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${
        JSON.parse(localStorage.getItem("tocken")).accessToken
      }`,
    );
    let url = this.baseUrl() + "/category";
    return this.http.post<Category>(url, category, { headers });
  }

  update(id: string, category: Category): Observable<Category> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${
        JSON.parse(localStorage.getItem("tocken")).accessToken
      }`,
    );
    let url = `${this.baseUrl()}/category/${id}`;
    return this.http.put<Category>(url, category, { headers });
  }

  findById(id: string): Observable<Category> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${
        JSON.parse(localStorage.getItem("tocken")).accessToken
      }`,
    );
    let url = `${this.baseUrl()}/category/${id}`;
    return this.http.get<Category>(url, { headers });
  }

  findAll(): Observable<Array<Category>> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${
        JSON.parse(localStorage.getItem("tocken")).accessToken
      }`,
    );
    let url = this.baseUrl() + "/category";
    return this.http.get<Array<Category>>(url, { headers });
  }

  delete(id: string): Observable<boolean> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${
        JSON.parse(localStorage.getItem("tocken")).accessToken
      }`,
    );
    let url = `${this.baseUrl()}/category/${id}`;
    return this.http.delete<boolean>(url, { headers });
  }
}
