import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
// import AppTabs from './AppTabs';
import AuthStack from './AuthStack'
import RootStack from './RootStack'
import Loading from '../screens/Loading'

const Theme = { //TODO: Toggle dark mode through device system settings
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#171818', //Content area
    primary: '#242626', //Navigation bar & Back button :(
  }
}

export default function Navigation() {
  const [isLoading, setIsLoading] = React.useState(true)
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(!isLoading) //Toggles Loading vs AuthStack per render
      // setUser({}) //TODO: Figure out how to set user
      // After LogIn || SignUp
    }, 500)

    // setTimeout(() => {
    //   setUser({})
    // }, 1000)
  }, [])

  return (
    <NavigationContainer theme={Theme}>
      {isLoading ? <Loading/>
      : user ? <RootStack/> : <AuthStack/>}
    </NavigationContainer>
  );
}
