import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerViewComponent } from '../spinner-view/spinner-view.component';
import { Observable } from 'rxjs';
import { LoadingService } from 'src/app/share/services/loading.service';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule, SpinnerViewComponent],
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent implements OnInit {
  constructor(private loadingService: LoadingService) {}
  ngOnInit(): void {
    this.loadData();
  }

  public loading$: Observable<boolean>;

  private loadData() {
    this.loading$ = this.loadingService.loading$;
  }
}
