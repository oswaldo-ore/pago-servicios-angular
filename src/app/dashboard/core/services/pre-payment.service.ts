import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalComponent } from 'src/app/utils/global-component';

@Injectable({
  providedIn: 'root',
})
export class PrePaymentService {
  constructor(private http: HttpClient) {}

  async savePrePaymentToUser(
    userId: number,
    serviceId: number,
    amount: number,
    description: string
  ) {
    let response = await this.http
      .post<any>(GlobalComponent.prepayment_save, {
        userId: userId,
        serviceId: serviceId,
        amount: amount,
        description: description ?? '',
      })
      .toPromise();
    if (response.success) {
      return response;
    }
    throw response.message;
  }
}
