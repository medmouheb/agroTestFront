import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { manufacturer } from "../Models/manufacturer.model";
import { environment } from "environments/environment";


@Injectable({
    providedIn: 'root'
})
export class manufacturerService {


    baseUrl() {
        return `${environment.apiUrl}`;
    }
    constructor(private http: HttpClient) { }



    getActiveManufacturers(): Observable<manufacturer[]> {
        const headers = new HttpHeaders()
            .set(
                "Authorization",
                `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
            )

        return this.http.get<manufacturer[]>(this.baseUrl() + '/manufacturer/active' , {headers});
    }
    getArchivedManufacturers(): Observable<manufacturer[]> {
        const headers = new HttpHeaders()
            .set(
                "Authorization",
                `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
            )

        return this.http.get<manufacturer[]>(this.baseUrl() + '/manufacturer/archived' , {headers});
    }

    save(id: string | null, manufacturer: manufacturer): Observable<manufacturer> {
        if (id) {
            return this.update(id, manufacturer);
        }
        return this.create(manufacturer);
    }
    create(manufacturer: manufacturer): Observable<manufacturer> {
        const headers = new HttpHeaders()
            .set(
                "Authorization",
                `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
            )
        let url = this.baseUrl() + '/manufacturer';
        return this.http.post<manufacturer>(url, manufacturer , {headers});
    }

    update(id: string, manufacturer: manufacturer): Observable<manufacturer> {
        const headers = new HttpHeaders()
            .set(
                "Authorization",
                `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
            )
        let url = `${this.baseUrl()}/manufacturer/${id}`;
        return this.http.put<manufacturer>(url, manufacturer , {headers});
    }
    delete(id: string): Observable<boolean> {
        const headers = new HttpHeaders()
            .set(
                "Authorization",
                `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
            )
        let url = `${this.baseUrl()}/manufacturer/${id}`;
        return this.http.delete<boolean>(url , {headers});
    }

    findManufacturerById(id: string): Observable<manufacturer> {
        const headers = new HttpHeaders()
            .set(
                "Authorization",
                `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
            )
        let url = `${this.baseUrl()}/manufacturer/${id}`;
        return this.http.get<manufacturer>(url , {headers});
    }

    searchManufacturerByNameActive(manufacturerName: string): Observable<manufacturer[]> {
        const headers = new HttpHeaders()
            .set(
                "Authorization",
                `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
            )

        const params = { manufacturerName: manufacturerName };
        return this.http.get<manufacturer[]>(this.baseUrl() + "/manufacturer/searchactive", { params , ...{headers} });
    }
    searchManufacturerByNameArchived(manufacturerName: string): Observable<manufacturer[]> {
        const headers = new HttpHeaders()
            .set(
                "Authorization",
                `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
            )

        const params = { manufacturerName: manufacturerName };
        return this.http.get<manufacturer[]>(this.baseUrl() + "/manufacturer/searcharchived", { params , ...{headers} });
    }

    deactivateManufacturer(id: string): Observable<void> {
        const headers = new HttpHeaders()
            .set(
                "Authorization",
                `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
            )

        const url = `${this.baseUrl()}/manufacturer/deactivate/${id}`;
        return this.http.patch<void>(url, null , {headers});
    }

    ActivateManufacturer(id: string): Observable<void> {
        const headers = new HttpHeaders()
            .set(
                "Authorization",
                `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
            )

        const url = `${this.baseUrl()}/manufacturer/activate/${id}`;
        return this.http.patch<void>(url, null , {headers});
    }



}