import { View, Text } from 'react-native'
import { ThemedView } from '../../../shared/components/ui/ThemedView'
import CustomText from '../../../shared/components/ui/CustomText'
import { CustomInput } from '../../../shared/components/ui/CustomInput';
import { useMutation } from '@tanstack/react-query';
import { api } from '../../../shared/helpers/api';
import { Formik } from 'formik';
import CustomButton from '../../../shared/components/ui/CustomButton';


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
    return null
  }
}


const LoginScreen = () => {


  const loginMutation = useMutation({
    mutationFn: (data: UserLogin) => authLogin(data),
    onSuccess: (data) => {
      console.log(data)
    }

  })


  return (

    <Formik
      initialValues={{
        username: '',
        password: ''
      }}
      onSubmit={(values) => {
        loginMutation.mutate(values)
      }}

    >

      {
        ({values, handleChange, handleSubmit}) => (
          <ThemedView style={{ paddingHorizontal: 20 }}>
            <CustomText category='h1' >Iniciar sesión</CustomText>

            <CustomInput 
              value={values.username}
              onChangeText={handleChange('username')}
            />
            <CustomInput 
              value={values.password}
              onChangeText={handleChange('password')}
            />
          <CustomButton 
          onPress={handleSubmit}
          title={'Log in'}/>
          </ThemedView>


        )
      }
    </Formik>
  )
}
export default LoginScreen