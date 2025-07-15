import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { View, Text } from 'react-native'
import HomeScreen from '../../../home/presentation/screens/HomeScreen';
import LoginScreen from '../../../Auth/presentation/screens/LoginScreen';
import LogOutScreen from '../../../Auth/presentation/screens/LogOutScreen';
import ProductNavigation from '../../../product/ProductNavigation';
import FacturasScreen from '../../../estadoCuenta/presentation/screens/FacturasScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
type IoniconName = keyof typeof Ionicons.glyphMap;

const BottomTabNavigation = () => {
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
        <Tab.Screen name = "Home"  component={ProductNavigation} options={{headerShown: false}} />
        {/* <Tab.Screen name = "Otro"  component={FacturasScreen}/> */}
        <Tab.Screen name = "Profile"  component={LogOutScreen}/>
    </Tab.Navigator>
  )
}
export default BottomTabNavigation