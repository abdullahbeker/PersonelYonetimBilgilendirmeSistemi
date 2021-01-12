import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import ProfileScreen from '../screens/ProfileScreen'
import SettingsScreen from '../screens/SettingsScreen'

import ModulesNavigator from './ModulesNavigator'
import { colors } from '../custom/Theme'

const Tabs = createBottomTabNavigator()

export default () => {
  return (
    <Tabs.Navigator
      initialRouteName='Modules'
      tabBarOptions={{
        activeTintColor: colors.primary,
        inactiveTintColor: colors.secondary,
        showLabel: false
      }}>
      <Tabs.Screen
        name='Profile'
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name='ios-person' color={color} size={size} />
          }
        }}
        component={ProfileScreen}
      />
      <Tabs.Screen
        name='Modules'
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return <Ionicons name={'ios-list'} color={color} size={size} />
          }
        }}
        component={ModulesNavigator}
      />
      <Tabs.Screen
        name='Settings'
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name='ios-settings' color={color} size={size} />
          }
        }}
        component={SettingsScreen}
      />
    </Tabs.Navigator>
  )
}
