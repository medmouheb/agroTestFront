import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { RapprochementDesStocks } from '../model/rapprochementdes-stock';
import { Observable } from 'rxjs';
import { Page } from 'app/shared/models';

@Injectable({
  providedIn: 'root'
})
export class RapprochementdesStockService {
  constructor(private http: HttpClient) {}

  baseUrl() {
    return `${environment.apiUrl}`;
  }

  save(id: string | null, comp: RapprochementDesStocks): Observable<RapprochementDesStocks> {
    if (id) {
      return this.update(id, comp);
    }
    return this.create(comp);
  }

  create(comp: RapprochementDesStocks): Observable<RapprochementDesStocks> {
    const headers = new HttpHeaders()
      .set(
        "Authorization",
        `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
      )
    let url = this.baseUrl()+"/rapprochement-des-stocks";
    return this.http.post<RapprochementDesStocks>(url, comp , {headers});
  }

  update(id: string, comp: RapprochementDesStocks): Observable<RapprochementDesStocks> {
    const headers = new HttpHeaders()
      .set(
        "Authorization",
        `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
      )
    let url = `${this.baseUrl()}/rapprochement-des-stocks/${id}`;
    return this.http.put<RapprochementDesStocks>(url, comp , {headers});
  }

  findById(id: string): Observable<RapprochementDesStocks> {
    const headers = new HttpHeaders()
      .set(
        "Authorization",
        `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
      )
    let url = `${this.baseUrl()}/rapprochement-des-stocks/${id}`;
    return this.http.get<RapprochementDesStocks>(url , {headers});
  }

  findBynumlot(code: string): Observable<RapprochementDesStocks> {
    const headers = new HttpHeaders()
      .set(
        "Authorization",
        `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
      )
    let url = `${this.baseUrl()}/rapprochement-des-stocks/numlot/${code}`;
    return this.http.get<RapprochementDesStocks>(url , {headers});
  }

  findAll(): Observable<Array<RapprochementDesStocks>> {
    const headers = new HttpHeaders()
      .set(
        "Authorization",
        `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
      )
    let url = this.baseUrl()+'/rapprochement-des-stocks';
    return this.http.get<Array<RapprochementDesStocks>>(url , {headers});
  }

  findPage(
    pageNumber: number,
    pageSize: number,
    filter: string
  ): Observable<Page<RapprochementDesStocks>> {
    const headers = new HttpHeaders()
      .set(
        "Authorization",
        `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
      )
    let url = this.baseUrl() + "/rapprochement-des-stocks/page";
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber);
    params = params.append("pageSize", pageSize);
    params = params.append("filter", filter);
    return this.http.get<Page<RapprochementDesStocks>>(url, { params , ...{headers} });
  }

  delete(id: string): Observable<boolean> {
    const headers = new HttpHeaders()
      .set(
        "Authorization",
        `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
      )
    let url = `${this.baseUrl()}/rapprochement-des-stocks/${id}`;
    return this.http.delete<boolean>(url , {headers});
  }

  archive(id: string): Observable<void> {
    const headers = new HttpHeaders()
      .set(
        "Authorization",
        `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
      )
    let url = `${this.baseUrl()}/rapprochement-des-stocks/archiver/${id}`;
    return this.http.get<void>(url , {headers});
  }

  disArchive(id: string): Observable<void> {
    const headers = new HttpHeaders()
      .set(
        "Authorization",
        `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
      )
    let url = `${this.baseUrl()}/rapprochement-des-stocks/desarchiver/${id}`;
    return this.http.get<void>(url , {headers});
  }



  findArchivedPage(
    pageNumber: number,
    pageSize: number,
    filter: string
  ): Observable<Page<RapprochementDesStocks>> {
    const headers = new HttpHeaders()
      .set(
        "Authorization",
        `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
      )
    let url = this.baseUrl() + "/rapprochement-des-stocks/archived/page";
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber);
    params = params.append("pageSize", pageSize);
    params = params.append("filter", filter);
    return this.http.get<Page<RapprochementDesStocks>>(url, { params , ...{headers} });
  }
  findbycode(code:any): Observable<RapprochementDesStocks>{
    const headers = new HttpHeaders()
      .set(
        "Authorization",
        `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
      )
    let url = `${this.baseUrl()}/rapprochement-des-stocks/numlot/${code}`;
    return this.http.get<RapprochementDesStocks>(url , {headers});

  }
  findbyName(name:any): Observable<RapprochementDesStocks>{
    const headers = new HttpHeaders()
      .set(
        "Authorization",
        `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
      )
    let url = `${this.baseUrl()}/rapprochement-des-stocks/getbyname/${name}`;
    return this.http.get<RapprochementDesStocks>(url , {headers});
  }


  getAllproduit(): Observable<string[]>{
    const headers = new HttpHeaders()
      .set(
        "Authorization",
        `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
      )
    let url = `${this.baseUrl()}/rapprochement-des-stocks/getAllproduit`;
    return this.http.get<string[]>(url , {headers});

  }
  findProduitName(code:string): Observable<any>{
    const headers = new HttpHeaders()
      .set(
        "Authorization",
        `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
      )
    let url = `${this.baseUrl()}/rapprochement-des-stocks/getAllproduit/${code}`;
    return this.http.get(url , {headers});

  }
}
