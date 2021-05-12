import React, { useCallback } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { useLoop, useLoopUpdate } from '../hooks/useLoop';
import sizes from '../config/constants/sizes';
import CustomLabel from '../components/CustomLabel'

function Slider() {
  const { duration, scrollEnabled, currentTime, values } = useLoop();
  const { setValues, formatSeconds } = useLoopUpdate();

  const enableScroll = () => {
    scrollEnabled.current = true
  }
  const disableScroll = () => {
    scrollEnabled.current = false
  }

  const onValuesChangeFinish = useCallback((state) => {
    console.log("Values",state)
    enableScroll()
    setValues(state)
  }, [])

  const width = sizes.fullWidth - 40

  function MarkerLeft() {
    return(
      <View style={[styles.marker, {marginRight: 10}]}>
        {/* <View style={styles.grip}/> */}
        {/* <Text style={{alignSelf: 'center'}}>]</Text> */}
      </View>
    )
  }

  function MarkerRight() {
    return(
      <View style={[styles.marker, {transform: [{ rotateZ: "180deg" }], marginLeft: 10}]}>
        {/* <View style={styles.grip}/> */}
        {/* <Text style={{alignSelf: 'center'}}>]</Text> */}
      </View>
    )
  }

  return (
    <>
      <View style={{alignSelf: 'center'}}>
        {duration && <>
          <Text style={styles.currentTime}>
            {formatSeconds(currentTime)}
          </Text>
          <MultiSlider
          min={0}
          max={duration}
          values={[0, duration]}
          sliderLength={width}
          onValuesChangeStart={disableScroll}
          onValuesChangeFinish={onValuesChangeFinish}
          enabledTwo={true}
          isMarkersSeparated={true}
          customMarkerLeft={() => <MarkerLeft/>}
          customMarkerRight={() => <MarkerRight/>}
          selectedStyle={{backgroundColor: '#D03050'}}
          trackStyle={{backgroundColor: '#242626', height: 4}}
          markerOffsetY={2}
          enableLabel={true}
          customLabel={CustomLabel}
          />
        </>}
      </View>
      <View style={styles.rangeTextContainer}>
        <Text style={styles.text}>{formatSeconds(values[0])}</Text>
        <Text style={styles.text}>{formatSeconds(values[1])}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  marker: {
    width: 10,
    height: 20,
    overflow: 'hidden',
    borderRadius: 2,
    backgroundColor: '#f1f1f1' //Comment out to reveal View.grip
  },
  grip: {
    width: '200%',
    height: '100%',
    backgroundColor: '#f1f1f1',
    position: 'absolute',
    borderRadius: 10,
  },
  text: {
    color: 'white',
    alignSelf:'center',
  },
  currentTime: {
    alignSelf: 'center',
    color: 'white',
    fontSize:20,
    marginBottom: 20,
  },
  rangeTextContainer: {
    flexDirection: 'row',
    justifyContent:'space-between',
    marginHorizontal: 16,
    top: -16,
  },
})

export default Slider;
