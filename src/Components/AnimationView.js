import React from 'react';
import * as Animatable from 'react-native-animatable';
import {
  custom,
  customX,
  customY,
  rotateDown,
  rotateUp
} from '../Theme';

const AnimationView = ({
  children,
  style = {},
  easing = "ease-in-out",
  type = "c",
  duration = 1000
}) => {

  return (
    <Animatable.View
      duration={duration}
      style={style}
      animation={
        type == "x" ? customX :
          type == "y" ? customY :
            type == "d" ? rotateDown :
              type == "u" ? rotateUp :
                custom
      }
      easing={easing}
      delay={0}
      useNativeDriver={true}
    >
      {children}
    </Animatable.View>
  )
}

export default AnimationView;