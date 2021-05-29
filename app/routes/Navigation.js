import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import RootStack from './RootStack';
import AuthProvider from '../hooks/useAuth';
import DBProvider from '../hooks/useDB';
import SearchProvider from '../hooks/useSearch';
import LoopProvider from '../hooks/useLoop';
import analytics from '@react-native-firebase/analytics';
import WorkoutStoreProvider from '../hooks/useWorkoutStore';

const Theme = { //TODO: Toggle dark mode through device system settings
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#171818', //Content area
    primary: '#242626', //Navigation bar & Back button :(
  }
}

export default function Navigation() {
  const navigationRef = React.useRef();
  const routeNameRef = React.useRef();

  return (
    <NavigationContainer
    theme={Theme}
    ref={navigationRef}
    onReady={() =>
      (routeNameRef.current = navigationRef.current.getCurrentRoute().name)
    }
    onStateChange={async () => {
      const previousRouteName = routeNameRef.current
      const currentRouteName = navigationRef.current.getCurrentRoute().name

      if(previousRouteName !== currentRouteName) {
        await analytics().logScreenView({
          screen_name: currentRouteName,
          screen_class: currentRouteName,
        })
      }
      // console.log(currentRouteName)
    }}
    >
      <AuthProvider>
        <DBProvider>
          <LoopProvider>
            <SearchProvider>
              <WorkoutStoreProvider>
                <RootStack/>
              </WorkoutStoreProvider>
            </SearchProvider>
          </LoopProvider>
        </DBProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}
