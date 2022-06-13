import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  usuario: Usuario = new Usuario()
  usuarioId: number
  confirmarSenha: string
  tipoUsuario: string

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

    window.scroll(0,0)

    if(environment.token==''){
      this.router.navigate(['/login'])
    }

    this.usuarioId = this.route.snapshot.params['id']
    this.findByIdUser(this.usuarioId)
  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value;
  }

  tipoUser(event: any) {
    this.tipoUsuario = event.target.value;
  }

  update(){
    this.usuario.tipo = this.tipoUsuario

    if(this.usuario.senha != this.confirmarSenha){
      alert('Passwords do not match')
    } else {
      this.authService.update(this.usuario).subscribe((resp: Usuario) => {
        this.usuario = resp
        alert('User successfully updated, login again')
        environment.nome = ''
        environment.token = ''
        environment.foto = ''
        environment.id = 0
        this.router.navigate(['/home'])
      })
    }
  }

  findByIdUser(id: number){
    this.authService.getByIdUser(id).subscribe((resp: Usuario)=>{
      this.usuario = resp
    })
  }

}
