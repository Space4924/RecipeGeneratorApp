import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TextInput, View, Pressable, Alert } from 'react-native';
import { Formik, FormikHelpers } from 'formik';
import axios from 'axios';
import * as Yup from 'yup'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Color from '@/services/Color';
import { useRouter } from 'expo-router';
import useAuth from '@/hooks/useAuth';
import useAPI from '@/hooks/useAPI';



const RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(25, 'Too Long!')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  phoneNo: Yup.string()
    .min(10, 'Invalid Number')
    .max(10, 'Invalid Number')
    .required("Phone No is required"),
  password: Yup.string()
    .min(8, 'Too Short!')
    .max(12, 'Too Long!')
    .required('Password is Required')
})

export default function SignIn() {
  const {setValid}=useAuth();
  const router=useRouter();
  interface FormValues {
    email: string;
    name: string;
    phoneNo: string;
    password: string;
  }

  const SubmitButton = async (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>
  ) => {
    const { resetForm, setFieldValue } = formikHelpers;
    console.log(values);

    try {
      // const resp = await axios.post('http://10.81.19.214:8001/register', values);
      const resp=await useAPI('/register',values);

      if (resp.status === 201) {
        Alert.alert('Success', 'User registered successfully!', [{ text: 'Ok' }]);
        resetForm(); // reset the whole form
      }
      router.push('./home')


    } catch (error: any) {
      setFieldValue('email', '');
      setFieldValue('password', '');
      Alert.alert(
        'Error',
        error.response?.data?.message || 'Something went wrong',
        [{ text: 'OK' }]
      );
      console.log("values");

    }
  };
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ email: '', name: '', phoneNo: '', password: '' }}
        validationSchema={RegisterSchema}
        onSubmit={(value, formikHelpers) => SubmitButton(value, formikHelpers)}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              placeholderTextColor="#7f8c8d"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              keyboardType="email-address"
            />
            {errors.email && touched.email ? (
              <Text style={styles.errorText}>{errors.email}</Text>
            ) : null}
            <TextInput
              style={styles.input}
              placeholder="Name"
              placeholderTextColor="#7f8c8d"
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
            />
            {errors.name && touched.name ? (
              <Text style={styles.errorText}>{errors.name}</Text>
            ) : null}
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              placeholderTextColor="#7f8c8d"
              onChangeText={handleChange('phoneNo')}
              onBlur={handleBlur('phoneNo')}
              value={values.phoneNo}
              keyboardType="numeric"
            />
            {errors.phoneNo && touched.phoneNo ? (
              <Text style={styles.errorText}>{errors.phoneNo}</Text>
            ) : null}
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#7f8c8d"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            {errors.password && touched.password ? (
              <Text style={styles.errorText}>{errors.password}</Text>
            ) : null}
            <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>

      <View style={styles.breaks}>
        <Text style={{ margin: 'auto', color: '#f5b041', fontWeight: 'bold' }}>--------------------- or ---------------------</Text>
      </View>
      <View style={styles.footer}>
        <Text style={{ color: Color.GREY }}>Already a User   </Text>
        <Pressable onPress={() => setValid(false)}>
          <Text style={{ color: '#f5b041' }}>Sign Up</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    width: '85%',
    padding: 20,
    borderRadius: 15,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#f5b041',
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
    color: Color.WHITE
  },
  button: {
    backgroundColor: '#f39c12',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  breaks: {
    marginBottom: 10
  },
  footer: {
    marginHorizontal: 'auto',
    flexDirection: 'row',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: -10
  }

});
