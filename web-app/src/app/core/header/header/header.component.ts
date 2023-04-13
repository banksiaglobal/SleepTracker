import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderViewComponent } from '../header-view/header-view.component';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { LocalStorageService } from 'src/app/share/services/localStorage.service';
import { AuthService } from 'src/app/share/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, HeaderViewComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(public auth: AuthService) {}
  public isUserLogin$: Observable<boolean>;

  public isUserLogout$: Observable<boolean>;

  ngOnInit(): void {
    this.ckeckIsLogin();
  }

  private ckeckIsLogin() {
    this.isUserLogin$ = this.auth.isLoggedIn$;

    this.isUserLogout$ = this.auth.isLoggedOut$;
  }
}
