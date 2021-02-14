import React from 'react';
import { View } from 'react-native';

function Spacer({space}) {
  return (
    <View style={{marginBottom: space}} />
  );
}

export default Spacer;