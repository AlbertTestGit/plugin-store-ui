import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Plugin } from 'src/app/models';
import { ApiService } from 'src/app/services/api.service';
import { PluginDialogComponent } from '../plugin-dialog/plugin-dialog.component';

@Component({
  selector: 'app-plugins',
  templateUrl: './plugins.component.html',
  styleUrls: ['./plugins.component.scss']
})
export class PluginsComponent {
  constructor(public dialog: MatDialog, private apiService: ApiService) {}

  openDialog() {
    this.dialog.open(PluginDialogComponent, {
      width: '30%',
    });
  }

  displayedColumns: string[] = ['name', 'petrelVersion', 'productKey', 'createdAt', 'action'];
  dataSource!: MatTableDataSource<Plugin>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.getPlugins();
  }

  getPlugins() {
    this.apiService.getPlugins().subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  editPlugin(row: any) {
    this.dialog.open(PluginDialogComponent, {
      width: '30%',
      data: row
    });
  }

  deletePlugin(row: any) {
    // console.log(row)
    if (confirm(`Вы действительно хотите удалить "${row.name}"`)) {
      this.apiService.deletePlugin(row.id).subscribe({
        next: () => {
          alert('Success!');
        },
        error: (err) => {
          alert(err.error.message);
        }
      })
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
