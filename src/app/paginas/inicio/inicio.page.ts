import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';
import { SQLiteService } from 'src/app/services/sqlite.service';
import { CitaService } from 'src/app/services/cita.service';
import { Cita } from 'src/app/model/cita';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton]
})
export class InicioPage implements OnInit {

  citas:Cita[] = []

  constructor(
    private citasService:CitaService
  ) { }

  ngOnInit() {
    
  }

  ver() {
    this.citasService.getAll().then( arr => {
      arr.forEach(c => console.dir(c))
    })    
  }
  
  guardar() {
    console.log("Guardando...")
    const cita:Cita = {
      cita: "Lorem ipsum dolor",
      autor: "lipsum"
    }
    this.citasService.insertar(cita)
  }
}
