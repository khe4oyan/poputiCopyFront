import { View, ActivityIndicator } from 'react-native'
import React from 'react'

const Skeleton = ({
  width = 50,
  height = 50,
  radius = 5,
  color = '#0004',
  styles = null,
  indicatorColor = null
}: any) => {
  const mainStyles = {
    width: width,
    height: height,
    borderRadius: radius,
    backgroundColor: color,
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <View style={[mainStyles, styles && styles]}>
      {indicatorColor && <ActivityIndicator size="small" color={indicatorColor} />}
    </View>
  );
}

export default Skeleton
