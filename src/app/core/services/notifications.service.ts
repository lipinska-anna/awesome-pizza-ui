import {inject, Injectable, signal} from '@angular/core';
import {Notification} from '../domain/notification';
import {Overlay, OverlayRef} from '@angular/cdk/overlay';
import {NotificationComponent} from '../components/notification/notification.component';
import {ComponentPortal} from '@angular/cdk/portal';

@Injectable({providedIn: 'root'})
export class NotificationsService {
  readonly notification = signal<Notification | null>(null);
  readonly #overlay = inject(Overlay);
  readonly #overlayRef = signal<OverlayRef|null>(null);

  onNotificationChange(notification: Notification | null) {
    if (notification === null) return;

    this.notification.set(notification)

    // Create the overlay and attach the component
    const positionStrategy = this.#overlay.position()
      .global()
      .centerHorizontally()
      .bottom('4rem');  // You can adjust the position to where you want the notification

    const overlayRef = this.#overlay.create({
      positionStrategy,       // Use the position strategy
      hasBackdrop: false,     // No backdrop for a toast
      scrollStrategy: this.#overlay.scrollStrategies.noop() // Prevents scroll behavior from affecting the overlay
    });
    // Attach the NotificationComponent to the overlay
    const componentRef = overlayRef.attach(new ComponentPortal(NotificationComponent));

    // Destroy the overlay after 5 seconds
    setTimeout(() => {
      overlayRef.dispose();  // Destroys the overlay and the attached component
    }, 5000);

    this.#overlayRef.set(overlayRef);

    return componentRef;
  }

  public destroyNotification() {
    this.#overlayRef()?.dispose();
  }
}
