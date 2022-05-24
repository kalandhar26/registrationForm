import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
const BASE_URL ="http://localhost:3000/users/";

 /*  Injectable decorator tells the injector that this service is eligible for dependency Injection It means that the 
 service object be created automatically for dependency injection in any component  or any other service class.
 we need to write the business logic in services in order to maintain light weight component classes. */
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  /* We need to write business logic in service classes. so that the method we can use it in 
  any other componets or services */

  createUser(data : any){
    return this.http.post<any>(BASE_URL,data).pipe(map(
      (res:any)=>{
        return res;
      }
    ))
  }

  getUser(){
    return this.http.get<any>(BASE_URL).pipe(map(
      (res:any)=>{
        return res;
      }
    ))
  }

  updateUser(data:any, id:number){
    return this.http.put<any>(BASE_URL+id,data).pipe(map(
      (res:any)=>{
        return res;
      }
    ))
  }

  deleteUser(id:number){
    return this.http.delete<any>(BASE_URL+id).pipe(map(
      (res:any)=>{
        return res;
      }
    ))
  }
}
