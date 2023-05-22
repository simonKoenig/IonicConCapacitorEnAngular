import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent  implements OnInit {
  character: any;
  homeView: any;
  constructor(
    private navParams: NavParams,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.character = this.navParams.get('character');
  }

  cerrarModal(){
    this.modalCtrl.dismiss();
  }

  callFunctionInHome(id:number, nombre:string) {
    if (this.homeView) {
      this.homeView.confirmarBorrado(id, nombre); // Llamamos a la función del componente Home
    }
  }

}
