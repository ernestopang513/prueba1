
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
// import { RootStackParams } from "../navigation/StackNavigation"
import { PropsWithChildren, useEffect } from "react"
import { UseAuthStore } from "../../stores/useAuthStore";
import { RootStackParams } from "./RootStackNavigation";
// import { useAuthStore } from "../store/auth/useAuthStore"



export const AuthProvider = ({children}: PropsWithChildren) => {

    const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
    const checkStatus = UseAuthStore(state => state.checkStatus);
    const status = UseAuthStore(state => state.status)
    useEffect(()=>{
      checkStatus();
    }, [])

    useEffect(() => {
      if(status !== 'checking') {
        if (status === 'authenticated') {
            navigation.reset({
                index: 0,
                routes: [{name: 'MainApp'}],
            })
        }else {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Auth'}]
            })
        }
      }
    }, [status])
    

  return (
    <>{ children }</>
  )
}


