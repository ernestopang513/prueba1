import { createStackNavigator } from '@react-navigation/stack'
import { View, Text } from 'react-native'
import LoginScreen from './presentation/screens/LoginScreen';


const AuthStack = createStackNavigator();

const AuthStackNavigation = () => {
  return (
    <AuthStack.Navigator>
        <AuthStack.Screen name = "LogIn" component={LoginScreen} />
        <AuthStack.Screen name = "Register" component={LoginScreen} />
    </AuthStack.Navigator>
  )
}
export default AuthStackNavigation