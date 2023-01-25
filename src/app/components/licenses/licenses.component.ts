import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PluginShortInfo, User } from 'src/app/models';
import { ApiService } from 'src/app/services/api.service';
import { LicenseDialogComponent } from '../license-dialog/license-dialog.component';
import jwt_decode from "jwt-decode";
import { JwtPayload } from 'src/app/models';

@Component({
  selector: 'app-licenses',
  templateUrl: './licenses.component.html',
  styleUrls: ['./licenses.component.scss']
})
export class LicensesComponent implements OnInit{
  constructor(public dialog: MatDialog, private apiService: ApiService) {}

  selected = '';

  displayedColumns: string[] = ['productKey', 'name', 'unusedLicenses', 'action'];
  dataSource!: MatTableDataSource<PluginShortInfo>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  user: User | undefined;
  users: User[] = [];

  ngOnInit(): void {
    const token = localStorage.getItem('access_token')!;
    const decode = jwt_decode<JwtPayload>(token);
    this.selected = decode.sub.toString();

    if (decode.role == 'admin' || decode.role == 'manager') {
      this.getUsers();
    } else {
      this.getUser(decode.sub);
    }

    this.getUserLicenses(+this.selected);
  }

  getUsers() {
    this.apiService.getUsers().subscribe(res => {
      this.users = res;
    });
  }

  getUser(userId: number) {
    this.apiService.getUser(userId).subscribe(res => {
      this.users.push(res);
    })
  }

  getUserLicenses(userId: number) {
    this.apiService.getUserLicenses(userId).subscribe(res => {
      console.log(res);
      this.user = res.user;

      this.dataSource = new MatTableDataSource(res.licenses);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  editUserLicenses(row: any) {
    this.dialog.open(LicenseDialogComponent, {
      width: '30%',
      data: {
        row,
        user: this.user,
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  selectChange() {
    this.getUserLicenses(+this.selected);
  }
}
