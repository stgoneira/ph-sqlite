import { Injectable } from '@angular/core';
import { SQLiteService } from './sqlite.service';
import { Cita } from '../model/cita';

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  private database:string = 'citasdb'
  private encrypted:boolean = false 
  private mode:string = 'no-encryption' 
  private version:number = 1 
  private createSchema:string = `
    CREATE TABLE IF NOT EXISTS citas(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        cita TEXT NOT NULL,
        autor TEXT NOT NULL
    )
  `

  constructor(
    private sqlite:SQLiteService
  ) { }

  async getAll():Promise<Cita[]> {
    try {
        const db = await this.sqlite.createConnection(
            this.database, 
            this.encrypted,
            this.mode,
            this.version
        )
        await db.open()
        await db.execute( this.createSchema )
        const query = await db.query("SELECT * FROM citas")
        return query.values ?? []
    } catch(err:unknown) {
        console.error(err+"")
        return []
    } finally {
        await this.sqlite.closeConnection(this.database)
    }
    
    
  }

  async insertar(cita:Cita) {
    const db = await this.sqlite.createConnection(
        this.database, 
        this.encrypted,
        this.mode,
        this.version
    )
    await db.open()
    await db.execute( this.createSchema )
    const insert = `INSERT INTO citas(cita, autor) VALUES(?, ?)`
    await db.run(insert, [cita.cita, cita.autor])

    await this.sqlite.closeConnection(this.database)
  }

}
