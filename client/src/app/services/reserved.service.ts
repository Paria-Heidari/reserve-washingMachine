import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Machine } from "../shared/machine";
import { Reserved} from "../shared/reserved"

@Injectable({
  providedIn: 'root'
})
export class ReservedService {
  private BASE_URL = environment.BASE_URL;

  constructor(private http: HttpClient) {

   }

   getMachine(): Observable<Machine[]> {
    return this.http.get<Machine[]>(`${this.BASE_URL}/machines`)
  }

  getReserved(): Observable<Reserved[]> {
    return this.http.get<Reserved[]>(`${this.BASE_URL}/reserved`)
  }

  createReservation(formValues): Observable<Reserved> {
    return this.http.post<Reserved>(`${this.BASE_URL}/reserved`,formValues)}


  cancelReserved(id:string): Observable<any>{
    return this.http.delete(`${this.BASE_URL}/reserved/${id}`);
  }



}
