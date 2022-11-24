import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpleadoRequest } from '../../interfaces/empleado.interfaces';
import { EmpleadoServices } from '../../services/empleado.services';
import { CommonResponse } from '../../interfaces/comun.interfaces';
import { ActivatedRoute, Params } from '@angular/router';
import { BeneficiarioRequest, BeneficiarioResponse, TipoSexoResponse } from '../../interfaces/beneficiario.interfaces';
import { BeneficiarioServices } from '../../services/beneficiario.services';
import Swal from 'sweetalert2';

const FILTER_PAG_REGEX = /[^0-9]/g;

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})

export class EditarComponent implements OnInit {
  beneficiario: BeneficiarioRequest[] = [];
  tipoSexo: TipoSexoResponse[] = [];

  empleadorFG: FormGroup = this.formBuilder.group({
    foto: ['', [Validators.required]],
    nombre: ['', [Validators.required]],
    puesto: ['', [Validators.required]],
    salario: ['', [Validators.required]]
  });
  beneficiarioFG: FormGroup = this.formBuilder.group({
    nombre: ['', [Validators.required]],
    parentesco: ['', [Validators.required]],
    fechaNacimiento: ['', [Validators.required]],
    sexo: ['', [Validators.required]]
  });

  empleadoId: string = "";

  foto: string = "";
  nombre: string = "";
  puesto: string = "";
  salario: number = 0;
  estatus: number = 0;
  fechaContratacion: string = "";
  fechaCreacion: string = "";

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private empleadoServices: EmpleadoServices,
    private beneficiarioServices: BeneficiarioServices
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

        this.empleadorFG.get("foto")?.setValue(s.data.foto);
        this.empleadorFG.get("nombre")?.setValue(s.data.nombre);
        this.empleadorFG.get("puesto")?.setValue(s.data.puesto);
        this.empleadorFG.get("salario")?.setValue(s.data.salario);

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

    this.beneficiarioServices.ObtenerPorSexo().subscribe((s: CommonResponse) => {
      console.log("TIPO SEXO => ", s);
      this.tipoSexo = s.data.map((m: TipoSexoResponse) => {
        return {
          sexo: m.sexo,
          descripcion: m.descripcion
        } as TipoSexoResponse;
      });
    }, (error) => {
      throw error;
    });
  }

  empleadoRequest() {
    const params = new EmpleadoRequest();
    let formEmpleado = this.empleadorFG.value;
    params.foto = formEmpleado.foto;
    params.nombre = formEmpleado.nombre;
    params.puesto = formEmpleado.puesto;
    params.salario = formEmpleado.salario;
    params.beneficiario = this.beneficiario;
    return params;
  }

  beneficiarioRequest() {
    const params = new BeneficiarioRequest();
    let formBeneficiario = this.beneficiarioFG.value;

    params.nombre = formBeneficiario.nombre;
    params.parentesco = formBeneficiario.parentesco;
    params.fechaNacimiento = formBeneficiario.fechaNacimiento;
    params.sexo = formBeneficiario.sexo;
    params.empleadoId = this.empleadoId;

    return params;
  }

  showEditar() {
    const params = this.empleadoRequest();
    console.log("PARAMS => ", params);

    let request: any = {
      id: this.empleadoId
    }

    if (params.beneficiario.length === 0) {
      Swal.fire('Lo sentimos', 'Agrege la información de almenos un Beneficiario!', 'warning');
    } else {
      this.empleadoServices.actualizar(params, request).subscribe((s: CommonResponse) => {
        this.router.navigate(['/public/empleado']);
      }, (error) => {
        throw error;
      });
    }
  }
  showCancelar() {
    this.router.navigate(['/public/empleado']);
  }

  showAgregar() {
    const params = this.beneficiarioRequest();
    this.beneficiario.push(params);
    console.log("BENEFICIARIOS => ", this.beneficiario);
    this.beneficiarioFG.reset();
  }

  showEliminar(i: any) {
    console.log("I => ", i);
    this.beneficiario.splice(i, 1);
    console.log("BENEFICIARIOS => ", this.beneficiario);
  }

  formatInput(input: HTMLInputElement) {
    input.value = input.value.replace(FILTER_PAG_REGEX, '0');
  }
}