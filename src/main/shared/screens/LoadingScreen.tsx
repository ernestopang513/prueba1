import { View, Text } from 'react-native'
import { ThemedView } from '../components/ui/ThemedView'
import CustomText from '../components/ui/CustomText'
const LoadingScreen = () => {

    
  return (
    <ThemedView style = {{justifyContent: "center", alignItems: "center"}}>
      <CustomText category='h1' >Cargando....</CustomText>
    </ThemedView>
  )
}
export default LoadingScreen