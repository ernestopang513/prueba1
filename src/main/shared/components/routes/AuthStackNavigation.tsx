import { createStackNavigator } from '@react-navigation/stack'
import { View, Text } from 'react-native'
import LoginScreen from '../../../Auth/presentation/screens/LoginScreen';


export type AuthRootStackParams = {
  LogIn: undefined,
  Register: undefined
}

const AuthStack = createStackNavigator<AuthRootStackParams>();

const AuthStackNavigation = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
        <AuthStack.Screen name = "LogIn" component={LoginScreen} />
        <AuthStack.Screen name = "Register" component={LoginScreen} />
    </AuthStack.Navigator>
  )
}
export default AuthStackNavigation