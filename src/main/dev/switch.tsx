import React from 'react';
import { View, TextInput, Text, Switch, Button } from 'react-native';
import { Formik } from 'formik';
import CustomButton from '../shared/components/ui/CustomButton';
import CustomToggle from '../shared/components/ui/CustomToggle';

type FormValues = {
  username: string;
  isActive: boolean;
};


export default function MyForm() {
  return (
    <Formik
      initialValues={{ username: '', isActive: false }}
      onSubmit={(values) => console.log(values)}
    >
      {({ values, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
        <View style={{ padding: 20 }}>
          <Text>Username</Text>
          <TextInput
            value={values.username}
            onChangeText={handleChange('username')}
            onBlur={handleBlur('username')}
            placeholder="Enter your name"
            style={{
              borderWidth: 1,
              borderColor: 'gray',
              padding: 8,
              marginBottom: 16,
            }}
          />

          <Text>¿Activo?</Text>
          <CustomToggle
            isOn={values.isActive}
            onToggle={(value) => setFieldValue('isActive', value)}
          />

          <CustomButton onPress={handleSubmit} title="Enviar" />
        </View>
      )}
    </Formik>
  );
}
