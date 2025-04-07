import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const sections = [
  {
    title: "Select Place",
    icon: null,
    component: (<Text>Component 1</Text>),
  },
  {
    title: "Select Date and Time",
    icon: null,
    component: (<Text>Component 2</Text>),
  },
  {
    title: "Choose Car",
    icon: null,
    component: (<Text>Component 3</Text>),
  },
  {
    title: "Set Price",
    icon: null,
    component: (<Text>Component 4</Text>),
  },
];

const Add = () => {
  const [step, setStep] = React.useState(0);

  const prevStep = () => {
    if (step > 0) {
      setStep(prev => prev - 1);
    }
  };

  const nextStep = () => {
    const maxStep = 3;
    if (step < maxStep) {
      setStep(prev => prev + 1);
    }
  };

  const sectionData = sections[step];

  return (
    <View style={styles.root}>
      <Text>{sectionData.title}</Text>

      <View>
        <Text>(progress)</Text>
      </View>

      {sectionData.component}

      <TouchableOpacity>
        <Text>Next</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Add;

const styles = StyleSheet.create({
  root: {
    padding: 10,
  },

  title: {
    textAlign: "center",
  }
})