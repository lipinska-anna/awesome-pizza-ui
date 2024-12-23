import {ChangeDetectorRef, NgZone, OnDestroy, Pipe, PipeTransform} from '@angular/core';

@Pipe({
  standalone: true,
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform, OnDestroy {

  private currentTime: number = Date.now();
  private timer: any;

  constructor(private changeDetector: ChangeDetectorRef, private ngZone: NgZone) {
    this.updateTime();
  }

  transform(value: string | Date | number): string {
    if (!value) return 'Invalid date';

    const orderTime = new Date(value).getTime();
    const difference = this.currentTime - orderTime;

    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (seconds < 60) {
      return `${seconds} seconds ago`;
    } else if (minutes < 60) {
      return `${minutes} minutes ago`;
    } else if (hours < 24) {
      return `${hours} hours ago`;
    } else {
      const days = Math.floor(hours / 24);
      return `${days} days ago`;
    }
  }

  private updateTime() {
    this.ngZone.runOutsideAngular(() => {
      this.timer = setInterval(() => {
        this.currentTime = Date.now();
        this.ngZone.run(() => this.changeDetector.markForCheck());  // Trigger Angular change detection
      }, 1000);
    });
  }

  // Clean up when the pipe is destroyed
  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }


}
