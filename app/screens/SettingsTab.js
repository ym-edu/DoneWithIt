import React from 'react';
import { StyleSheet, View, Text, Button, FlatList } from 'react-native';
import { useAuthUpdate } from '../hooks/useAuth'
import auth from '@react-native-firebase/auth';
import TextButton from '../components/TextButton';
import { version } from '../../package.json';

function SettingsTab() {
  const { logOut } = useAuthUpdate();

  return (
    <>
      <View style={styles.container}>
        <View style={styles.link}>
          <TextButton style={{}} onPress={() => logOut()}>Log Out</TextButton>
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={{color: 'white'}}>Version {version}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  link: {
    width: '100%',
    // backgroundColor: 'blue',
    paddingHorizontal: 32,
    paddingVertical: 32,
    alignItems: 'flex-start',
  },
  footer: {
    alignSelf: 'center',
    paddingVertical: 8,
  }
})

export default SettingsTab;
