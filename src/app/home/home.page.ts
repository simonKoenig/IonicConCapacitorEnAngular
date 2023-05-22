import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from '../modal/modal.component';
import { Preferences } from '@capacitor/preferences';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  characters: any[] = [];

  constructor(
    private http: HttpClient,
    private alertController: AlertController,
    private toastController: ToastController,
    private modalCtrl: ModalController,
  ) {}


  ngOnInit() {
    const fetchData = async () => {
      const { value: datosLocal } = await Preferences.get({ key: 'data' });
      if (datosLocal === null) {
        this.http.get<any>('https://rickandmortyapi.com/apiii/character/?page=1')
          .subscribe({
            next: (res) => {
              console.log("api");
              this.characters = res.results;
              // Guardar los datos en las preferencias
              const saveData = async () => {
                await Preferences.set({
                  key: 'data',
                  value: JSON.stringify(this.characters),
                });
              };
              saveData(); // Llama a la función para guardar los datos
            },
            error: (error) => {
              console.error('Error en la consulta a la API:', error);
              this.Toast('Error en la consulta a la API', 'error');
            }
          });
      } else {
        // Mostrar los datos de las preferencias en la vista
        console.log("guardado");
        this.characters = datosLocal !== null ? JSON.parse(datosLocal) : null;
      }
    };
    fetchData(); // Llama a la función fetchData para iniciar el proceso
  }
  
  async confirmarBorrado(id: number, nombre:string) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas eliminar a ${nombre}?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Eliminación cancelada');
          }
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.borrar(id);
            this.Toast(`Se ha eliminado ${nombre} exitosamente`, 'success');
          }
        }
      ]
    });
  
    alert.message = `¿Estás seguro de que deseas eliminar a ${nombre}?`;
    await alert.present();

  }

  borrar(id:number) {
    //const newData = [...this.characters];
    const index = this.characters.findIndex(character => character.id === id);
    if (index !== -1) {
      this.characters.splice(index, 1);
    }
    console.log(this.characters);
    Preferences.set({ key: 'data', value: JSON.stringify(this.characters) });
  }

  async Toast(mensaje: string, tipo: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000, // Duración del Toast en milisegundos
      position: 'bottom', // Posición del Toast en la pantalla (bottom, middle, top)
      color: tipo === 'error' ? 'danger' : 'success'
    });
    toast.present();
  }

  async abrirModal(character: any) {
      const modal = await this.modalCtrl.create({
        component: ModalComponent,
        componentProps: {
          character: character
        }
    });
    return await modal.present();
  }
 
}
