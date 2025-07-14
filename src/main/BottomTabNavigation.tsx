import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { View, Text } from 'react-native'
import HomeScreen from './home/presentation/screens/HomeScreen';
import LoginScreen from './Auth/presentation/screens/LoginScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator>
        <Tab.Screen name = "Home"  component={LoginScreen}/>
        <Tab.Screen name = "Otro"  component={HomeScreen}/>
    </Tab.Navigator>
  )
}
export default BottomTabNavigation