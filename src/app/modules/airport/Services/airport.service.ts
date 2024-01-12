import { HttpClient, HttpParams ,HttpHeaders} from "@angular/common/http";
import { airport } from "../models/airport.model";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Page } from "app/shared/models";
import { environment } from "environments/environment";


@Injectable({
  providedIn: 'root'
})
export class airportService {

  baseUrl() {
    return `${environment.apiUrl}`;
  }


  constructor(private http: HttpClient) { }



  getActiveAirports(): Observable<airport[]> {
    const headers = new HttpHeaders()
    .set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
    )
    return this.http.get<airport[]>(this.baseUrl() + '/airport/active', {headers});
  }
  getArchivedAirports(): Observable<airport[]> {
    const headers = new HttpHeaders()
    .set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
    )
    return this.http.get<airport[]>(this.baseUrl() + '/airport/archived', {headers});
  }

  save(id: string | null, airport: airport): Observable<airport> {
    if (id) {
      return this.update(id, airport);
    }
    return this.create(airport);
  }
  create(airport: airport): Observable<airport> {
    const headers = new HttpHeaders()
    .set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
    )
    let url = this.baseUrl() + '/airport';
    return this.http.post<airport>(url, airport, {headers});
  }

  update(id: string, airport: airport): Observable<airport> {
    const headers = new HttpHeaders()
    .set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
    )
    let url = `${this.baseUrl()}/airport/${id}`;
    return this.http.put<airport>(url, airport, {headers});
  }
  delete(id: string): Observable<boolean> {
    const headers = new HttpHeaders()
    .set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
    )
    let url = `${this.baseUrl()}/airport/${id}`;
    return this.http.delete<boolean>(url, {headers});
  }

  findAirportById(id: string): Observable<airport> {
    const headers = new HttpHeaders()
    .set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
    )
    let url = `${this.baseUrl()}/airport/${id}`;
    return this.http.get<airport>(url, {headers});
  }

  searchAirportByNameActive(airportName: string): Observable<airport[]> {
    const headers = new HttpHeaders()
    .set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
    )
    const params = { airportName: airportName };
    return this.http.get<airport[]>(this.baseUrl() + "/airport/searchactive", { params, headers });
  }
  searchAirportByNameArchived(airportName: string): Observable<airport[]> {
    const headers = new HttpHeaders()
    .set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
    )
    const params = { airportName: airportName };
    return this.http.get<airport[]>(this.baseUrl() + "/airport/searcharchived", { params , headers});
  }


  deactivateAirport(id: string): Observable<void> {
    const headers = new HttpHeaders()
    .set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
    )
    const url = `${this.baseUrl()}/airport/deactivate/${id}`;
    return this.http.patch<void>(url, null, {headers});
  }

  ActivateAirport(id: string): Observable<void> {
    const headers = new HttpHeaders()
    .set(
      "Authorization",
      `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
    )
    const url = `${this.baseUrl()}/airport/activate/${id}`;
    return this.http.patch<void>(url, null, {headers});
  }



}