import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { productCategory } from "../Models/productCategory.model";
import { environment } from "environments/environment";


@Injectable({
    providedIn: 'root'
})
export class productCategoryService {


    baseUrl() {
        return `${environment.apiUrl}`;
    }
    constructor(private http: HttpClient) { }



    getActiveProductCategories(): Observable<productCategory[]> {
        const headers = new HttpHeaders()
            .set(
                "Authorization",
                `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
            )
        return this.http.get<productCategory[]>(this.baseUrl() + '/productCategory/active' , {headers});
    }
    getArchivedProductCategories(): Observable<productCategory[]> {
        const headers = new HttpHeaders()
            .set(
                "Authorization",
                `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
            )
        return this.http.get<productCategory[]>(this.baseUrl() + '/productCategory/archived' , {headers});
    }

    save(id: string | null, productCategory: productCategory): Observable<productCategory> {
        if (id) {
            return this.update(id, productCategory);
        }
        return this.create(productCategory);
    }
    create(productCategory: productCategory): Observable<productCategory> {
        const headers = new HttpHeaders()
            .set(
                "Authorization",
                `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
            )
        let url = this.baseUrl() + '/productCategory';
        return this.http.post<productCategory>(url, productCategory , {headers});
    }

    update(id: string, productCategory: productCategory): Observable<productCategory> {
        const headers = new HttpHeaders()
            .set(
                "Authorization",
                `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
            )
        let url = `${this.baseUrl()}/productCategory/${id}`;
        return this.http.put<productCategory>(url, productCategory , {headers});
    }
    delete(id: string): Observable<boolean> {
        const headers = new HttpHeaders()
            .set(
                "Authorization",
                `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
            )
        let url = `${this.baseUrl()}/productCategory/${id}`;
        return this.http.delete<boolean>(url , {headers});
    }

    findProductCategoryById(id: string): Observable<productCategory> {
        const headers = new HttpHeaders()
            .set(
                "Authorization",
                `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
            )
        let url = `${this.baseUrl()}/productCategory/${id}`;
        return this.http.get<productCategory>(url , {headers});
    }

    searchProductCategoryByNameActive(productCategoryName: string): Observable<productCategory[]> {
        const headers = new HttpHeaders()
            .set(
                "Authorization",
                `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
            )
        const params = { productCategoryName: productCategoryName };
        return this.http.get<productCategory[]>(this.baseUrl() + "/productCategory/searchactive", { params , ...{headers} });
    }
    searchProductCategoryByNameArchived(productCategoryName: string): Observable<productCategory[]> {
        const headers = new HttpHeaders()
            .set(
                "Authorization",
                `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
            )
        const params = { productCategoryName: productCategoryName };
        return this.http.get<productCategory[]>(this.baseUrl() + "/productCategory/searcharchived", { params , ...{headers} });
    }


    deactivateProductCategory(id: string): Observable<void> {
        const headers = new HttpHeaders()
            .set(
                "Authorization",
                `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
            )
        const url = `${this.baseUrl()}/productCategory/deactivate/${id}`;
        return this.http.patch<void>(url, null , {headers});
    }

    ActivateProductCategory(id: string): Observable<void> {
        const headers = new HttpHeaders()
            .set(
                "Authorization",
                `${JSON.parse(localStorage.getItem("tocken")).tokenType} ${JSON.parse(localStorage.getItem("tocken")).accessToken}`
            )
        const url = `${this.baseUrl()}/productCategory/activate/${id}`;
        return this.http.patch<void>(url, null , {headers});
    }



}