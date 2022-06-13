import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../model/Usuario';
import { UsuarioLogin } from '../model/UsuarioLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token = {
    headers: new HttpHeaders().set('Authorization',environment.token)
  }

  refreshtoken(){
    this.token = {
      headers: new HttpHeaders().set('Authorization',environment.token)
    }
  }

  constructor(private http: HttpClient) { }

  login(usuarioLogin: UsuarioLogin): Observable<UsuarioLogin> {
    return this.http.post<UsuarioLogin>('https://timetravellers.herokuapp.com/usuario/logar', usuarioLogin)
  }
  
  register(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>('https://timetravellers.herokuapp.com/usuario/cadastrar', usuario)
  }

  update(usuario: Usuario): Observable<Usuario>{
    return this.http.put<Usuario>('https://timetravellers.herokuapp.com/usuario/atualizar', usuario, this.token)
  }

  getByIdUser(id: number): Observable<Usuario>{
    return this.http.get<Usuario>(`https://timetravellers.herokuapp.com/usuario/${id}`, this.token)
  }

  logado(){
    let ok: boolean = false
    if(environment.token != ''){
      ok = true
    }
    return ok
  }
  
  //acessar um endereço externo (heroku)
  //utilizar algum metodo http (post/delete/get/put)
  //angular ja tem um metodo que chama todos os http (o HTTP Client)
}
