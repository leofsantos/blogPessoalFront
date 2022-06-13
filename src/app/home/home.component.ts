import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';
import { PostsService } from '../service/posts.service';
import { ThemeService } from '../service/theme.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  post: Postagem = new Postagem()
  postsList: Postagem[]

  user: Usuario = new Usuario()
  userId = environment.id

  theme: Tema = new Tema()
  themesList: Tema[]
  themeId: number

  constructor(
    private router: Router, 
    private postService: PostsService,
    private themeService: ThemeService,
    private authService: AuthService) { }

  ngOnInit() {
    window.scroll(0,0)
    if(environment.token==''){
      this.router.navigate(['/login'])
    }

    this.getAllThemes()
    this.getAllPosts()
    this.authService.refreshtoken()
    this.postService.refreshtoken()
    this.themeService.refreshtoken()
  }

  getAllThemes(){
    this.themeService.getAllThemes().subscribe((resp: Tema[])=>{
      this.themesList = resp
    })
  }

  findByIdTheme(){
    this.themeService.getByIdTheme(this.themeId).subscribe((resp: Tema)=>{
      this.theme = resp
    })
  }

  getAllPosts(){
    this.postService.getAllPosts().subscribe((resp: Postagem[])=>{
      this.postsList = resp
    })
  }

  findByIdUser(){
    this.authService.getByIdUser(this.userId).subscribe((resp: Usuario)=>{
      this.user = resp
    })
  }

  publish(){
    this.theme.id = this.themeId
    this.post.tema = this.theme

    this.user.id = this.userId
    this.post.usuario = this.user

    this.postService.postPosts(this.post).subscribe((resp: Postagem)=>{
      this.post = resp
      alert('Sent to outta space!')
      this.post = new Postagem()
      this.getAllPosts()
    })
  }

}
