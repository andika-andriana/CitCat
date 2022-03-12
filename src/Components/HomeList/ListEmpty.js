import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Colors } from '../../Theme'

const ListEmptyComponent = () => {
  return (
    <View style={styles.listEmpty}>
      <Text style={styles.listEmptyText}>Data tidak ditemukan</Text>
    </View>
  )
}

export default ListEmptyComponent

const styles = StyleSheet.create({
  listEmpty: {
    marginTop: 25
  },
  listEmptyText: {
    color: Colors.white,
    fontSize: 16,
    textAlign: 'left',
    paddingHorizontal: 10,
  },
})
