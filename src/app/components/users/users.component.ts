import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/models';
import { ApiService } from 'src/app/services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  constructor(public dialog: MatDialog, private apiService: ApiService) {}

  openDialog() {
    this.dialog.open(UserDialogComponent, {
      width: '30%',
    });
  }

  displayedColumns: string[] = ['id', 'username', 'role', 'action'];
  dataSource!: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.apiService.getUsers().subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  editUser(row: any) {
    this.dialog.open(UserDialogComponent, {
      width: '30%',
      data: row
    });
  }

  deleteUser(row: any) {
    console.log(row)
    if (confirm(`Вы действительно хотите удалить пользователя "${row.username}"`)) {
      this.apiService.deleteUser(row.id).subscribe({
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
