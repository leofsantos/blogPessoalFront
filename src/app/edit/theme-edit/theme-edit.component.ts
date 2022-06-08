import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tema } from 'src/app/model/Tema';
import { ThemeService } from 'src/app/service/theme.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-theme-edit',
  templateUrl: './theme-edit.component.html',
  styleUrls: ['./theme-edit.component.css']
})
export class ThemeEditComponent implements OnInit {

  theme: Tema = new Tema() 

  constructor(private themeService: ThemeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    if(environment.token==''){
      this.router.navigate(['/login'])
    }
    let id = this.route.snapshot.params['id']
    this.findByIdTheme(id)
  }

  findByIdTheme(id: number){
    this.themeService.getByIdTheme(id).subscribe((resp: Tema)=> {
      this.theme = resp
    })
  }

  update(){
    this.themeService.putTheme(this.theme).subscribe((resp: Tema)=>{
      this.theme = resp
      alert('Theme successfully updated')
      this.router.navigate(['/theme'])
    })
  }
}
