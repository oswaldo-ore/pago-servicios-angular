import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { GlobalComponent } from 'src/app/utils/global-component';
import { jwtDecode } from "jwt-decode";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  async login(credentials: any) {
    try {
      const response = await this.http.post<any>(GlobalComponent.AUTH_API, credentials).toPromise();
      return response;
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      throw error;
    }
  }
  async userVerify(code: any) {
    try {
      const parametros = { code: code };
      const response = await this.http.post<any>(GlobalComponent.user_verify,parametros ).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async logout() {
    try {
      const response = await this.http.post<any>(GlobalComponent.LOGOUT_API,[]).toPromise();
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      throw error;
    }
  }

  getToken(){
    return this.cookieService.get('token');
  }

  isLoggedIn(): boolean {
    const token = this.cookieService.get('token');
    return (token !== null && token !== '' && !this.isTokenExpired(token??''))
  }

  private isTokenExpired(token: string): boolean {
    const tokenData = jwtDecode(token);
    if(tokenData === null){
      return true;
    }
    const currentDateInSeconds = Math.floor(Date.now() / 1000);
    return tokenData.exp! < currentDateInSeconds;
  }
}
