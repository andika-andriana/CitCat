import React from 'react'
import {
  StyleSheet,
  TextInput,
  View,
  Image,
  TouchableOpacity
} from 'react-native'
import { Images, Colors } from '../../Theme'

const HomeSearchComponent = ({
  value,
  setValue,
  onClear,
  onSearch
}) => {
  return (
    <View style={styles.contentHeaderContainer}>
      <View style={styles.textInputContainer}>
        <TextInput
          placeholder={'Cari ...'}
          autoCapitalize={'none'}
          autoComplete={'off'}
          autoCorrect={false}
          autoFocus={false}
          style={styles.input}
          onChangeText={setValue}
          value={value}
        />

        {
          value ? (
            <TouchableOpacity onPress={onClear}>
              <Image source={Images.clear} style={styles.iconClear} resizeMode={'contain'} />
            </TouchableOpacity>
          ) : null
        }
      </View>
      <TouchableOpacity onPress={onSearch} disabled={value ? false : true} >
        <View style={[styles.buttonSearch, { opacity: value ? 1 : 0.5 }]}>
          <Image source={Images.search} style={styles.iconSearch} resizeMode={'contain'} />
        </View>
      </TouchableOpacity >
    </View >
  )
}

export default HomeSearchComponent

const styles = StyleSheet.create({
  contentHeaderContainer: {
    flexDirection: 'row',
    padding: 10
  },
  textInputContainer: {
    flex: 1,
    height: 50,
    backgroundColor: Colors.background,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.opacity,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 16,
    color: Colors.text
  },
  buttonSearch: {
    backgroundColor: Colors.blue,
    borderRadius: 10,
    marginLeft: 10,
    paddingHorizontal: 5
  },
  iconSearch: {
    width: 45,
    height: 45
  },
  iconClear: {
    width: 20,
    height: 20
  }
})
