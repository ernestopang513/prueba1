export interface FacturaResponse {
    id: number;
    estado: string;
    monto: number;
    fechaEmision: Date;
    fechaLimite: Date;
}
