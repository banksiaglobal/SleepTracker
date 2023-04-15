import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
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
export class HeaderViewComponent implements OnInit {
  public isUser: boolean;
  ngOnInit(): void {
    this.isUser = !!localStorage.getItem('user');
  }
  @Input() isUserLogout: boolean | null;

  @Input() isUserLogin: boolean | null;
}
