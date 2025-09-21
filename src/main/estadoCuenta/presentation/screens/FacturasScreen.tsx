import { useQuery } from '@tanstack/react-query'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { UseAuthStore } from '../../../shared/stores/useAuthStore';
import { api } from '../../../shared/helpers/api';
import { ThemedView } from '../../../shared/components/ui/ThemedView';
import CustomText from '../../../shared/components/ui/CustomText';
import CustomButton from '../../../shared/components/ui/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import SkeletonCard from '../../../shared/components/ui/SkeletonCard';
import ErrorScreen from '../../../shared/components/ui/ErrorScreen';
import { StackScreenProps } from '@react-navigation/stack';
import { EstadoCuentaParams } from '../../../shared/components/routes/EstadoCuentaNavigation';


const getFacturas = async (username: string) => {
    try {
        const { data } = await api.get(`/api/users/${username}/estados-cuenta`);
        return data;
    } catch (error) {
        console.log(error);
        throw new Error('Error')
    }
}

interface Props extends StackScreenProps<EstadoCuentaParams, 'Estados de cuenta'>{};

const FacturasScreen = ({navigation}:Props) => {

    // const navigation = useNavigation();

    const username = UseAuthStore(state => state.userName);

    const [refreshing, setRefreshing] = useState(false);

    const { data, isError, isLoading, error, refetch } = useQuery({
        queryFn: () => getFacturas(username!),
        queryKey: ['facturas'],
    })

    const handleRefresh = async () => {
        try {
        setRefreshing(true);
        await refetch(); // react-query vuelve a pedir datos
        } finally {
        setRefreshing(false);
        }
    };

    if (isError && !isLoading && !data) {
        return (
            <ErrorScreen
                onRetry={refetch}
                message={error.message}
            />
        )
    }

    // console.log(typeof(user?.estadoCuentas[0].fechaLimite));

    return (
        // <ThemedView>
        <FlatList
            data={data ?? []}
            style ={{backgroundColor: 'white'}}
            contentContainerStyle={{ paddingHorizontal: 20, gap: 30, backgroundColor: 'white', paddingTop: 20 , paddingBottom: 50}}
            renderItem={({ item }) => {
                const fecha = new Date(item.fechaLimite);
                // console.log(item)
                return (
                    <ThemedView level={2}
                        style={{
                            padding: 10,
                            borderWidth: 0.5,
                            borderRadius: 10,
                            borderColor: '#aaa'
                        }}
                    >

                        <CustomText category='h2' >Estado de cuenta</CustomText>
                        <View style={{ height: 20 }} />
                        <ThemedView level={3} style={styles.infoStyles}>
                            <Text>Estado:</Text>
                            <Text style={{ fontWeight: 'bold' }} >{item.estado}</Text>
                        </ThemedView>

                        {/* <ThemedView level={3} style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5, borderRadius: 10, marginBottom: 10 }} > */}
                        <ThemedView level={3} style={styles.infoStyles} >
                            <Text>Fecha límite:</Text>
                            <Text>{fecha.toLocaleDateString()}</Text>
                        </ThemedView>


                        <View style={{ height: 20 }} />
                        <CustomButton
                            title={'Detalles'}
                            onPress={() => navigation.navigate("Detalle", { id: item.id, estado: item.estado })}
                        />

                    </ThemedView>
                )
            }}

            ListEmptyComponent={
                isLoading
                ? <SkeletonCard/>
                :
                <ThemedView
                    style={{flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start'}}
                >
                    <CustomText category='h3' status='info' >Sin pendientes.</CustomText>

                </ThemedView>
            }
            refreshing={refreshing}
            onRefresh={handleRefresh}
        />
        // </ThemedView>
    )
}

const styles = StyleSheet.create({
    infoStyles: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        padding: 5, 
        borderRadius: 10, 
        marginBottom: 10 
    }
})


export default FacturasScreen


