import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IHeroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.component.html',
  styleUrls: ['./confirmar.component.css']
})
export class ConfirmarComponent implements OnInit{

  constructor(private dialogRef: MatDialogRef<ConfirmarComponent>,
              @Inject(MAT_DIALOG_DATA) public data: IHeroe){}

  ngOnInit(){
    console.log('Datos envidos al dialog', this.data);
  }

  borrar(){
    this.dialogRef.close(true);
  }

  cerrar(){
    this.dialogRef.close(); // undefined
  }

}


// @Inject(MAT_DIALOG_DATA) -> Para traer los datos de la clase padre (agregar.component)