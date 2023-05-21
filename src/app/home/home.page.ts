import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  characters: any[] = [];

  constructor(
    private http: HttpClient,
  ) {}

  ngOnInit() {
    const fetchData = async () => {
    const { value: datosExistentes } = await Preferences.get({ key: 'data' });
    if (datosExistentes === null) {
      this.http.get<any>('https://rickandmortyapi.com/api/character/?page=1')
      .subscribe(res => {
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
        //setData(res.results);
        //setResults(res.results);
      })
      /*.catch(error => {
        console.log('Error:', error);
      })
      .finally(() => {
        setLoad(true);
      });*/
  
    } else {
      // Obtener los datos de las preferencias
      //const parsedData = datosExistentes !== null ? JSON.parse(datosExistentes) : null;

      // Mostrar los datos de las preferencias en la vista
      this.characters = datosExistentes !== null ? JSON.parse(datosExistentes) : null;



      //setData(parsedData);
      //setResults(parsedData)
      //setLoad(true);
    }
  };
  fetchData(); // Llama a la función fetchData para iniciar el proceso
  }
}
