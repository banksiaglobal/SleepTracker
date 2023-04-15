import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSettingsMenuComponent } from '../../user-settings-menu/user-settings-menu-page/user-settings-menu.component';
import { AuthService } from 'src/app/share/services/auth.service';

@Component({
  selector: 'app-header-view',
  standalone: true,
  imports: [CommonModule, UserSettingsMenuComponent],
  templateUrl: './header-view.component.html',
  styleUrls: ['./header-view.component.scss'],
})
export class HeaderViewComponent {
  constructor(public auth: AuthService) {}
  @Input() isUserLogout: boolean | null;

  @Input() isUserLogin: boolean | null;
}
