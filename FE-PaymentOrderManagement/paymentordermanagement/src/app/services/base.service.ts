import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map, catchError } from 'rxjs/operators';
import { GlobalService } from './global.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  constructor(private globalService: GlobalService) { }

  getAll(controller: string): Observable<any> {

    let url = environment.baseUrl + controller;
    return this.globalService.http
      .get(url, this.globalService.HttpOptions)
      .pipe(
        map((r: any) => {
          if (!environment.production) {
            console.log(controller + "getAll", r);
          }
          return r;
        }),
        catchError((error) => {
          console.log("error :", error);
          return error;
        })
      );
  }

  getById(id: any, controller: string): Observable<any> {

    let url = environment.baseUrl + controller + id;

    return this.globalService.http
      .get(url, this.globalService.HttpOptions)
      .pipe(
        map((r: any) => {
          if (!environment.production) {
            console.log(controller + "getById", r);
          }
          return r;
        }),
        catchError((error) => {
          console.log("error :", error);
          return error;
        })
      );
  }

  add(value: any, controller: string): Observable<any> {

    let body = JSON.stringify(value);
    let url = environment.baseUrl + controller;

    return this.globalService.http
      .post(url, body, this.globalService.HttpOptions)
      .pipe(
        map((r: any) => {
          if (!environment.production) {
            console.log(controller + "add", r);
          }
          return r;
        }),
        catchError((error) => {
          console.log("error :", error);
          return error;
        })
      );
  }

  update(value: any, controller: string): Observable<any> {

    let body = JSON.stringify(value);
    let url = environment.baseUrl + controller + value.id;

    return this.globalService.http
      .put(url, body, this.globalService.HttpOptions)
      .pipe(
        map((r: any) => {
          if (!environment.production) {
            console.log(controller + "update", r);
          }
          return r;
        }),
        catchError((error) => {
          console.log("error :", error);
          return error;
        })
      );
  }

  delete(id: any, controller: string): Observable<any> {

    let url = environment.baseUrl + controller + id;

    return this.globalService.http
      .delete(url, this.globalService.HttpOptions)
      .pipe(
        map((r: any) => {
          if (!environment.production) {
            console.log(controller + "delete", r);
          }
          return r;
        }),
        catchError((error) => {
          console.log("error :", error);
          return error;
        })
      );
  }
}