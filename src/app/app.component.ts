import { LoginService } from './_service/login.service';
import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {

  title = 'udec';
  barraProgreso: boolean = true;

  constructor(private loginService: LoginService) {
      loginService.barraProgreso.subscribe(data =>{
          if(data == "1")
             this.barraProgreso = false;
          else
              this.barraProgreso = true;
      });
  } 

  ngOnInit(): void {

  }

}
