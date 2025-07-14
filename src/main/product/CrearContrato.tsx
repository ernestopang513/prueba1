

import { useRoute } from '@react-navigation/native'
import { View, Text, Alert } from 'react-native'
import { UseAuthStore } from '../shared/stores/useAuthStore';
import { useMutation } from '@tanstack/react-query';
import { api } from '../shared/helpers/api';
import { CustomInput } from '../shared/components/ui/CustomInput';
import { Formik } from 'formik';
import { ThemedView } from '../shared/components/ui/ThemedView';
import CustomButton from '../shared/components/ui/CustomButton';

interface props {
    name: string,
    userId: number,
    productId: number,
}

const crearContrato = async ({name, userId, productId}: props) => {
    try {
        const { data } = await api.post("/contrato", {
            name,
            userId,
            productId
        })
    } catch (error) {
        console.log(error);
        throw new Error("Error en crear contrato")
    }
}


const CrearContrato = () => {
    const route = useRoute() as any;
    const { id, name } = route.params || {}
    const user = UseAuthStore(state => state.user);
    console.log(id)
    console.log(name)

    const makeContract = useMutation({
        mutationFn: (data: props) => crearContrato(data),
        onSuccess: () => {
            Alert.alert("Se creo el contrato correctamente")
        },
        onError: () => {
            Alert.alert("Algo salio mal")
        }

    })
    return (

        <Formik
            initialValues={{
                name: ''
            }}
            onSubmit={(values) => {
                makeContract.mutate({
                    ...values,
                    userId: user?.id || 0,
                    productId: id
                })
            }}
        >
            {
                ({ values, handleChange, handleSubmit}) => (

                    <ThemedView>
                        <CustomInput
                            value={values.name}
                            onChangeText={handleChange('name')}
                        />


                        <CustomButton
                            title='Crear contrato'
                            onPress={handleSubmit}
                        />


                    </ThemedView>

                )
            }
        </Formik>
    )
}
export default CrearContrato









