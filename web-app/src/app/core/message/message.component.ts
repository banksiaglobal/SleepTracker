import { Component, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Observable, tap } from 'rxjs';
import { animate, style, transition, trigger } from '@angular/animations';
import { MessagesService } from 'src/app/share/services/message.service';

@Component({
  selector: 'app-message',
  imports: [CommonModule, MatIconModule],
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  standalone: true,
  animations: [
    trigger('openClose', [
      transition('void => *', [style({ opacity: 0 }), animate(200)]),
      transition('* => void', [animate(200, style({ opacity: 0 }))]),
    ]),
  ],
})
export class MessageComponent implements OnInit {
  public messages$!: Observable<string[]>;

  public showMessages = false;

  public isWarn = false;

  constructor(
    public messagesService: MessagesService,
    public element: ElementRef
  ) {}

  ngOnInit(): void {
    this.messages$ = this.messagesService.messages$.pipe(
      tap((data) =>
        data.length > 1 ? (this.isWarn = true) : (this.isWarn = false)
      ),
      tap(() => (this.showMessages = true)),
      tap(() => setTimeout(() => (this.showMessages = false), 2000))
    );
  }

  onClose() {
    this.showMessages = false;
  }
}
