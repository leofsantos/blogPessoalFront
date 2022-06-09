import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Postagem } from 'src/app/model/Postagem';
import { Tema } from 'src/app/model/Tema';
import { PostsService } from 'src/app/service/posts.service';
import { ThemeService } from 'src/app/service/theme.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {

  post: Postagem = new Postagem()

  theme: Tema = new Tema()
  themesList: Tema[]
  themeId: number

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postsService: PostsService,
    private themeService: ThemeService
  ) { }

  ngOnInit() {

    window.scroll(0,0)

    if(environment.token==''){
      this.router.navigate(['/login'])
    }

    let id = this.route.snapshot.params['id']
    this.findByIdPost(id)
    this.findAllThemes()
  }

  findByIdPost(id: number){
    this.postsService.getByIdPost(id).subscribe((resp: Postagem)=>{
      this.post = resp
    })
  }

  findByIdTheme(){
    this.themeService.getByIdTheme(this.themeId).subscribe((resp: Tema)=>{
      this.theme = resp
    })
  }

  findAllThemes(){
    this.themeService.getAllThemes().subscribe((resp: Tema[])=>{
      this.themesList = resp
    })
  }

  update(){
    this.theme.id = this.themeId
    this.post.tema = this.theme

    this.postsService.putPosts(this.post).subscribe((resp: Postagem)=>{
      this.post = resp
      alert('Changed your mind? All right, then!')
      this.router.navigate(['/home'])
    })
  }

}
