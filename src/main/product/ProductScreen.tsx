import { View, Text, Button, FlatList } from 'react-native'
import CustomButton from '../shared/components/ui/CustomButton'
import { useMutation, useQuery } from '@tanstack/react-query'
import { api } from '../shared/helpers/api'
import SkeletonCard from '../shared/components/ui/SkeletonCard'
import NoticeScreen from '../shared/components/ui/NoticeScreen'
import { ThemedView } from '../shared/components/ui/ThemedView'
import { useNavigation } from '@react-navigation/native'

const getProducts = async () => {
    try {
        const {data} = await api.get("/product")

        return data;
    } catch (error) {
        throw new Error('Error')
    }
}



const ProductScreen = () => {

    const {data, isError, isLoading, error} = useQuery({
        queryFn: () => getProducts(),
        queryKey: [ 'products']
    })

    const navigation = useNavigation();

    console.log(data)
 
  return (
    <ThemedView>
      <CustomButton
        title='Agregar producto'
        onPress={()=>navigation.navigate('Create' as never)}
      />
    
        <FlatList
            data={data}
            contentContainerStyle = {{ paddingTop: 20, gap: 20}}
            renderItem={({item})=> {
                return(
                <CustomButton
                    title={item.name}
                    onPress={()=> (navigation as any).navigate("CreateContrato", {id: item.id , name: item.name})}
                />)
            }}
            ListEmptyComponent={
                isLoading? 
                <SkeletonCard/>:
                <NoticeScreen title='Sin productos' />
            }
        />



    </ThemedView>
  )
}
export default ProductScreen