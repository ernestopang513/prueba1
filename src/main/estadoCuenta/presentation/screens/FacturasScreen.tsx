import { useQuery } from '@tanstack/react-query'
import { View, Text, FlatList } from 'react-native'
import { UseAuthStore } from '../../../shared/stores/useAuthStore';
import { api } from '../../../shared/helpers/api';
import { ThemedView } from '../../../shared/components/ui/ThemedView';
import CustomText from '../../../shared/components/ui/CustomText';
import CustomButton from '../../../shared/components/ui/CustomButton';
import { useNavigation } from '@react-navigation/native';


const getFacturas = async (id: number) => {
    try {
        const { data } = await api.get(`/users/${id}`);
        return data;
    } catch (error) {
        console.log(error);
        throw new Error('Error')
    }
}


const FacturasScreen = () => {

    const navigation = useNavigation();

    const userId = UseAuthStore(state => state.user?.id);

    const { data: user, isError, isLoading, error } = useQuery({
        queryFn: () => getFacturas(userId!),
        queryKey: ['facturas']
    })

    console.log(user?.estadoCuentas);

    return (
        // <ThemedView>
            <FlatList
                data={user?.estadoCuentas}
                contentContainerStyle = {{paddingHorizontal: 20, gap: 30, backgroundColor: 'white', flex: 1, paddingTop: 20}}
                renderItem={({ item }) => {
                    return (
                        <ThemedView level={2}
                            style = {{
                                padding: 10,
                                borderWidth: 0.5,
                                borderRadius: 10,
                                borderColor: '#aaa'
                            }}
                        >

                            <CustomText category='h2' >Estado de cuenta</CustomText>
                            <Text>{item.estado}</Text>
                            {/* <View style = {{height: 20}} /> */}
                            <CustomButton 
                                title={'Detalles'}
                                onPress={() => (navigation as any).navigate("Detalle", {id: item.id, estado: item.estado})}    
                                />

                        </ThemedView>
                    )
                }}


            />
        // </ThemedView>
    )
}
export default FacturasScreen