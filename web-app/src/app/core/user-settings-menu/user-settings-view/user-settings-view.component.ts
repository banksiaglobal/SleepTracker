import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-settings-view',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  templateUrl: './user-settings-view.component.html',
  styleUrls: ['./user-settings-view.component.scss'],
})
export class UserSettingsViewComponent {
  constructor(private router: Router) {}

  @Input() user: string | null;

  @Output() logout = new EventEmitter<any>();

  public goToCompaniesPage() {
    this.router.navigate(['/companies']);
  }

  public goToSettingsPage() {
    this.router.navigate(['/settings']);
  }

  public userLogout() {
    this.logout.emit();
  }
}
