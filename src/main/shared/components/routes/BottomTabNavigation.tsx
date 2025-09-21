import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { View, Text, TouchableOpacity } from 'react-native'
import LogOutScreen from '../../../Auth/presentation/screens/LogOutScreen';
import { Ionicons}  from '@expo/vector-icons';
import CustomText from '../ui/CustomText';
import { UseAuthStore } from '../../stores/useAuthStore';
import { EstadoCuentaNavigation } from './EstadoCuentaNavigation';

export type RootBottomParams = {
  Home: undefined;
  Profile: undefined;

}

const Tab = createBottomTabNavigator<RootBottomParams>();
type IoniconName = keyof typeof Ionicons.glyphMap;

const BottomTabNavigation = () => {

  const logout = UseAuthStore(state=> state.logout);

  return (
    <Tab.Navigator
     screenOptions={({route}) => {
        return ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName: IoniconName = 'help-outline'

            if (route.name =="Home" ) {
              iconName = focused ? "document-text" : "document-text-outline"
            } else if (route.name == "Profile") {
              iconName = focused ? "person" : "person-outline"
            }
            return <Ionicons name={iconName} size={size} color={color}  />
          }
        })
     }} 
    >
        <Tab.Screen name = "Home"  component={EstadoCuentaNavigation} options={{headerShown: false}} />
        {/* <Tab.Screen name = "Otro"  component={FacturasScreen}/> */}
        <Tab.Screen name = "Profile"  component={LogOutScreen}
           options={{
          headerRight: () => (
            <TouchableOpacity style={{ marginRight: 10, justifyContent: 'center', alignItems: 'center' }} onPress={logout}>
              <Ionicons name="log-out" size={25} color="red" />
              <CustomText category='label' >LogOut</CustomText>
            </TouchableOpacity>
          )
        }}
        />
    </Tab.Navigator>
  )
}
export default BottomTabNavigation