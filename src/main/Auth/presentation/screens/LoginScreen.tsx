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


interface UserLogin { username: string, password: string }

const authLogin = async ({ username, password }: UserLogin) => {
  try {
    const { data } = await api.post("/users/login", {
      username,
      password
    });

    return data;

  } catch (error) {
    console.log(error)
    // return undefined;
    throw error
  }
}


const LoginScreen = () => {

  const loginStore = UseAuthStore(state => state.loginStore);

  const {height} = useWindowDimensions();


  const loginMutation = useMutation({
    mutationFn: (data: UserLogin) => authLogin(data),
    onSuccess: async (data) => {
      loginStore(data)
      console.log(await SecureStorageAdapter.getItem('user'))
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
      onSubmit={(values) => {
        loginMutation.mutate(values)
      }}

    >

      {
        ({ values, handleChange, handleSubmit }) => (
          <ThemedView style={{ paddingHorizontal: 20 }}>

            <ScrollView>


              <CustomText category='h1' style ={{paddingTop: height * 0.35 }} >Iniciar sesión</CustomText>

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