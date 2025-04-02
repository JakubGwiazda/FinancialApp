import { Component, OnInit } from '@angular/core';
import { FirebaseMessaging } from '@capacitor-firebase/messaging';
import { NotificationService as LocalNotifications } from './services/notifications/notification-service.service';
import { NotificationService } from 'crypto-api/model/notification';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  title = 'cryptoinfo';
  constructor(
    public notification: NotificationService,
    private localNotificaitons: LocalNotifications
  ) {}

  ngOnInit() {
    this.setupFCM();
    //this.localNotificaitons.initNotifications();
  }

  async setupFCM() {
    try {
      const permission = await FirebaseMessaging.requestPermissions();
      console.log('FCM Permission:', permission);
      console.log('FCM Permission:', permission.receive);

      if (permission.receive === 'granted') {
        const token = await FirebaseMessaging.getToken();

        this.notification
          .registerDevice({ token: token.token })
          .subscribe((res) => console.log(res));
        console.log('Token przekazany na backend');
      }
    } catch (error) {
      console.error('Błąd konfiguracji FCM:', error);
    }
  }
}
