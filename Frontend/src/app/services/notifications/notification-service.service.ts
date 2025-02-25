import { Injectable } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import * as signalR from '@microsoft/signalr';
import { Observable, of, Subject } from 'rxjs';
import { BackgroundTask } from '@capawesome/capacitor-background-task';
import { App } from '@capacitor/app';

export enum NotificaitonKindEnum{
  PriceRise = 1,
  PriceDrops= 2,
  HugeTransactionVolume = 3
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {

  private hubConnection!: signalR.HubConnection;
  public messages: string[]=[];

  constructor() {
    //this.initializeAppStateListener();
    this.startConnection();
    this.addListener();
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

  // private initializeAppStateListener() {
  //   App.addListener('appStateChange', async ({ isActive }) => {
  //     if (!isActive) {
  //       // Aplikacja przeszła w tło
  //       const taskId = await BackgroundTask.beforeExit(async () => {
  //         this.hubConnection
  //           .start()
  //           .catch((err) => console.log('Error re-establishing connection: ' + err));

  //         BackgroundTask.finish({ taskId });
  //       });
  //     }
  //   });
  // }

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
