import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class GlobalService {
  private headers: HttpHeaders = new HttpHeaders;
  private options: any = {};

  constructor(public http: HttpClient) { }

  setHeader() {
    this.headers = new HttpHeaders({
      "Content-Type": "application/json;charset=utf-8",
      "Access-Control-Allow-Origin": "*"
    });
    this.options = {
      headers: this.headers
    }
  }

  public get HttpHeader(): HttpHeaders {
    this.setHeader();
    return this.headers;
  }

  public get HttpOptions() {
    this.setHeader();
    return this.options;
  }

}