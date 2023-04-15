import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FooterComponent } from './core/footer/footer.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './core/header/header/header.component';
import { MessageComponent } from './core/message/message.component';
import { MessagesService } from './share/services/message.service';
import { SpinnerComponent } from './core/spinner/spinner-page/spinner.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

  imports: [
    CommonModule,
    FooterComponent,
    HeaderComponent,
    RouterModule,
    SpinnerComponent,
    MessageComponent,
  ],
  providers: [MessagesService],
  standalone: true,
})
export class AppComponent {
  title = 'Sleep tracker';
}
