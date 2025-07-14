import { Formik } from 'formik'
import { View, Text, Alert } from 'react-native'
import { ThemedView } from '../shared/components/ui/ThemedView'
import { CustomInput } from '../shared/components/ui/CustomInput'
import CustomButton from '../shared/components/ui/CustomButton'
import { useMutation, QueryClient, useQueryClient } from '@tanstack/react-query';
import { api } from '../shared/helpers/api'

interface Producto {
    name: string
}

const createProduct = async(producto:Producto) => {
    try {
        const {data} = await api.post("/product",
           { 
            name: producto.name,
        });
        return data;
    } catch (error) {
        console.log(error)
        throw new Error("Algo salio mal")
    }
}

const CreateProductScreen = () => {

    const queryClient = useQueryClient();;

    const crearProducto = useMutation({
        mutationFn: (data: Producto) => createProduct(data),
        onSuccess:(data) => {
            console.log('Se creo el proudcto', JSON.stringify(data))
            queryClient.invalidateQueries({queryKey: [ "products"]})
        } ,
        onError: () =>{
            Alert.alert("valio queso")
        } ,

    })

  return (
    <Formik
        initialValues={{
            name: ''
        }}
        onSubmit={(values) => {
            crearProducto.mutate(values)
        }}
    >
        {
            ({values, handleChange, handleSubmit}) => (

                <ThemedView style ={{paddingHorizontal: 30}}>

                    <CustomInput
                        value = {values.name}
                        onChangeText={handleChange('name')}
                        label='Nombre'
                    />

                    <CustomButton
                        title='Guardar'
                        onPress={handleSubmit}
                    />

                </ThemedView>
            )
        }
    </Formik>
  )
}
export default CreateProductScreen