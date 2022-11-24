import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { EmpleadoServices } from '../../services/empleado.services';
import { CommonResponse } from '../../interfaces/comun.interfaces';
import { EmpleadoResponse } from '../../interfaces/empleado.interfaces';
import { BeneficiarioResponse } from '../../interfaces/beneficiario.interfaces';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})

export class DetalleComponent implements OnInit {
  beneficiario: BeneficiarioResponse[] = [];
  empleadoId: string = "";

  foto: string = "";
  nombre: string = "";
  puesto: string = "";
  salario: number = 0;
  estatus: number = 0;
  fechaContratacion: string = "";
  fechaCreacion: string = "";

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private empleadoServices: EmpleadoServices
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.empleadoId = params['num'];
      console.log("EMPLEADO ID => ", this.empleadoId);

      let request: any = {
        id: this.empleadoId
      }

      this.empleadoServices.obtenerPorId(request).subscribe((s: CommonResponse) => {
        console.log("S => ", s);

        this.foto = s.data.foto;
        this.nombre = s.data.nombre;
        this.puesto = s.data.puesto;
        this.salario = s.data.salario;
        this.estatus = s.data.estatus;
        this.fechaContratacion = s.data.fechaContratacion;
        this.fechaCreacion = s.data.fechaCreacion;

        this.beneficiario = s.data.beneficiario.map((m: BeneficiarioResponse) => {
          return {
            nombre: m.nombre,
            parentesco: m.parentesco,
            fechaNacimiento: m.fechaNacimiento,
            sexo: m.sexo,
            empleadoId: m.empleadoId,
            id: m.id,
            fechaCreacion: m.fechaCreacion,
            fechaModificacion: m.fechaModificacion,
            fechaBaja: m.fechaBaja,
            fechaReactivacion: m.fechaReactivacion
          } as BeneficiarioResponse;
        });

      }, (error) => {

        throw error;
      });
    });
  }

  showRegresar() {
    this.router.navigate(['/public/empleado']);
  }
}