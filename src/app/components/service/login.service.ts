import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  baseURL = environment.auth;

  constructor(private http: HttpClient) {}

  signIn(username, password) {
    return this.http.post(this.baseURL + "/signin", { username, password });
  }
  signUp(user) {
    return this.http.post(this.baseURL + "/signup", user);
  }
  verify(verificationCode) {
    return this.http.get(this.baseURL + "/verify/" + verificationCode);
  }
}
