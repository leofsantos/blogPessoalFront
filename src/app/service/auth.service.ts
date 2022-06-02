import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../model/Usuario';
import { UsuarioLogin } from '../model/UsuarioLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(usuarioLogin: UsuarioLogin): Observable<UsuarioLogin> {
    return this.http.post<UsuarioLogin>('https://timetravellers.herokuapp.com/usuario/logar', usuarioLogin)
  }
  
  register(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>('https://timetravellers.herokuapp.com/usuario/cadastrar', usuario)
  }
  
  //acessar um endereço externo (heroku)
  //utilizar algum metodo http (post/delete/get/put)
  //angular ja tem um metodo que chama todos os http (o HTTP Client)
}
