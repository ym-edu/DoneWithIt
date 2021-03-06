import React from 'react';
import { StyleSheet, View, Button, Text, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';
// ----------------------------------------------------------------------------
import { useAuthUpdate } from '../hooks/useAuth'
import auth from '@react-native-firebase/auth';
// ----------------------------------------------------------------------------
import CreateButton from '../components/CreateButton';
import FormikInput from '../components/FormikInput';
import { Formik } from 'formik';
import Spacer from '../components/Spacer';
import { sizes } from '../config/constants';
import * as yup from 'yup'

function LogIn({ navigation }) {
  const { logIn } = useAuthUpdate();

  React.useEffect(() => {
    crashlytics().log('LogIn mounted');
  }, []);

  function Buttons() {
    return (
      <>
      <Button title="Log In" onPress={() => {
        logIn()
      }} />
      <Button title="Sign Up" onPress={() => navigation.navigate("SignUp")} />
      <Button title="Forgot Password?" onPress={() => navigation.navigate("ResetPassword")} />
      <Button
        title="Analytics Debug"
        onPress={async () =>
          await analytics().logEvent('DeviceEvent', {
            log: 'Working',
          })
        }
      />
      <Button title="Test Crash" onPress={() => crashlytics().crash()} />
      <Button title="Current User" onPress={() => console.log(auth().currentUser.uid)} />
    </>
    )
  }

  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter valid email")
      .required('Email Address is Required'),
    password: yup
      .string()
      //TODO: Action URL should link to an interface for users to complete tasks (sign up confirmation, password resets, email address changes)
      .min(8, ({ min }) => `Password must be at least ${min} characters`)
      .required('Password is required'),
  })

  const LoginForm = props => (
    <Formik
      validationSchema={loginValidationSchema}
      initialValues={{ email: '', password: '' }}
      onSubmit={(values, { setErrors, resetForm }) => {
        logIn(values, setErrors)
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
        <View style={styles.form}>
          {errors.db &&
          <Text style={{fontSize: 12, color: '#D03050'}}>{errors.db}</Text>}
          <View>
            <Text style={styles.heading}>Fitter, healthier, happier</Text>
          <Spacer mV={8}/>

            <Text style={{color: 'white', fontWeight: 'bold'}}>Log in to continue</Text>
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
          <Spacer mV={16}/>
          {(errors.password && touched.password) &&
          <Text style={{fontSize: 12, color: '#D03050'}}>{errors.password}</Text>}
          <FormikInput
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            label={'Password'}
            secureTextEntry
            keyboardType='default'
          />
          <Spacer mV={64}/>
          <CreateButton
          title='Log In'
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
          title='Sign Up'
          style={{}}
          onPress={() => {
            navigation.replace("SignUp")
          }}
          />
          <CreateButton
          title='Forgot Password?'
          style={{}}
          onPress={() => {
            navigation.replace("ResetPassword")
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

export default LogIn;
