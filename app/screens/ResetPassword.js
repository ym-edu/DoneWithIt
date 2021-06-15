import React from 'react';
import { StyleSheet, View, Button, Text, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import CreateButton from '../components/CreateButton';
import FormikInput from '../components/FormikInput';
import { Formik } from 'formik';
import Spacer from '../components/Spacer';
import { sizes } from '../config/constants';
import * as yup from 'yup'

import { useAuthUpdate } from '../hooks/useAuth'

function ResetPassword({ navigation }) {
  const { resetPassword } = useAuthUpdate();

  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter valid email")
      .required('Email Address is Required'),
  })

  const LoginForm = props => (
    <Formik
      validationSchema={loginValidationSchema}
      initialValues={{ email: ''}}
      onSubmit={(values, { setErrors, resetForm }) => {
        resetPassword(values, setErrors, navigation)
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
        <View style={styles.form}>
          {errors.db &&
          <Text style={{fontSize: 12, color: '#D03050'}}>{errors.db}</Text>}
          <View>
            <Text style={styles.heading}>Forgot password?</Text>
            <Text style={{color: 'white', fontWeight: 'bold'}}>Enter your email and we'll send you a link to reset your password.</Text>
          <Spacer mV={8}/>
          </View>
          <Spacer mV={16}/>

          {(errors.email && touched.email) &&
          <Text style={{fontSize: 12, color: '#D03050'}}>{errors.email}</Text>}
          <FormikInput
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
            label={'Email'}
            keyboardType='email-address'
          />
          <Spacer mV={64}/>
          <CreateButton
          title='Send Email'
          onPress={handleSubmit}
          titleStyle={{fontSize: 24}}
          style={{ alignSelf: 'flex-start' }}
          disabled={!isValid}
          />
        </View>
      )}
    </Formik>
  );

  function Redirects() {
    return (
      <>
        <View style={styles.redirects}>
          <CreateButton
          title='Log In'
          style={{}}
          onPress={() => {
            navigation.replace("LogIn")
          }}
          />
        </View>
      </>
    )
  }

  return (
    <>
      <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={"padding"}
      keyboardVerticalOffset={
        Platform.select({
          ios: () => 0,
          android: () => - sizes.windowHeight
        })()
      }
      // enabled={true}
      >
      <ScrollView style={styles.container}
      contentContainerStyle={{height: sizes.windowHeight, justifyContent: 'space-around'}}
      >
        <LoginForm/>
        <Redirects/>
      </ScrollView>
      </KeyboardAvoidingView>
      {/* <Buttons/> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  form: {
    // borderWidth: 1,
    // borderColor: 'white',
    // marginTop: -64,
  },
  redirects: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  heading: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    // marginTop: 32,
  },
})

export default ResetPassword;
