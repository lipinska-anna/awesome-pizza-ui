import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  standalone: true,
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  readonly #router = inject(Router)

  public navigateToHomepage(): void {
    this.#router.navigate([`/`]);
  }
}
