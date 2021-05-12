/**"@ptomasroos/react-native-multi-slider": "^2.2.2"
 * This component is a copy of the original DefaultLabel component form the multi-slider library
 * It has been modified to meet my stylistic needs
 */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';

import { View, Text, StyleSheet } from 'react-native';

const sliderRadius = 3;
const width = 30;
const height = 20;
export default class DefaultLabel extends React.Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.formatTime = this.formatTime.bind(this);
  }

  formatTime = (time) => {
    const formatedTime = moment.duration(time, "seconds").format("hh:mm:ss").padStart(4, "0:0");
    return formatedTime
  }

  static propTypes = {
    oneMarkerValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    twoMarkerValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    oneMarkerLeftPosition: PropTypes.number,
    twoMarkerLeftPosition: PropTypes.number,

    oneMarkerPressed: PropTypes.bool,
    twoMarkerPressed: PropTypes.bool,
  };


  render() {
    const {
      oneMarkerValue,
      twoMarkerValue,
      oneMarkerLeftPosition,
      twoMarkerLeftPosition,
      oneMarkerPressed,
      twoMarkerPressed,
    } = this.props;

    return (
      <View style={{ position: 'relative' }}>
        {Number.isFinite(oneMarkerLeftPosition) &&
          Number.isFinite(oneMarkerValue) && (
            oneMarkerPressed &&
            <View
              style={[
                styles.sliderLabel,
                { left: oneMarkerLeftPosition - width / 2},
                // oneMarkerPressed && styles.markerPressed,
              ]}
            >
              <View style={{
                alignSelf:'center',
                position: 'absolute',
                bottom: -width/4,
                width: 0,
                height: 0,
                // borderTopWidth: width/4,
                // borderTopColor: 'green',
                borderRightWidth: width/4,
                borderRightColor: 'transparent',
                borderLeftWidth: width/4,
                borderLeftColor: 'transparent',
                borderBottomWidth: width/4,
                borderBottomColor: '#f1f1f1',
                transform: [{rotateZ: "180deg"}]
            }}/>
              <Text style={styles.sliderLabelText}>{this.formatTime(oneMarkerValue)}</Text>
            </View>
          )}

        {Number.isFinite(twoMarkerLeftPosition) &&
          Number.isFinite(twoMarkerValue) && (
            twoMarkerPressed &&
            <View
              style={[
                styles.sliderLabel,
                { left: twoMarkerLeftPosition - width / 2 },
                // twoMarkerPressed && styles.markerPressed,
              ]}
            >
              <View style={{
                alignSelf:'center',
                position: 'absolute',
                bottom: -width/4,
                width: 0,
                height: 0,
                // borderTopWidth: width/4,
                // borderTopColor: 'green',
                borderRightWidth: width/4,
                borderRightColor: 'transparent',
                borderLeftWidth: width/4,
                borderLeftColor: 'transparent',
                borderBottomWidth: width/4,
                borderBottomColor: '#f1f1f1',
                transform: [{rotateZ: "180deg"}]
            }}/>
              <Text style={styles.sliderLabelText}>{this.formatTime(twoMarkerValue)}</Text>
            </View>
          )}
      </View>
    );
  }
}

// const styles = StyleSheet.create({
//   sliderLabel: {
//     position: 'absolute',
//     bottom: 0,
//     minWidth: width,
//     padding: 8,
//     backgroundColor: '#f1f1f1',
//   },
//   sliderLabelText: {
//     alignItems: 'center',
//     textAlign: 'center',
//     fontStyle: 'normal',
//     fontSize: 11,
//   },
//   markerPressed: {
//     borderWidth: 2,
//     borderColor: '#999',
//   },
// });

const styles = StyleSheet.create({
  sliderLabel: {
    position: 'absolute',
    bottom: 0,
    minWidth: width,
    height: height,
    padding: 2,
    backgroundColor: '#f1f1f1',
    // alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 2
  },
  sliderLabelText: {
    alignItems: 'center',
    textAlign: 'center',
    fontStyle: 'normal',
    fontSize: 12,
  },
});
