import { StyleSheet, Text, View, TextInput, Alert, TouchableOpacity, Pressable } from 'react-native'
import React from 'react'
import { Formik } from 'formik';
import axios from 'axios';
import Color from '@/services/Color';
import { FormikHelpers } from 'formik';
import { useRouter } from 'expo-router';
import useAuth from '@/hooks/useAuth';
import useAPI from '@/hooks/useAPI';


export default function SignUp() {
  const {setValid}=useAuth();
  const router=useRouter();
  interface FormValues {
    email: string;
    password: string;
  }
  const SubmitButton = async (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>
  ) => {
    const { resetForm, setFieldValue } = formikHelpers;
  
    console.log(values);
  
    try {
      // const resp = await axios.post('http://10.81.19.214:8001/signin', values);
      const resp=await useAPI('/signin',values);
  
      if (resp.status === 200) {
        Alert.alert('Success', "Signed In Successfully", [{ text: "Ok" }]);
        resetForm();
      } 
      router.push('./home')
    } catch (error: any) {
      // ✅ Better to use optional chaining and fallback default
      const status = error?.response?.status;
      const message = error?.response?.data?.message || "Something went wrong";
  
      if (status === 400) {
        Alert.alert("Failure", "User Doesn't Exist", [{ text: "OK" }]);
      } else if (status === 401) {
        Alert.alert("Failure", "Incorrect Password", [{ text: "OK" }]);
        setFieldValue('password', '');
      } else {
        Alert.alert("Error", message, [{ text: "OK" }]);
      }
    }
  };
  
 
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ email: '', password: '' }}
        //   validationSchema={RegisterSchema}
        onSubmit={(value, FormikHelpers) => SubmitButton(value, FormikHelpers)}
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
              placeholder="Password"
              placeholderTextColor="#7f8c8d"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            {errors.password && touched.password ? (
              <Text style={styles.errorText}>{errors.password}</Text>
            ) : null}
            <TouchableOpacity style={styles.button} onPress={()=>handleSubmit()}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>

      <View style={styles.breaks}>
        <Text style={{ margin: 'auto', color: '#f5b041', fontWeight: 'bold' }}>--------------------- or ---------------------</Text>
      </View>
      <View style={styles.footer}>
        <Text style={{ color: Color.GREY }}>New User   </Text>
        <Pressable onPress={() => setValid(true)}>
          <Text style={{ color: '#f5b041' }}>Log In</Text>
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
