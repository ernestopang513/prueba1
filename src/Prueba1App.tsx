import { NavigationContainer } from '@react-navigation/native'
import BottomTabNavigation from './main/shared/components/routes/BottomTabNavigation'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './main/shared/components/routes/AuthProvider';
import RootStackNavigation from './main/shared/components/routes/RootStackNavigation';


const queryClient = new QueryClient();


const Prueba1App = () => {
  return (
    <QueryClientProvider client={queryClient}>

    <NavigationContainer>
      {/* <BottomTabNavigation/> */}
      <AuthProvider>
        <RootStackNavigation/>
      </AuthProvider>
    </NavigationContainer>
    </QueryClientProvider>
  )
}
export default Prueba1App