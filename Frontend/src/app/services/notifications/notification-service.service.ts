import { Injectable, OnInit } from '@angular/core';
import { PushNotifications } from '@capacitor/push-notifications';
export enum NotificaitonKindEnum{
  PriceRise = 1,
  PriceDrops= 2,
  HugeTransactionVolume = 3
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService implements OnInit {

  public messages: string[]=[];

  constructor() {
  }
  ngOnInit() {
    PushNotifications.requestPermissions().then(permission => {
      if (permission.receive) {
        PushNotifications.register();
        console.log('Zarejestrowano urządzenie do odbioru powiadomień');
      } else {
        console.error('Brak zgody na odbieranie powiadomień');
      }
    });
  
    PushNotifications.addListener('pushNotificationReceived', (notification) => {
      console.log('Otrzymano powiadomienie:', notification);
      this.showNotification(notification);
    });
  
    PushNotifications.addListener('pushNotificationActionPerformed', (notification) => {
      console.log('Użytkownik wykonał akcję na powiadomieniu:', notification);
    });
  }

  public initNotifications(){
    PushNotifications.requestPermissions().then(permission => {
      if (permission.receive) {
        PushNotifications.register();
        console.log('Zarejestrowano urządzenie do odbioru powiadomień');
      } else {
        console.error('Brak zgody na odbieranie powiadomień');
      }
    });
  
    PushNotifications.addListener('pushNotificationReceived', (notification) => {
      console.log('Otrzymano powiadomienie:', notification);
      this.showNotification(notification);
    });
  
    PushNotifications.addListener('pushNotificationActionPerformed', (notification) => {
      console.log('Użytkownik wykonał akcję na powiadomieniu:', notification);
    });
  }
  
  private showNotification(notification: any) {
    new Notification(notification.notification.title, {
      body: notification.notification.body,
    });
  }
}
