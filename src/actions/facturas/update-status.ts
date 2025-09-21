import { FacturaStatus } from "../../domain/enums/facturaStatus"
import { api } from "../../main/shared/helpers/api"

export const pagar = async (facturaId: number) => {
    try {
        await api.put(`/api/estado-cuenta/${facturaId}`,
            {
                estado: FacturaStatus.PAGADO
            }
        )
    } catch (error) {
        console.log(error)
        throw new Error('Error al pagar')
    }
}

