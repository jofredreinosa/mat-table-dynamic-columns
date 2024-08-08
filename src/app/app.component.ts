import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

export interface User {
  id: string;
  dob: string;
  country: string;
  postcode: string;
  userName: string;
  fullName: string;
  phone: string;
  registered: string;
  cellPhone: string;
  email: string;
  gender: string;
}

export interface TableColumns {
  id: string;
  name: string;
  isShown: boolean;
  isDate: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private http = inject(HttpClient);
  title = 'matTableDynamicColumns';
  tableColumns: TableColumns[] = [
    {id: 'id', name: 'Id.', isShown: false, isDate: false},
    {id: 'fullName', name: 'Nombre completo.', isShown: true, isDate: false},
    {id: 'userName', name: 'Usuario.', isShown: false, isDate: false},
    {id: 'email', name: 'Email.', isShown: true, isDate: false},
    {id: 'dob', name: 'Fecha de nacimiento.', isShown: true, isDate: true},
    {id: 'country', name: 'País.', isShown: false, isDate: false},
    {id: 'postcode', name: 'Código postal.', isShown: false, isDate: false},
    {id: 'phone', name: 'Teléfono.', isShown: false, isDate: false},
    {id: 'cellPhone', name: 'Celular.', isShown: true, isDate: false},
    {id: 'registered', name: 'Fecha de registro.', isShown: false, isDate: true},
    {id: 'gender', name: 'Género.', isShown: false, isDate: false},
  ];

  displayedColumns: string[] = ['fullName', 'email', 'dob', 'cellPhone'];

  dataSource!: MatTableDataSource<User[]>;
  showColumnOptions = false;

  ngOnInit(): void {
    this.http.get('https://randomuser.me/api/?results=10')
    .pipe( map((data: any) => {
      const response: User[] = data.results.map((user: any) => {
        return {
          id: user.login.uuid.substr(0,5),
          fullName: `${user.name.first} ${user.name.last}`,
          dob: user.dob.date,
          country: user.location.country,
          postcode: user.location.postcode,
          userName: user.login.username,
          phone: user.phone,
          registered: user.registered.date,
          cellPhone: user.cell,
          email: user.email,
          gender: user.gender
        }
      });
      return response;
    }))
    .subscribe((values: any) => this.dataSource = values);
  }

  setShownColumn(element: any, columnId: string) {
    element.checked
    ? this.displayedColumns.push(columnId)
    : this.displayedColumns = this.displayedColumns.filter(colName => colName !== columnId);

  }
}
