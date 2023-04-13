import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutViewComponent } from '../about-view/about-view.component';
import { AuthService } from 'src/app/share/services/auth.service';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { LocalStorageService } from 'src/app/share/services/localStorage.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, AboutViewComponent],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  constructor(public storage: LocalStorageService, private router: Router) {}
  ngOnInit(): void {
    this.isUserLogin$ = of(!!this.storage.getUser());
  }

  public isUserLogin$: Observable<boolean> = of(false);

  public goToLoginPage(): void {
    this.router.navigate(['/signin']);
  }

  public goToRegistrePage(): void {
    this.router.navigate(['/signup']);
  }
}
