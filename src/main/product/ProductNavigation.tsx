import { createStackNavigator } from '@react-navigation/stack'
import { View, Text } from 'react-native'
import ProductScreen from './ProductScreen';
import CreateProductScreen from './CreateProductScreen';
import CrearContrato from './CrearContrato';

const ProductStack = createStackNavigator();

const ProductNavigation = () => {
  return (
    <ProductStack.Navigator>
      <ProductStack.Screen name='Productos' component={ProductScreen}/>
      <ProductStack.Screen name='Create' component={CreateProductScreen}/>
      <ProductStack.Screen name='CreateContrato' component={CrearContrato}/>
    </ProductStack.Navigator>
  )
}
export default ProductNavigation