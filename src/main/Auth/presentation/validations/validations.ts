import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .required('El username es requerido')
    .min(5, 'Minimo 5 caracteres'),
    
  password: Yup.string()
    .required("La contraseña es obligatoria")
    .typeError('La contraseña es alfanumerica')
    .min(5, "Minimo 5 caracteres")
  
  
})