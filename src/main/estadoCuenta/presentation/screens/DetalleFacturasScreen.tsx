import { View, Text, Alert } from 'react-native'
import CustomText from '../../../shared/components/ui/CustomText'
import { useRoute } from '@react-navigation/native'
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../../../shared/helpers/api';
import { ThemedView } from '../../../shared/components/ui/ThemedView';
import CustomButton from '../../../shared/components/ui/CustomButton';

export interface FacturaResponse {
    id:     number;
    estado: string;
}

const pagar = async(facturaId: number) => {
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




const getEstadoCuenta = async(facturaId: number) => {
    try {
        const {data} = await api.get(`/estado-cuenta/${facturaId}`)
        return data;
    } catch (error) {
        console.log(error);
        throw new Error('Error');
    }
}

const DetalleFacturasScreen = () => {
    const route = useRoute() as any;
    const {id, estado} = route.params || {};
    const queryClient = useQueryClient();

    const {data: factura, isLoading, isError, error} = useQuery({
        queryFn: () => getEstadoCuenta(id),
        queryKey: ['factura', id]
    })

    const pagarMutation = useMutation({
        mutationFn: () => pagar(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["facturas"]})
            queryClient.invalidateQueries({queryKey: ["factura", id]})
            console.log('se pago el estado de cuenta')
        },
        onError: () => {
            Alert.alert("Algo salio mal al pagar");
        }
    })


  return (
    <ThemedView>

        <Text>Factura id: {factura?.id}</Text>


        <Text>Estado: {factura?.estado}</Text>
        <View style={{height: 50}} />
        <CustomButton
            title='Pagar'
            onPress={pagarMutation.mutate}
        />



    </ThemedView>
  )
}
export default DetalleFacturasScreen