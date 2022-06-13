import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';
import { ThemeService } from '../service/theme.service';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css']
})
export class ThemeComponent implements OnInit {

  theme: Tema = new Tema()
  themesList: Tema[]

  constructor(private router: Router, private themeService: ThemeService ) { }

  

  ngOnInit() {
    if(environment.token==''){
      this.router.navigate(['/login'])
    }
    this.findAllThemes()
    this.themeService.refreshtoken()
  }

  findAllThemes(){
    this.themeService.getAllThemes().subscribe((resp: Tema[])=>{
      this.themesList = resp
    })
  }

  register(){
    this.themeService.postTheme(this.theme).subscribe((resp: Tema)=>{
      this.theme = resp
      alert('Theme successfully registered')
      this.findAllThemes()
      this.theme = new Tema()
    })
  }

}
