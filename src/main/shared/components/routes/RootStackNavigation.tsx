import { View, Text } from 'react-native'
import { createStackNavigator } from "@react-navigation/stack";
import AuthStackNavigation from '../../../Auth/AuthStackNavigation';
import BottomTabNavigation from './BottomTabNavigation';
import LoadingScreen from '../../screens/LoadingScreen';




const RootStack = createStackNavigator();

const RootStackNavigation = () => {
  return (
    <RootStack.Navigator
    screenOptions={{
      headerShown: false
    }}
    initialRouteName='Loading'
    >
        <RootStack.Screen name='Auth' component={AuthStackNavigation} />
        <RootStack.Screen name='MainApp' component={BottomTabNavigation} />
        <RootStack.Screen name='Loading' component={LoadingScreen} />
    </RootStack.Navigator>
  )
}
export default RootStackNavigation