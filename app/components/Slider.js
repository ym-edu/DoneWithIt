import React, { useCallback } from 'react';
import { View } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { useLoop, useLoopUpdate } from '../hooks/useLoop';

function Slider() {
  const { duration, scrollEnabled } = useLoop();
  const { setValues } = useLoopUpdate();

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

  return (
    <View style={{alignSelf: 'center'}}>
      {duration && <MultiSlider
      min={0}
      max={duration}
      values={[0, duration]}
      minMarkerOverlapDistance={1}
      markerOffsetX={0}
      markerOffsetY={15}
      onValuesChangeStart={disableScroll}
      onValuesChangeFinish={onValuesChangeFinish}
      enabledTwo={true}
      allowOverlap={false}
      customMarkerLeft={() => (<View style={{width: 20, height: 20, backgroundColor: 'red'}}/>)}
      customMarkerRight={() => (<View style={{width: 20, height: 20, backgroundColor: 'yellow'}}/>)}
      isMarkersSeparated={true}
      trackStyle={{backgroundColor: 'pink'}}
      markerStyle={{backgroundColor: 'red'}}
      selectedStyle={{backgroundColor: 'blue'}}
      />}
    </View>
  );
}

export default Slider;
