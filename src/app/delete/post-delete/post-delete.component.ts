import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Postagem } from 'src/app/model/Postagem';
import { Tema } from 'src/app/model/Tema';
import { PostsService } from 'src/app/service/posts.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-post-delete',
  templateUrl: './post-delete.component.html',
  styleUrls: ['./post-delete.component.css']
})
export class PostDeleteComponent implements OnInit {

  post: Postagem = new Postagem()
  postId: number

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postsService: PostsService,
  ) { }

  ngOnInit() {

    window.scroll(0,0)

    if(environment.token==''){
      this.router.navigate(['/login'])
    }

    this.postId = this.route.snapshot.params['id']
    this.findByIdPost(this.postId)
   
  }

  findByIdPost(id: number){
    this.postsService.getByIdPost(id).subscribe((resp: Postagem)=>{
      this.post = resp
    })
  }

  delete(){
    this.postsService.deletePost(this.postId).subscribe(() => {
      alert('This post is gone for good')
      this.router.navigate(['/home'])
    })
  }

}
