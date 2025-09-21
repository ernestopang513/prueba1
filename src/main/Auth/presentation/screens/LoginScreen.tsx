import { View, Text, Alert, ScrollView, useWindowDimensions } from 'react-native'
import { ThemedView } from '../../../shared/components/ui/ThemedView'
import CustomText from '../../../shared/components/ui/CustomText'
import { CustomInput } from '../../../shared/components/ui/CustomInput';
import { useMutation } from '@tanstack/react-query';
import { api } from '../../../shared/helpers/api';
import { Formik } from 'formik';
import CustomButton from '../../../shared/components/ui/CustomButton';
import { UseAuthStore } from '../../../shared/stores/useAuthStore';
import { SecureStorageAdapter } from '../../../shared/helpers/secure-storage-adapter';
import { LoginSchema } from '../validations/validations';
import { authLogin } from '../../../../actions/auth/login';
import { UserLogin } from '../../../../domain/entities/auth';


// interface UserLogin { username: string, password: string }

// const authLogin = async ({ username, password }: UserLogin) => {
//   try {
//     const { data } = await api.post("/login", {
//       username,
//       password
//     });
//     // console.log(data);
//     return data;

//   } catch (error) {
//     console.log(error)
//     // return undefined;
//     throw error
//   }
// }


const LoginScreen = () => {

  const loginStore = UseAuthStore(state => state.loginStore);

  const {height} = useWindowDimensions();


  const loginMutation = useMutation({
    mutationFn: (data: UserLogin) => authLogin(data),
    onSuccess: async (data) => {
      loginStore(data)
      console.log(await SecureStorageAdapter.getItem('user'), "user")
      console.log(await SecureStorageAdapter.getItem('token'), "El token")
      // console.log(data),
    },
    onError: () => Alert.alert("Usuario o contraseña invalidos")

  })


  return (

    <Formik
      initialValues={{
        username: '',
        password: ''
      }}
      validationSchema={LoginSchema}
      onSubmit={({username, password}) => {
        loginMutation.mutate({
          username: username.trim(),
          password: password.trim()
        })
      }}

    >
      {
        ({ values, handleChange, handleSubmit }) => (
          <ThemedView style={{ paddingHorizontal: 20 , flex: 1}}>

            <ScrollView
              keyboardShouldPersistTaps = 'handled'
            >


              <CustomText category='h1' style ={{paddingTop: height * 0.25 }} >Iniciar sesión</CustomText>

              <CustomInput
                label='Username'
                placeholder='Ingresa tu nombre de usuario'
                value={values.username}
                onChangeText={handleChange('username')}

              />
              <CustomInput
                label='Contraseña'
                placeholder='Ingresa tu contraseña'
                value={values.password}
                onChangeText={handleChange('password')}
                isPassword
              />

              <View style = {{height: 20}} />
              <CustomButton
                onPress={handleSubmit}
                title={'Log in'} />
            </ScrollView>
          </ThemedView>


        )
      }
    </Formik>
  )
}
export default LoginScreen