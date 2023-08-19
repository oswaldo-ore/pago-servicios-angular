import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { GlobalComponent } from 'src/app/utils/global-component';

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
    return (token !== null && token !== '')
  }

  private isTokenExpired(token: string): boolean {
    return false;
  }
}
