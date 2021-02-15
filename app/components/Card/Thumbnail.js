import React from 'react';
import { Image } from 'react-native';

function Thumbnail({media}) {
console.log(media)

  return (
    <Image style={{flex: 1, width: '100%'}}
      source={require('../../assets/thumbnail.jpg')}
    />
  );
}

export default Thumbnail;