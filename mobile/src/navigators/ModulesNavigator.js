import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import ModulesScreen from '../screens/ModulesScreen'
import LeaveRequestScreen from '../screens/LeaveRequestScreen'
import AnnouncementsScreen from '../screens/AnnouncementsScreen'
import PaidAnnualLeaveRequestsScreen from '../screens/PaidAnnualLeaveRequestsScreen'
import UnpaidLeaveScreen from '../screens/UnpaidLeaveScreen'
import LeavesScreen from '../screens/LeavesScreen'

const Stack = createStackNavigator()

export default () => {
  return (
    <Stack.Navigator initialRouteName='Modules' headerMode='none'>
      <Stack.Screen name='Modules' component={ModulesScreen} />
      <Stack.Screen name='LeaveRequest' component={LeaveRequestScreen} />
      <Stack.Screen name='UnpaidLeave' component={UnpaidLeaveScreen} />
      <Stack.Screen name='Leaves' component={LeavesScreen} />
      <Stack.Screen name='PaidAnnualLeaveRequests' component={PaidAnnualLeaveRequestsScreen} />
      <Stack.Screen name='Announcement' component={AnnouncementsScreen} />
    </Stack.Navigator>
  )
}
