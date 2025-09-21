import { createStackNavigator } from "@react-navigation/stack"
import FacturasScreen from "../../../estadoCuenta/presentation/screens/FacturasScreen";
import DetalleFacturasScreen from "../../../estadoCuenta/presentation/screens/DetalleFacturasScreen";

export type EstadoCuentaParams = {
    "Estados de cuenta": undefined;
    Detalle: {id: number, estado: string}
}

const EstadoCuentaStack = createStackNavigator<EstadoCuentaParams>();


export const EstadoCuentaNavigation = () => {
  return (
    <EstadoCuentaStack.Navigator>
        <EstadoCuentaStack.Screen name = "Estados de cuenta" component={FacturasScreen} />
        <EstadoCuentaStack.Screen name = "Detalle" component={DetalleFacturasScreen} />
    </EstadoCuentaStack.Navigator>
  )
}