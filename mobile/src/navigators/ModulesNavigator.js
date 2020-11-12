import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import ModulesScreen from '../screens/ModulesScreen'
import LeaveScreen from '../screens/LeaveScreen'
import AnnouncementsScreen from '../screens/AnnouncementsScreen'
import PastLeavesScreen from '../screens/PastLeavesScreen'
import PaidAnnualLeaveRequestsScreen from '../screens/PaidAnnualLeaveRequestsScreen'
import UnpaidLeaveScreen from '../screens/UnpaidLeaveScreen'

const Stack = createStackNavigator()

export default () => {
  return (
    <Stack.Navigator initialRouteName='Modules' headerMode='none'>
      <Stack.Screen name='Modules' component={ModulesScreen} />
      <Stack.Screen name='Leave' component={LeaveScreen} />
      <Stack.Screen name='UnpaidLeave' component={UnpaidLeaveScreen} />
      <Stack.Screen name='PastLeaves' component={PastLeavesScreen} />
      <Stack.Screen name='PaidAnnualLeaveRequests' component={PaidAnnualLeaveRequestsScreen} />
      <Stack.Screen name='Announcement' component={AnnouncementsScreen} />
    </Stack.Navigator>
  )
}
