import { View, Text } from 'react-native'
import { ThemedView } from '../../../shared/components/ui/ThemedView'
import CustomButton from '../../../shared/components/ui/CustomButton'
import { UseAuthStore } from '../../../shared/stores/useAuthStore'
import { Switch } from 'react-native-gesture-handler'
import CustomToggle from '../../../shared/components/ui/CustomToggle'
import SkeletonCard from '../../../shared/components/ui/SkeletonCard'
const LogOutScreen = () => {

    const logout = UseAuthStore(state => state.logout)
  return (
    <ThemedView style ={{paddingTop: 20}}>
      <CustomButton
        title='Logout'
        onPress={logout}
      />
      <SkeletonCard/>
      <Switch/>

      <CustomToggle
        isOn={true}
      />
    </ThemedView>
  )
}
export default LogOutScreen


