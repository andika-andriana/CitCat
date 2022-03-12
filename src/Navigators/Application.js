import React from 'react'
import {
  SafeAreaView,
  StyleSheet
} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { navigationRef } from './utils'
import { HomeScreen } from '../Containers'

const Stack = createStackNavigator()

// @refresh reset
const ApplicationNavigator = () => {

  return (
    <SafeAreaView style={styles.root}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator>
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  )
}

export default ApplicationNavigator

const styles = StyleSheet.create({
  root: { flex: 1 },
})
