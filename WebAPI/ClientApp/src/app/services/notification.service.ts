import { Injectable, InjectionToken } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export let NOTIFICATION_SERV_TOKEN = new InjectionToken('NotificationServiceImpl');


export interface INotificationService {
  successNotification(msg?: any, action?: undefined, duration?: any): void;
  errorNotification(msg?: any, action?: undefined, duration?: any): void;
  infoNotification(msg?: any, action?: undefined, duration?: any): void;
  warningNotification(msg?: any, action?: undefined, duration?: any): void;
}


@Injectable({
  providedIn: 'root'
})
export class NotificationService implements INotificationService {


  constructor(public snack: MatSnackBar) { }

    public successNotification(msg?: any, action?: undefined, duration = 5000): void {
        this.snack.open(msg, action, { duration, panelClass: 'success-notification' });
    }

    public errorNotification(msg?: any, action?: undefined, duration = 3000): void {
      this.snack.open(msg, action, { duration, panelClass: 'error-notification' });
    }

    public warningNotification(msg?: any, action?: undefined, duration = 3000): void {
      this.snack.open(msg, action, { duration, panelClass: 'warning-notification' });
    }

    public infoNotification(msg?: any, action?: undefined, duration = 3000): void {
      this.snack.open(msg, action, { duration, panelClass: 'info-notification' });
    }
}