import React from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'
import Brand from '../Brand';
import { Colors } from '../../Theme'
import AnimationView from '../AnimationView';
import Gap from '../Gap';

const HomeHeaderComponent = () => {
  return (
    <View style={styles.rootContainer}>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <AnimationView type={'c'}>
            <Text style={styles.titleText}>Selamat Datang di CitCat</Text>
            <Text style={styles.subtitleText}>Kenali banyak jenis kucing</Text>
          </AnimationView>
          <Gap width={10} />
          <AnimationView type={'y'}>
            <Brand width={50} height={50} />
          </AnimationView>
        </View>
      </View >
    </View>
  )
}

export default HomeHeaderComponent

const styles = StyleSheet.create({
  rootContainer: { flex: 1 },
  container: {
    flex: 1,
    backgroundColor: Colors.blue,
    borderBottomStartRadius: 100
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  nameContainer: {
    flex: 4,
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginBottom: 10
  },
  avaContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleText: {
    fontSize: 20,
    color: Colors.white
  },
  subtitleText: {
    fontSize: 14,
    color: Colors.white
  }
})
