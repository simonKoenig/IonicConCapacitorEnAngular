import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent  implements OnInit {
  character: any;
  constructor(
    private navParams: NavParams
  ) { }

  ngOnInit() {
    this.character = this.navParams.get('character');
  }

}
