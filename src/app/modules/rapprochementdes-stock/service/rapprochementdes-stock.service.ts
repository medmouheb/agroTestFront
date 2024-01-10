import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { RapprochementDesStocks } from "../model/rapprochementdes-stock";
import { Observable } from "rxjs";
import { Page } from "app/shared/models";

@Injectable({
  providedIn: "root",
})
export class RapprochementdesStockService {
  constructor(private http: HttpClient) {}

  baseUrl() {
    return `${environment.apiUrl}`;
  }

  save(
    id: string | null,
    comp: RapprochementDesStocks,
  ): Observable<RapprochementDesStocks> {
    if (id) {
      return this.update(id, comp);
    }
    return this.create(comp);
  }

  create(comp: RapprochementDesStocks): Observable<RapprochementDesStocks> {
    let url = this.baseUrl() + "/rapprochement-des-stocks";
    return this.http.post<RapprochementDesStocks>(url, comp);
  }

  update(
    id: string,
    comp: RapprochementDesStocks,
  ): Observable<RapprochementDesStocks> {
    let url = `${this.baseUrl()}/rapprochement-des-stocks/${id}`;
    return this.http.put<RapprochementDesStocks>(url, comp);
  }

  findById(id: string): Observable<RapprochementDesStocks> {
    let url = `${this.baseUrl()}/rapprochement-des-stocks/${id}`;
    return this.http.get<RapprochementDesStocks>(url);
  }

  findBynumlot(code: string): Observable<RapprochementDesStocks> {
    let url = `${this.baseUrl()}/rapprochement-des-stocks/numlot/${code}`;
    return this.http.get<RapprochementDesStocks>(url);
  }

  findAll(): Observable<Array<RapprochementDesStocks>> {
    let url = this.baseUrl() + "/rapprochement-des-stocks";
    return this.http.get<Array<RapprochementDesStocks>>(url);
  }

  findPage(
    pageNumber: number,
    pageSize: number,
    filter: string,
  ): Observable<Page<RapprochementDesStocks>> {
    let url = this.baseUrl() + "/rapprochement-des-stocks/page";
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber);
    params = params.append("pageSize", pageSize);
    params = params.append("filter", filter);
    return this.http.get<Page<RapprochementDesStocks>>(url, { params });
  }

  delete(id: string): Observable<boolean> {
    let url = `${this.baseUrl()}/rapprochement-des-stocks/${id}`;
    return this.http.delete<boolean>(url);
  }

  archive(id: string): Observable<void> {
    let url = `${this.baseUrl()}/rapprochement-des-stocks/archiver/${id}`;
    return this.http.get<void>(url);
  }

  disArchive(id: string): Observable<void> {
    let url = `${this.baseUrl()}/rapprochement-des-stocks/desarchiver/${id}`;
    return this.http.get<void>(url);
  }

  findArchivedPage(
    pageNumber: number,
    pageSize: number,
    filter: string,
  ): Observable<Page<RapprochementDesStocks>> {
    let url = this.baseUrl() + "/rapprochement-des-stocks/archived/page";
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber);
    params = params.append("pageSize", pageSize);
    params = params.append("filter", filter);
    return this.http.get<Page<RapprochementDesStocks>>(url, { params });
  }
  findbycode(code: any): Observable<RapprochementDesStocks> {
    let url = `${this.baseUrl()}/rapprochement-des-stocks/numlot/${code}`;
    return this.http.get<RapprochementDesStocks>(url);
  }
  findbyName(name: any): Observable<RapprochementDesStocks> {
    let url = `${this.baseUrl()}/rapprochement-des-stocks/getbyname/${name}`;
    return this.http.get<RapprochementDesStocks>(url);
  }

  getAllproduit(): Observable<string[]> {
    let url = `${this.baseUrl()}/rapprochement-des-stocks/getAllproduit`;
    return this.http.get<string[]>(url);
  }
  findProduitName(code: string): Observable<any> {
    let url = `${this.baseUrl()}/rapprochement-des-stocks/getAllproduit/${code}`;
    return this.http.get(url);
  }
}
