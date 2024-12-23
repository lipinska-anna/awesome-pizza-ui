import {Component, inject} from '@angular/core';
import {NotificationsService} from '../../services/notifications.service';
import {animate, style, transition, trigger} from '@angular/animations';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Overlay} from '@angular/cdk/overlay';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  standalone: true,
  styleUrl: './notification.component.css',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.2s', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('0.2s', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class NotificationComponent {

  readonly #notificationService = inject(NotificationsService);
  readonly #overlay = inject(Overlay);
  readonly notificationSignal = this.#notificationService.notification;

  onNotificationClick() {
    this.#notificationService.destroyNotification();
  }
}
