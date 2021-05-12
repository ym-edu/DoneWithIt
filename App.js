import React from 'react';
import Layout from './app/layout';
import Navigation from './app/routes/Navigation';
// ----------------------------------------------------------------------------
import admob, {
  MaxAdContentRating,
  AdsConsent,
  AdsConsentDebugGeography,
  AdsConsentStatus,
} from '@react-native-firebase/admob';
// ----------------------------------------------------------------------------
import crashlytics from '@react-native-firebase/crashlytics';
// ----------------------------------------------------------------------------



// ============================================================================
async function requestConsent() {
  //For physical device use a VPN to set Geography
  await AdsConsent.setDebugGeography(AdsConsentDebugGeography.EEA); //For AVD

  const consentInfo = await AdsConsent.requestInfoUpdate(['pub-2742026173933447']);
  // console.log(consentInfo) //TESTING
  if (
    consentInfo.isRequestLocationInEeaOrUnknown &&
    consentInfo.status === AdsConsentStatus.UNKNOWN
  ) {
    const formResult = await AdsConsent.showForm({
      privacyPolicy: 'https://invertase.io/privacy-policy',
      withPersonalizedAds: true,
      withNonPersonalizedAds: true,
      withAdFree: true,
    });
    
    if (formResult.userPrefersAdFree) {
      // Handle the users request, e.g. redirect to a paid for version of the app
    }
    
    // The user requested non-personalized or personalized ads
    const status = formResult.status;
  }
}
// ============================================================================



export default function App() {
// ============================================================================
  React.useEffect(() => {
  crashlytics().log('App mounted.');
// ----------------------------------------------------------------------------
  requestConsent();
// ----------------------------------------------------------------------------
  admob()
    .setRequestConfiguration({
      maxAdContentRating: MaxAdContentRating.PG,
      tagForChildDirectedTreatment: true,
      tagForUnderAgeOfConsent: true,
    })
    .then(() => {
    });
  }, [])
// ============================================================================



  return (
    <Layout>
      <Navigation/>
    </Layout>
  );
}
