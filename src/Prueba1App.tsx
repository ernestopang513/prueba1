import { NavigationContainer } from '@react-navigation/native'
import BottomTabNavigation from './main/BottomTabNavigation'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


const queryClient = new QueryClient();


const Prueba1App = () => {
  return (
    <QueryClientProvider client={queryClient}>

    <NavigationContainer>
      <BottomTabNavigation/>
    </NavigationContainer>
    </QueryClientProvider>
  )
}
export default Prueba1App