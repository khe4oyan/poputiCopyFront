import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Skeleton from './skeleton'

const TrafficCard = ({ onDelete }: { onDelete: () => void }) => {
  return (
    <View style={styles.root}>
      <View style={styles.infoContainer}>
        <View style={styles.leftSection}>
          <View>
            <Text style={styles.boldText}>Metsamor, Armenia</Text>
            <Text style={styles.boldText}>Kilikia Bus Station, Yerevan, Armenia</Text>
          </View>
          <Text style={styles.opacityText}>29-01-2025 | 09:30</Text>
          <Text style={styles.opacityText}>4 free seats</Text>
          <View style={styles.prohibitedContainer}>
            <Skeleton width={20} height={20} radius={20} />
            <Skeleton width={20} height={20} radius={20} />
            <Skeleton width={20} height={20} radius={20} />
            <Skeleton width={20} height={20} radius={20} />
          </View>
          <Text style={styles.opacityText}>Opel</Text>
        </View>
        <View style={styles.rightSection}>
          <Skeleton width={50} height={50} radius={50} />
          <Text style={styles.fullName}>Name Surname</Text>
          <Text style={styles.price}>600 AMD</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
        <Text style={[styles.boldText, styles.statusText]}>Active</Text>
      </View>
    </View>
  )
}

export default TrafficCard

const styles = StyleSheet.create({
  root: {
    padding: 15,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 10,
    shadowOpacity: .1,
    marginBottom: 15,
  },

  boldText: {
    fontWeight: 700,
  },
  opacityText: {
    color: "#646464",
  },

  infoContainer: {
    flexDirection: "row",
    gap: 40,
  },

  leftSection: {},
  rightSection: {
    flex: 1,
    alignItems: "center",
  },

  fullName: {
    fontWeight: 500,
  },

  price: {
    fontWeight: 500,
    color: "#ff4e00",
  },

  prohibitedContainer: {
    marginTop: 10,
    flexDirection: "row",
    gap: 10,
  },

  footer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  deleteButton: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    paddingLeft: 30,
    paddingRight: 30,
    borderColor: "red",
  },
  deleteButtonText: {
    color: "red",
  },
  statusText: {
    color: "#ff4e00",
    paddingRight: 20,
  }
})
