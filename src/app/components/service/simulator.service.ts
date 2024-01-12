import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";

const httpHeaders = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
};

@Injectable({
  providedIn: "root",
})
export class SimulatorService {
  baseURL = environment.urlBack;
  simulator = environment.simulator;

  constructor(private http: HttpClient) {}

  simulate(country, area, product): Observable<any> {
    return this.http.get<any>(
      this.baseURL +
        this.simulator +
        "/data/" +
        country +
        "/" +
        area +
        "/" +
        product,
      httpHeaders,
    );
  }
}
