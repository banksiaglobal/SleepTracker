import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  private messages = new BehaviorSubject<string[]>([]);

  public messages$: Observable<string[]> = this.messages
    .asObservable()
    .pipe(filter((messages) => messages && messages.length > 0));

  public shomMessage(...messages: string[]) {
    this.messages.next(messages);
  }
}
