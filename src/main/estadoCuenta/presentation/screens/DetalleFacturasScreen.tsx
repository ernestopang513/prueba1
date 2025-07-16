import { View, Text, Alert } from 'react-native'
import CustomText from '../../../shared/components/ui/CustomText'
import { useRoute } from '@react-navigation/native'
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../../../shared/helpers/api';
import { ThemedView } from '../../../shared/components/ui/ThemedView';
import CustomButton from '../../../shared/components/ui/CustomButton';

// export interface FacturaResponse {
//     id:     number;
//     estado: string;
// }

export interface FacturaResponse {
    id: number;
    estado: string;
    monto: number;
    fechaEmision: Date;
    fechaLimite: Date;
}


const pagar = async (facturaId: number) => {
    try {
        await api.put(`/estado-cuenta/${facturaId}`,
            {
                estado: 'PAGADO'
            }
        )
    } catch (error) {
        console.log(error)
        throw new Error('Error al pagar')
    }
}




const getEstadoCuenta = async (facturaId: number): Promise<FacturaResponse> => {
    try {
        const { data } = await api.get(`/estado-cuenta/${facturaId}`)
        return data;
    } catch (error) {
        console.log(error);
        throw new Error('Error');
    }
}

const DetalleFacturasScreen = () => {
    const route = useRoute() as any;
    const { id, estado } = route.params || {};
    const queryClient = useQueryClient();

    const { data: factura, isLoading, isError, error } = useQuery({
        queryFn: () => getEstadoCuenta(id),
        queryKey: ['factura', id],
        select: (factura) => {
            const fechaL = new Date(factura.fechaLimite).toLocaleDateString()
            const fechaE = new Date(factura.fechaEmision).toLocaleDateString()
            const factura2 = {
                ...factura,
                fechaLimite: fechaL,
                fechaEmision: fechaE
            }
            return factura2
        }
    })

    const pagarMutation = useMutation({
        mutationFn: () => pagar(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["facturas"] })
            queryClient.invalidateQueries({ queryKey: ["factura", id] })
            console.log('se pago el estado de cuenta')
        },
        onError: () => {
            Alert.alert("Algo salio mal al pagar");
        }
    })


    return (
        <ThemedView style={{ paddingHorizontal: 30, paddingTop: 40, flex: 1, justifyContent: 'space-between', paddingBottom: 20 }}>

            <View>


                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text>Factura id: </Text>
                    <Text style={{ fontWeight: 'bold' }}>{factura?.id}</Text>
                </View>

                <View style={{ height: 20 }} />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text>Estado: </Text>
                    <Text style={{ fontWeight: 'bold' }} >{factura?.estado}</Text>
                    {/* <Text>{factura?.fechaLimite}</Text> */}
                </View>

                <View style={{ height: 20 }} />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text>Fecha límite: </Text>
                    {/* <Text>{factura?.estado}</Text> */}
                    <Text>{factura?.fechaLimite}</Text>
                </View>

                <View style={{ height: 20 }} />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text>Fecha de emisión: </Text>
                    {/* <Text>{factura?.estado}</Text> */}
                    <Text>{factura?.fechaEmision}</Text>
                </View>

                <View style={{ height: 20 }} />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text>Monto: </Text>
                    {/* <Text>{factura?.estado}</Text> */}
                    <Text>$ {factura?.monto}</Text>
                </View>
            </View>



            <View>
                <View style={{ height: 50 }} />
                <CustomButton
                    title='Pagar'
                    onPress={pagarMutation.mutate}
                />
            </View>



        </ThemedView>
    )
}
export default DetalleFacturasScreen