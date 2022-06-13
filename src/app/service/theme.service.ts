import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization',environment.token)
  }

  refreshtoken(){
    this.token = {
      headers: new HttpHeaders().set('Authorization',environment.token)
    }
  }

  getAllThemes(): Observable<Tema[]>{
    return this.http.get<Tema[]>('https://timetravellers.herokuapp.com/tema/all', this.token)
  }

  getByIdTheme(id: number): Observable<Tema>{
    return this.http.get<Tema>(`https://timetravellers.herokuapp.com/tema/${id}`, this.token)
  }

  postTheme(theme: Tema): Observable<Tema>{
    return this.http.post<Tema>('https://timetravellers.herokuapp.com/tema/criar',theme, this.token)
  }

  putTheme(theme: Tema): Observable<Tema>{
    return this.http.put<Tema>('https://timetravellers.herokuapp.com/tema/atualizar', theme, this.token)
  }

  deleteTheme(id: number){
    return this.http.delete(`https://timetravellers.herokuapp.com/tema/${id}`, this.token)
  }
}
