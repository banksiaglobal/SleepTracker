import { Component, Input, ViewChild, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ISleepSettings } from 'src/app/share/interfaces/sleep';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sleeps-view',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatTableModule, MatPaginatorModule],
  templateUrl: './sleeps-view.component.html',
  styleUrls: ['./sleeps-view.component.scss'],
})
export class SleepsViewComponent {
  constructor(private router: Router) {}
  @Input() listSleeps: any[] | null;

  public displayedColumns: string[] = ['end_time'];

  public dataSource = new MatTableDataSource<ISleepSettings[]>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['listSleeps'].currentValue) {
      this.dataSource.data = changes['listSleeps'].currentValue;
    }
  }

  public viewSleep(current: ISleepSettings): void {
    console.log('popup');
    this.router.navigate(['/sleep', current.id]);
  }
}
