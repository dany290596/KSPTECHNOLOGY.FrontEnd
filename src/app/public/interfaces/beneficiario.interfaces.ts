export class BeneficiarioRequest {
    nombre: string = "";
    parentesco: string = "";
    fechaNacimiento: string = "";
    sexo: number = 0;
    empleadoId: string = "";
}

export class BeneficiarioNuevoRequest {
    nombre: string = "";
    parentesco: string = "";
    fechaNacimiento: string = "";
    sexo: number = 0;
}

export interface BeneficiarioResponse {
    nombre: string;
    parentesco: string;
    fechaNacimiento: string;
    sexo: string;
    empleadoId: string;
    id: string;
    fechaCreacion: string;
    fechaModificacion: string;
    fechaBaja: string;
    fechaReactivacion: string;
}

export interface TipoSexoResponse {
    sexo: string;
    descripcion: string;
}