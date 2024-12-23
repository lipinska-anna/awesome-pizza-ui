import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  standalone: true,
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {

  readonly router = inject(Router);

  navigateToCustomerArea(): void {
    this.router.navigate(['/customer']);
  }

  navigateToPizzaManArea(): void {
    this.router.navigate(['/orders']);
  }

}
