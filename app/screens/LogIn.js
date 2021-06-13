import React from 'react';
import { StyleSheet, View, Button, Text, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import analytics from '@react-native-firebase/analytics';
import { InterstitialAd, TestIds, AdEventType } from '@react-native-firebase/admob';
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

// ============================================================================
const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-2742026173933447~7286128693';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fitness', 'exercie'],
});
// ============================================================================



function LogIn({ navigation }) {
  const { logIn } = useAuthUpdate();
  const [loaded, setLoaded] = React.useState(false);



  React.useEffect(() => {
    crashlytics().log('LogIn mounted');
// ############################################################################
    const eventListener = interstitial.onAdEvent(type => {
      if (type === AdEventType.LOADED) {
        setLoaded(true);
      }
    });
    // Start loading the interstitial straight away
    interstitial.load();
// ############################################################################
    // Unsubscribe from events on unmount
    return () => {
      eventListener(); // Unsubscribe from ad event listener
    };
  }, []);

  // No advert ready to show yet //Warning: Causes content to not render when logging out
  // if (!loaded) {
  //   return null;
  // }

  function Buttons() {
    return (
      <>
      <Button title="Log In" onPress={() => {
        // interstitial.show();
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

  const LoginForm = props => (
    <Formik
      initialValues={{ email: '' }}
      onSubmit={values => logIn(values)}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View style={styles.form}>
          <View>
            <Text style={styles.heading}>Fitter, healthier, happier</Text>
          <Spacer mV={8}/>

            <Text style={{color: 'white', fontWeight: 'bold'}}>Log in to continue</Text>
          </View>
          <Spacer mV={16}/>
          <FormikInput
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
            label={'Email'}
          />
          <Spacer mV={16}/>
          <FormikInput
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            label={'Password'}
          />
          <Spacer mV={64}/>
          <CreateButton
          title='Log In'
          onPress={handleSubmit}
          titleStyle={{fontSize: 24}}
          style={{ alignSelf: 'flex-start' }}
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
            navigation.navigate("SignUp")
          }}
          />
          <CreateButton
          title='Forgot Password?'
          style={{}}
          onPress={() => {
            navigation.navigate("ResetPassword")
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
      contentContainerStyle={{height: sizes.windowHeight, justifyContent: 'space-between'}}
      >
        <Text></Text>
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
