import React, { useContext } from 'react';
import { View } from 'react-native';
import RooIcons from './RooIcons';
import { constants } from '../../config';
const { colors } = constants;

const IconContext = React.createContext()

export default function useIcon() {
  return useContext(IconContext)
}

export function IconProvider({ children }) {
  function Icon ({ name, size = 16, color = colors.Light, container = false, style }) {
    const containerSize = size * 2;

    const iconStyle = {
      width: containerSize,
      height: containerSize,
      backgroundColor: container ? colors.primaryLighter : null,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: size,
    }

    return (
      <View style={[iconStyle, style]}>
        <RooIcons name={name} size={size} color={color}/>
      </View>
    )
  }

  return (
    <IconContext.Provider value={Icon}>
      {children}
    </IconContext.Provider>
  )
}
