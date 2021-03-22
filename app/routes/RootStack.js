import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AppTabs from './AppTabs';
import Loading from '../screens/Loading';
import AuthStack from './AuthStack';
import Modal from '../screens/Modal';
import Alert from '../screens/Alert';

const Stack = createStackNavigator();

export default function RootStack() {
  const [isLoading, setIsLoading] = React.useState(true)
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(!isLoading) //Toggles Loading vs AuthStack per render
      setUser({}) //TODO: Figure out how to set user
      // After LogIn || SignUp
    }, 500)
  }, [])

  return (
    <Stack.Navigator mode="modal"
    headerMode="none"
    screenOptions={{
      animationEnabled: false,
    }}
    >
      {
      isLoading
      ? <Stack.Screen name="Loading" component={Loading} />
      : user
        ? <Stack.Screen name="AppTabs" component={AppTabs} />
        : <Stack.Screen name="AuthStack" component={AuthStack} />
      }
      <Stack.Screen
      name="Modal"
      component={Modal}
      options={{
        animationEnabled: true,
      }}
      />
      <Stack.Screen
      name="Alert"
      component={Alert}
      options={{
        animationEnabled: false,
        cardStyle: { backgroundColor: '#0000001A' },
        cardOverlayEnabled: true,
        cardStyleInterpolator: ({ current: { progress } }) => {
          return {
            cardStyle: {
              opacity: progress.interpolate({
                inputRange: [0, 0.5, 0.9, 1],
                outputRange: [0, 0.25, 0.7, 1],
              }),
            },
            overlayStyle: {
              opacity: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.5],
                extrapolate: "clamp",
              })
            }
          }
        }
      }}
      />
    </Stack.Navigator>
  );
}
