import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  usuario: Usuario = new Usuario();
  confirmarSenha: string;
  tipoUsuario: string;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    window.scroll(0,0);
  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value;
  }

  tipoUser(event: any) {
    this.tipoUsuario = event.target.value;
  }

  register() {
    this.usuario.tipo = this.tipoUsuario;

    if (this.usuario.senha == this.confirmarSenha) {
      this.auth.register(this.usuario).subscribe((resp: Usuario) => {
        this.usuario = resp;
        alert('Successfully registered');
        this.router.navigate(['/login']);
      });
    } else {
      alert('Passwords do not match');
    }
  }
}
