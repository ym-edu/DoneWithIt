import Constants from 'expo-constants';
import { Dimensions } from 'react-native';

const statusBar= Constants.statusBarHeight;
const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height - statusBar;
const spacerHorizontal = 8;
const spacerVertical = spacerHorizontal * 2;
const fullWidth = screenWidth - spacerVertical;
const windowHeight = Dimensions.get('window').height

export default {
  fullWidth,
  screenHeight,
  screenWidth,
  spacerHorizontal,
  spacerVertical,
  statusBar,
  windowHeight,
}
