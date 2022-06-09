import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization',environment.token)
  }

  getAllPosts(): Observable<Postagem[]>{
    return this.http.get<Postagem[]>('https://timetravellers.herokuapp.com/postagens/all', this.token)
  }

  getByIdPost(id: number): Observable<Postagem>{
    return this.http.get<Postagem>(`https://timetravellers.herokuapp.com/postagens/${id}`, this.token)
  }

  postPosts(post: Postagem): Observable<Postagem>{
    return this.http.post<Postagem>('https://timetravellers.herokuapp.com/postagens/publicar', post, this.token)
  }

  putPosts(post: Postagem): Observable<Postagem>{
    return this.http.put<Postagem>('https://timetravellers.herokuapp.com/postagens/atualizar', post, this.token)
  }

  deletePost(id: number){
    return this.http.delete(`https://timetravellers.herokuapp.com/postagens/${id}`, this.token)
  }
}
