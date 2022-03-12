import React from 'react'
import PropTypes from 'prop-types'
import { View, Image } from 'react-native'
import { Images } from '../Theme'

const Brand = ({ height, width, mode }) => {

  return (
    <View style={{ height, width }}>
      <Image style={{
        height: '100%',
        width: '100%'
      }} source={Images.logo} resizeMode={mode} />
    </View>
  )
}

Brand.propTypes = {
  height: PropTypes.number,
  mode: PropTypes.oneOf(['contain', 'cover', 'stretch', 'repeat', 'center']),
  width: PropTypes.number,
}

Brand.defaultProps = {
  height: 200,
  mode: 'contain',
  width: 200,
}

export default Brand
