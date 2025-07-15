import { View, Text } from 'react-native'
import CustomText from '../../../shared/components/ui/CustomText'
import { useRoute } from '@react-navigation/native'
import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from '../../../shared/helpers/api';
import { ThemedView } from '../../../shared/components/ui/ThemedView';
import CustomButton from '../../../shared/components/ui/CustomButton';

export interface FacturaResponse {
    id:     number;
    estado: string;
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

    const {data: factura, isLoading, isError, error} = useQuery({
        queryFn: () => getEstadoCuenta(id),
        queryKey: ['factura', id]
    })

    // const pagarMutation = useMutation({
    //     mutationFn: 
    // })


  return (
    <ThemedView>

        <Text>Factura id: {factura?.id}</Text>


        <Text>Estado: {factura?.estado}</Text>
        <View style={{height: 50}} />
        <CustomButton
            title='Pagar'
        />



    </ThemedView>
  )
}
export default DetalleFacturasScreen