import { createStackNavigator } from '@react-navigation/stack'
import ProductScreen from './ProductScreen';
import CreateProductScreen from './CreateProductScreen';
import CrearContrato from './CrearContrato';
import FacturasScreen from '../estadoCuenta/presentation/screens/FacturasScreen';
import DetalleFacturasScreen from '../estadoCuenta/presentation/screens/DetalleFacturasScreen';

const ProductStack = createStackNavigator();

const ProductNavigation = () => {
  return (
    <ProductStack.Navigator>
      <ProductStack.Screen name='Estados de cuenta' component={FacturasScreen}/>
      <ProductStack.Screen name='Detalle' component={DetalleFacturasScreen}/>
      <ProductStack.Screen name='CreateContrato' component={CrearContrato}/>
    </ProductStack.Navigator>
  )
}
export default ProductNavigation