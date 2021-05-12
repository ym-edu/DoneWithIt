import React from 'react';
import { Button, Text } from 'react-native';
import analytics from '@react-native-firebase/analytics';
import { InterstitialAd, TestIds, AdEventType } from '@react-native-firebase/admob';
import crashlytics from '@react-native-firebase/crashlytics';
// ----------------------------------------------------------------------------
import { useAuthUpdate } from '../hooks/useAuth'
// ----------------------------------------------------------------------------
import firestore from "@react-native-firebase/firestore"



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

  const docRef = firestore().collection("users");
  const [func1, setFunc1] = React.useState('');
  const [func2, setFunc2] = React.useState('');


  React.useEffect(() => {
    crashlytics().log('LogIn mounted.');
// ############################################################################
    const eventListener = interstitial.onAdEvent(type => {
      if (type === AdEventType.LOADED) {
        setLoaded(true);
      }
    });
    // Start loading the interstitial straight away
    interstitial.load();
// ############################################################################
    // Single Doc | One time call
    const readFunc1 = async () => {
      const userDoc = await docRef.doc("user-1").get()
      // console.log(userDoc.data().userName)
      setFunc1(userDoc.data().userName)
    }
    readFunc1()
// ----------------------------------------------------------------------------
    // Single Doc | Real time listener
    const readFunc2 = docRef.doc("user-2").onSnapshot(userDoc => {
      // console.log(userDoc.data().userName)
      setFunc2(userDoc.data().userName)
    })
// ----------------------------------------------------------------------------
    // Multi Doc | One time call
    const readFunc3 = async () => {
      await docRef.get().then(snapshot => {
        const userDocs = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }))
        console.log("GET |", userDocs)
      })
    }
    readFunc3()
// ----------------------------------------------------------------------------
    // Multi Doc | Real time listener
    const readFunc4 = () => {
      docRef.onSnapshot(snapshot => {
        const userDocs = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }))
        console.log("SNAPSHOT |", userDocs)
      })
    }
// ############################################################################
    // Unsubscribe from events on unmount
    return () => {
      eventListener(); // Unsubscribe from ad event listener
      readFunc2(); // Unsubscribe from real time doc listener
      readFunc4(); // Unsubscribe from real time collection of docs listener
    };
  }, []);

  // No advert ready to show yet
  if (!loaded) {
    return null;
  }

  return (
    <>
      <Button title="Log In" onPress={() => {
        interstitial.show();
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
      <Text style={{color: 'white', alignSelf: 'center'}}>1-OTC | {func1}</Text>
      <Text style={{color: 'white', alignSelf: 'center'}}>1-RTL | {func2}</Text>
    </>
  );
}

export default LogIn;
