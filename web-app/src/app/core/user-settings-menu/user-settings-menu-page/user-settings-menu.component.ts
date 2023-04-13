import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { UserSettingsViewComponent } from '../user-settings-view/user-settings-view.component';
import { AuthService } from 'src/app/share/services/auth.service';

@Component({
  selector: 'app-user-settings-menu',
  standalone: true,
  imports: [CommonModule, UserSettingsViewComponent],
  templateUrl: './user-settings-menu.component.html',
  styleUrls: ['./user-settings-menu.component.scss'],
})
export class UserSettingsMenuComponent {
  public user$: Observable<string>;

  public currentCompany$: Observable<string>;

  constructor(public auth: AuthService) {}

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.user$ = this.auth.user$;
  }

  public logout(): void {
    this.auth.logout();
  }
}
