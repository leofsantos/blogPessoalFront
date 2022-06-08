import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tema } from 'src/app/model/Tema';
import { ThemeService } from 'src/app/service/theme.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-theme-delete',
  templateUrl: './theme-delete.component.html',
  styleUrls: ['./theme-delete.component.css']
})
export class ThemeDeleteComponent implements OnInit {

  theme: Tema = new Tema()
  idTheme: number

  constructor(
    private themeService: ThemeService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    if(environment.token==''){
      this.router.navigate(['/login'])
    }
    this.idTheme = this.route.snapshot.params['id']
    this.findByIdTheme(this.idTheme)
  }

  findByIdTheme(id: number){
    this.themeService.getByIdTheme(id).subscribe((resp: Tema)=>{
      this.theme = resp
    })
  }

  delete(){
    this.themeService.deleteTheme(this.idTheme).subscribe(()=>{
      alert('Theme successfully deleted')
      this.router.navigate(['/theme'])
    })
  }
}
