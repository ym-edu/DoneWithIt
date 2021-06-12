import React from 'react';
import { Button, Text } from 'react-native';
import analytics from '@react-native-firebase/analytics';
import { InterstitialAd, TestIds, AdEventType } from '@react-native-firebase/admob';
import crashlytics from '@react-native-firebase/crashlytics';
// ----------------------------------------------------------------------------
import { useAuthUpdate } from '../hooks/useAuth'
import auth from '@react-native-firebase/auth';
// ----------------------------------------------------------------------------



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
      <Text style={{color: 'white', alignSelf: 'center'}}>FS OUTPUT</Text>
      <Text style={{color: 'white', alignSelf: 'center'}}>FS OUTPUT</Text>
      <Button title="LOG" onPress={() => console.log(auth().currentUser.uid)} />
    </>
  );
}

export default LogIn;
