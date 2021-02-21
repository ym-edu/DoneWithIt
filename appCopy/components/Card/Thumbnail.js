import React from 'react';
import { Image } from 'react-native';

function Thumbnail({media}) {
  return (
    <Image style={{flex: 1, width: '100%'}}
      source={media}
    />
  );
}

export default Thumbnail;