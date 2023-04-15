import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-view.component.html',
  styleUrls: ['./about-view.component.scss'],
})
export class AboutViewComponent implements OnInit {
  public isUser: boolean;
  ngOnInit(): void {
    this.isUser = !!localStorage.getItem('user');
  }
  @Input() isUserLogout: boolean | null;

  @Input() isUserLogin: boolean | null;

  @Output() goToLoginPage = new EventEmitter<any>();

  @Output() goToRegistrePage = new EventEmitter<any>();
  public clickGoToLoginPage(): void {
    this.goToLoginPage.emit();
  }

  public clickGoToRegistrePage(): void {
    this.goToRegistrePage.emit();
  }
}
