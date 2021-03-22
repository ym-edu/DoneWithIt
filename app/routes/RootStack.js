import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AppTabs from './AppTabs';
import Loading from '../screens/Loading';
import AuthStack from './AuthStack'

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
    <Stack.Navigator>
      {isLoading
      ? <Stack.Screen name="Loading" component={Loading} />
      : user
        ? <Stack.Screen name="AppTabs" component={AppTabs} />
        : <Stack.Screen name="AuthStack" component={AuthStack} />}
    </Stack.Navigator>
  );
}
