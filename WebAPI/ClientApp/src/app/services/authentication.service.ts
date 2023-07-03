import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { AuthBaseResponse, LoginResponseModel, UserLoginModel, UserRegistrationModel } from '@models';
import { NOTIFICATION_SERV_TOKEN, NotificationService } from '@services';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  private apiUrl = `${environment.API_BASE_URL}/user`;
  public userAuthentificated = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    @Inject(NOTIFICATION_SERV_TOKEN) private notifier: NotificationService
  ) { }

  public login(model: UserLoginModel): Observable<LoginResponseModel> {
    return this.http.post<LoginResponseModel>(`${this.apiUrl}/login`, model);
  }

  public registerUser(model: UserRegistrationModel, sysAdmin?: false): Observable<AuthBaseResponse> {
    // const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<AuthBaseResponse>(`${this.apiUrl}/register`, model, {headers: headers});
  }

  public isAuthenticated(): boolean {
    return this.userAuthentificated.value;
  }

  public userAuthentificatedStatus(status: boolean) {
    this.userAuthentificated.next(status);
  }

  public checkUserAuthentificatedStatus() {
    const token = localStorage.getItem('token');
    if (token) {
      this.userAuthentificated.next(true);
    } else {
      this.userAuthentificated.next(false);
    } 
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    this.userAuthentificated.next(false);
    this.notifier.successNotification('You have been logged out');
  }

  public getUserProfileById(id: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.apiUrl}/${id}`,
    { headers: headers});
  }

  public getAllUsers() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.apiUrl}/listall`,
    { headers: headers});
  }
}