import { View, Text } from 'react-native'
import { createStackNavigator } from "@react-navigation/stack";
import AuthStackNavigation from '../../../Auth/AuthStackNavigation';
import BottomTabNavigation from '../../../BottomTabNavigation';


const RootStack = createStackNavigator();

const RootStackNavigation = () => {
  return (
    <RootStack.Navigator>
        <RootStack.Screen name='Auth' component={AuthStackNavigation} />
        <RootStack.Screen name='MainApp' component={BottomTabNavigation} />
    </RootStack.Navigator>
  )
}
export default RootStackNavigation