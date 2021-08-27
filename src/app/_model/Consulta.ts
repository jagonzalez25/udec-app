import { DetalleConsulta } from "./DetalleConsulta";

export class Consulta{
    id: number;
    nombreDoctor: string;
    fecha: string;
    detalleConsulta: DetalleConsulta[];
}