import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderViewComponent } from '../header-view/header-view.component';
import { Observable } from 'rxjs';
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
  public user$: Observable<string>;

  ngOnInit(): void {
    this.ckeckIsLogin();
  }

  private ckeckIsLogin() {
    this.isUserLogin$ = this.auth.isLoggedIn$;

    this.isUserLogout$ = this.auth.isLoggedOut$;

    this.user$ = this.auth.user$;
  }
}
