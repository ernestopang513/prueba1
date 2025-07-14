
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
// import { RootStackParams } from "../navigation/StackNavigation"
import { PropsWithChildren, useEffect } from "react"
import { UseAuthStore } from "../../stores/useAuthStore";
// import { useAuthStore } from "../store/auth/useAuthStore"



export const AuthProvider = ({children}: PropsWithChildren) => {

    const navigation = useNavigation();
    const checkStatus = UseAuthStore(state => state.checkStatus);
    const status = UseAuthStore(state => state.status)
    useEffect(()=>{
      checkStatus();

      // setTimeout(() => {
      //   checkStatus();
        
      // }, 5000);

    }, [])

    useEffect(() => {
      if(status !== 'checking') {
        if (status === 'authenticated') {
            navigation.reset({
                index: 0,
                routes: [{name: 'MainApp' as never}],
            })
        }else {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Auth' as never}]
            })
        }
      }
    
   
    }, [status])
    

  return (
    <>{ children }</>
  )
}


