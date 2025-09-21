import { FacturaResponse } from "../../infrastructure/interfaces/factura.response";
import { api } from "../../main/shared/helpers/api";

export const getEstadoCuenta = async (facturaId: number): Promise<FacturaResponse> => {
    try {
        const { data } = await api.get(`/api/estado-cuenta/${facturaId}`)
        return data;
    } catch (error) {
        console.log(error);
        throw new Error('Error');
    }
}