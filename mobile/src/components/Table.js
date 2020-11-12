import React from 'react'
import { StyleSheet, View } from 'react-native'
import { colors } from '../custom/Theme'
import { nanoid } from 'nanoid/non-secure'

const Table = ({ rows, cols, tableContainerStyles, thStyles, trStyles }) => {
  trStyles = StyleSheet.flatten([styles.tr, trStyles])
  thStyles = StyleSheet.flatten([styles.th, thStyles])
  if (rows)
    return (
      <View style={tableContainerStyles}>
        <View style={trStyles}>
          {rows.map(row => {
            return (
              <View style={thStyles} key={nanoid()}>
                {row}
              </View>
            )
          })}
        </View>
        {cols && (
          <View style={styles.tbody}>
            {cols.map(col => {
              return (
                <View style={trStyles} key={nanoid()}>
                  {col.map(c => {
                    return (
                      <View style={styles.td} key={nanoid()}>
                        {c}
                      </View>
                    )
                  })}
                </View>
              )
            })}
          </View>
        )}
      </View>
    )
  else return <></>
}

const styles = StyleSheet.create({
  tr: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
    alignSelf: 'stretch'
  },
  th: {
    flex: 1,
    alignSelf: 'stretch',
    minWidth: 85,
    paddingVertical: 10,
    backgroundColor: colors.primaryLight
  },
  td: {
    flex: 1,
    alignSelf: 'stretch',
    paddingVertical: 10,
    minWidth: 85
  },
  tbody: {
    marginTop: 5
  }
})

export default Table
