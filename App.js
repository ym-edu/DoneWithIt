import React from 'react';
import Layout from './app/layout';
import Navigation from './app/routes/Navigation';
import admob, { MaxAdContentRating } from '@react-native-firebase/admob';

export default function App() {
  React.useEffect(() => {
  admob()
    .setRequestConfiguration({
      // Update all future requests suitable for parental guidance
      maxAdContentRating: MaxAdContentRating.PG,
  
      // Indicates that you want your content treated as child-directed for purposes of COPPA.
      tagForChildDirectedTreatment: true,
  
      // Indicates that you want the ad request to be handled in a
      // manner suitable for users under the age of consent.
      tagForUnderAgeOfConsent: true,
    })
    .then(() => {
      // Request config successfully set!
    });
  }, [])
  
  return (
    <Layout>
      <Navigation/>
    </Layout>
  );
}
