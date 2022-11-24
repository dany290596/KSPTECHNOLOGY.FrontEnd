import { BeneficiarioNuevoRequest, BeneficiarioRequest } from "./beneficiario.interfaces";

export interface EmpleadoResponse {
    EId: string;
    EFoto: string;
    ENombre: string;
    EPuesto: string;
    ESalario: number;
    EEstatus: number;
    EFechaContratacion: Date;
    EFechaCreacion: Date;
}

export class EmpleadoRequest {
    public foto: any;
    public nombre: any;
    public puesto: any;
    public salario: any;
    public beneficiario: BeneficiarioRequest[] = [];
}

export class EmpleadoNuevoRequest {
    public foto: any;
    public nombre: any;
    public puesto: any;
    public salario: any;
    public beneficiario: BeneficiarioNuevoRequest[] = [];
}