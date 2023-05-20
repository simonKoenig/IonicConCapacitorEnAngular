import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  characters = [];

  constructor(
    private http: HttpClient,
  ) {}

  // guardo el contenido de 
  ngOnInit() {
    this.http.get<any>('https://rickandmortyapi.com/api/character')
    .subscribe(res => {
      console.log(res);
      this.characters = res.result;
    })
  }
      
}
