import { View, Text } from 'react-native'
import { ThemedView } from '../../../shared/components/ui/ThemedView'
import CustomButton from '../../../shared/components/ui/CustomButton'
import { UseAuthStore } from '../../../shared/stores/useAuthStore'
const LogOutScreen = () => {

    const logout = UseAuthStore(state => state.logout)
  return (
    <ThemedView style ={{paddingTop: 20}}>
      <CustomButton
        title='Logout'
        onPress={logout}
      />
    </ThemedView>
  )
}
export default LogOutScreen


