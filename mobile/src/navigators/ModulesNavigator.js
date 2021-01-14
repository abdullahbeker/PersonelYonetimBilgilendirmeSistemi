import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import ModulesScreen from '../screens/ModulesScreen'
import LeaveRequestScreen from '../screens/LeaveRequestScreen'
import AnnouncementsScreen from '../screens/AnnouncementsScreen'
import TrainingsScreen from '../screens/TrainingsScreen'
import LeavesScreen from '../screens/LeavesScreen'

const Stack = createStackNavigator()

export default () => {
  return (
    <Stack.Navigator initialRouteName='Modules' headerMode='none'>
      <Stack.Screen name='Modules' component={ModulesScreen} />
      <Stack.Screen name='LeaveRequest' component={LeaveRequestScreen} />
      <Stack.Screen name='Leaves' component={LeavesScreen} />
      <Stack.Screen name='Trainings' component={TrainingsScreen} />
      <Stack.Screen name='Assets' component={AnnouncementsScreen} />
    </Stack.Navigator>
  )
}
