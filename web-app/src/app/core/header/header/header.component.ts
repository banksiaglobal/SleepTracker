import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderViewComponent } from '../header-view/header-view.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, HeaderViewComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {}
