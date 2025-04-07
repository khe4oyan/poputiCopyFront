import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

import NewRideStep_1 from '@/components/newRideStep_1';
import NewRideStep_2 from '@/components/newRideStep_2';
import NewRideStep_3 from '@/components/newRideStep_3';
import NewRideStep_4 from '@/components/newRideStep_4';


const sections = [
  "Select Place",
  "Select Date and Time",
  "Choose Car",
  "Set Price",
];

const Add = () => {
  const [step, setStep] = React.useState(0);
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(false);

  const nextStep = () => {
    const sectionsCount = sections.length - 1;
    if (step < sectionsCount) {
      setStep(prev => prev + 1);
    } else {
      // TODO: send data to server
      setStep(0);
    }
  };

  return (
    <View style={styles.root}>
      <Text style={styles.title}>{sections[step]}</Text>

      <View style={styles.progress}>
        {sections.map((_, ind) =>
          <Text key={ind} style={ind <= step && styles.activeSection}>{ind + 1}</Text>
        )}
      </View>

      {step === 0 && <NewRideStep_1 nextStep={nextStep} />}
      {step === 1 && <NewRideStep_2 nextStep={nextStep} />}
      {step === 2 && <NewRideStep_3 nextStep={nextStep} />}
      {step === 3 && <NewRideStep_4 nextStep={nextStep} />}

      <TouchableOpacity style={[styles.nextButton, isNextButtonDisabled && styles.nextButtonDisabled]} disabled={isNextButtonDisabled} onPress={nextStep} >
        <Text style={styles.nextButtonText}>{step < sections.length - 1 ? "Next" : "Save"}</Text>
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
  },

  progress: {
    marginTop: 20,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-around",
  },

  activeSection: {
    color: "red",
    fontWeight: 900,
  },

  nextButton: {
    backgroundColor: "#ff4e00",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },

  nextButtonDisabled: {
    backgroundColor: "gray",
  },

  nextButtonText: {
    color: "white",
    fontSize: 18,
    textTransform: "uppercase",
    textAlign: "center",
  },
})