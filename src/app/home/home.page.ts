import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  characters: any[] = [];

  constructor(
    private http: HttpClient,
    private modalCtrl: ModalController
  ) {}

  // guardo el contenido de la api en la variable characters
  ngOnInit() {
    this.http.get<any>('https://rickandmortyapi.com/api/character/?page=1')
    .subscribe(res => {
      console.log(res);
      this.characters = res.results;
    })
  }

  async openModal(character: any) {
      const modal = await this.modalCtrl.create({
        component: ModalComponent,
        componentProps: {
          character: character
        }
    });
    return await modal.present();
  }
}
