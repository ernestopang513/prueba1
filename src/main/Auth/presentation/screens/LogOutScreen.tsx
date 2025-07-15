import { View, Text, StyleSheet } from 'react-native'
import { ThemedView } from '../../../shared/components/ui/ThemedView'
import CustomButton from '../../../shared/components/ui/CustomButton'
import { UseAuthStore } from '../../../shared/stores/useAuthStore'
import { Switch } from 'react-native-gesture-handler'
import CustomToggle from '../../../shared/components/ui/CustomToggle'
import SkeletonCard from '../../../shared/components/ui/SkeletonCard'
import CustomText from '../../../shared/components/ui/CustomText'
import { create } from 'zustand';
const LogOutScreen = () => {

  const username = UseAuthStore(state => state.user?.username) ?? 'Usuario'
  return (
    <ThemedView style ={{paddingTop: 20, flex: 1, paddingHorizontal: 30 }}>
    
    <View  style = {style.info}>
      <CustomText category='h5'>Username</CustomText>
      <CustomText>{username}</CustomText>
    </View>

 
    </ThemedView>
  )
}
export default LogOutScreen

const style = StyleSheet.create({
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})

