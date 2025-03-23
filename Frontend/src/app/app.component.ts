import { Component, OnInit } from '@angular/core';
import { FirebaseMessaging } from '@capacitor-firebase/messaging';
import { NotificationService as LocalNotifications } from './services/notifications/notification-service.service';
import { NotificationService } from 'crypto-api/model/notification';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent implements OnInit{
  title = 'cryptoinfo';
  constructor(public notification: NotificationService, private localNotificaitons: LocalNotifications) {
  }
  
  ngOnInit() {
    this.setupFCM();
    this.localNotificaitons.initNotifications();
  }

  async setupFCM() {
    try {
      const permission = await FirebaseMessaging.requestPermissions();
      console.log('FCM Permission:', permission);

      if (permission.receive === 'granted') {
        const token = await FirebaseMessaging.getToken();
        console.log('FCM Token:', token.token);
        
        this.notification.registerDevice({token: token.token})
        .subscribe(res => console.log(res));
        console.log('przekazanie tokenu na backend zostało zakońćzone')
      }

      FirebaseMessaging.addListener('notificationReceived', (message) => {
        console.log('Otrzymano powiadomienie:', message);
        console.log('Body:', message.notification.body);
        console.log('Body:', message.notification.title);
      });

    } catch (error) {
      console.error('Błąd konfiguracji FCM:', error);
    }
  }
  
}
