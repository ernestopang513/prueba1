import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { View, Text } from 'react-native'
import HomeScreen from '../../../home/presentation/screens/HomeScreen';
import LoginScreen from '../../../Auth/presentation/screens/LoginScreen';
import LogOutScreen from '../../../Auth/presentation/screens/LogOutScreen';
import ProductNavigation from '../../../product/ProductNavigation';

const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
     screenOptions={{
      // headerShown: false,
      tabBarIcon: () => null,
     }}
    >
        <Tab.Screen name = "Home"  component={ProductNavigation} options={{headerShown: false}} />
        <Tab.Screen name = "Otro"  component={HomeScreen}/>
        <Tab.Screen name = "Logout"  component={LogOutScreen}/>
    </Tab.Navigator>
  )
}
export default BottomTabNavigation