import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConductorService } from './service/conductor/conductor.service';
import { PedidosService } from './service/pedidos/pedidos.service';
import { VehiculoService } from './service/vehiculo/vehiculo.service';
import { error } from 'console';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  conductorForm!: FormGroup;
  vehiculoForm!: FormGroup;
  conductor: any;
  pedidos: any;
  vehiculo: any;
  constructor(
    public fb: FormBuilder,
    public conductorService: ConductorService,
    public pedidosService: PedidosService,
    public vehiculoService: VehiculoService
  ) {


  }
  ngOnInit(): void {

    this.conductorForm = this.fb.group({
      id: [''],
      identificacion: ["", Validators.required],
      apellido: ["", Validators.required],
      nombre: ["", Validators.required],
      telefono: ["", Validators.required],
      direccion: ["", Validators.required],
      vehiculo: ["", Validators.required],
      pedidos: ["", Validators.required],
    });;

    this.vehiculoForm = this.fb.group({
      id: [''],
      conductor_id : ["", Validators.required],
      modelo : ["", Validators.required],
      placa : ["", Validators.required],
      capacidad : ["", Validators.required],
    });;

    this.conductorService.getAllConductor().subscribe(resp => {
      this.conductor = resp;
    },
      error => { console.error(error) }
    )

    this.vehiculoService.getAllVehiculo().subscribe(resp => {
      this.vehiculo = resp;
    },
      error => { console.error(error) }
    )

    this.pedidosService.getAllPedidos().subscribe(resp => {
      this.pedidos = resp;
    },
      error => { console.error(error) }
    )

  }


  guardar(): void {
    this.conductorService.saveConductor(this.conductorForm.value).subscribe(resp => {
      // Limpiar el formulario
      this.conductorForm.reset();
        // Actualizar la lista de conductores
      this.conductor = this.conductor.filter((conductor: { id: any; }) => resp.id !== conductor.id);
      this.conductor.push(resp);
            // Si quieres ordenar la lista o hacer alguna otra operación, puedes hacerlo aquí
     
    },
    error => { console.error(error); }
    );
  }

  guardarvehiculo(): void {
    this.vehiculoService.saveVehiculo(this.vehiculoForm.value).subscribe(resp => {
      // Limpiar el formulario
      this.vehiculoForm.reset();
        // Actualizar la lista de vehículos
      this.vehiculo = this.vehiculo.filter((vehiculo: { id: any; }) => resp.id !== vehiculo.id);
      this.vehiculo.push(resp);
    },
    error => { console.error(error); });
  }



  eliminar(conductor: any): void {
    this.conductorService.deleteConductor(conductor.id).subscribe(resp => {
      if (resp === true) {
        // Filtrar el conductor eliminado de la lista
        this.conductor = this.conductor.filter((item: { id: any; }) => item.id !== conductor.id);
      }
    },
    error => { console.error(error); });
  }

  eliminarVehiculo(vehiculo: any): void {
    this.vehiculoService.deleteVehiculo(vehiculo.id).subscribe(resp => {
      if (resp === true) {
        // Filtrar el vehículo eliminado de la lista
        this.vehiculo = this.vehiculo.filter((item: { id: any; }) => item.id !== vehiculo.id);
      }
    },
    error => { console.error(error); });
  }




  editar(conducto: any) {
    this.conductorForm.setValue({
      id: conducto.id,
      identificacion: conducto.identificacion,
      apellido: conducto.apellido,
      nombre: conducto.nombre,
      telefono: conducto.telefono,
      direccion: conducto.direccion,
      vehiculo: conducto.vehiculo,
      pedidos: conducto.pedidos,
    })

  }

  editarVehiculo(vehiculo: any) {
    this.vehiculoForm.setValue({
      id: vehiculo.id,
      conductor_id: vehiculo.conductor_id,
      modelo: vehiculo.modelo,
      placa: vehiculo.placa,
      capacidad: vehiculo.capacidad,
      
    })

  }
}

