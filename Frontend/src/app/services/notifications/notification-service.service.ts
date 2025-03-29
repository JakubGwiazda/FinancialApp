import { Injectable, OnInit } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import * as signalR from '@microsoft/signalr';
import { Observable, of, Subject } from 'rxjs';
import { BackgroundTask } from '@capawesome/capacitor-background-task';
import { App } from '@capacitor/app';
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

  private hubConnection!: signalR.HubConnection;
  public messages: string[]=[];

  constructor() {
    this.startConnection();
    this.addListener();
  }
  ngOnInit() {
    console.log('zarejestrowano powaidomieania')
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
    console.log('zarejestrowano powaidomieania')
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

  
  private startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://192.168.0.13:7054/notificationService',{
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
      .build();

    this.hubConnection
      .start()
      .catch(err => console.log('Error establishing connection: ' + err));
  }

  private addListener() {
    this.hubConnection.on('ReceiveNotification', (message: string) => {
      this.messages.push(message);
      this.pushNotification(NotificaitonKindEnum.PriceRise, 'Testowy message z backendu', message);
    });
  }


  async pushNotification(notificationKind: NotificaitonKindEnum, title: string, body:string) {
    const permStatus = await LocalNotifications.checkPermissions();
    if (permStatus.display === 'granted') {
      await LocalNotifications.schedule({
        notifications: [
          {
            title: title,
            body: body,
            id: 1,
            sound: 'default',
            actionTypeId: '',
            extra: null,
          },
        ],
      });
    }
  }
}
