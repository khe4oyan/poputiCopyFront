import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import NewRideStep_1 from '@/components/newRideStep_1';
import NewRideStep_2 from '@/components/newRideStep_2';
import NewRideStep_3 from '@/components/newRideStep_3';
import NewRideStep_4 from '@/components/newRideStep_4';
import { useSelector, useDispatch } from 'react-redux';
import { clearRide } from '@/store/slices/newRideSlice';
import useToken from '@/customHooks/useToken';

const Add = () => {
  const { t } = useTranslation();

  const sections = [
    t('selectPlace'),
    t('selectDateTime'),
    t('chooseCar'),
    t('setPrice'),
  ];

  const [step, setStep] = React.useState(0);
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);
  const dispatch = useDispatch();
  const newRideData = useSelector((s: any) => s.newRideSlice);
  const [token, _, __, navigateToAuth] = useToken();

  useLayoutEffect(() => {
    let timer = null;

    if (token === '') {
      timer = setTimeout(() => {
        navigateToAuth();
      }, 100);
    }

    return () => {
      if (timer !== null) {
        clearTimeout(timer);
      }
    };
  }, [token]);

  const nextStep = () => {
    const sectionsCount = sections.length - 1;
    if (step < sectionsCount) {
      setStep(prev => prev + 1);
    } else {
      // TODO: send newRideData to server
      Alert.alert(t('success'), t('newRideAdded'));
      dispatch(clearRide());
      setStep(0);
    }

    setIsNextButtonDisabled(true);
  };

  return (
    <ScrollView style={styles.root}>
      <Text style={styles.title}>{sections[step]}</Text>

      <View style={styles.progress}>
        {sections.map((_, ind) => (
          <Text key={ind} style={ind <= step && styles.activeSection}>{ind + 1}</Text>
        ))}
      </View>

      {step === 0 && <NewRideStep_1 setIsNextButtonDisabled={setIsNextButtonDisabled} />}
      {step === 1 && <NewRideStep_2 setIsNextButtonDisabled={setIsNextButtonDisabled} />}
      {step === 2 && <NewRideStep_3 setIsNextButtonDisabled={setIsNextButtonDisabled} />}
      {step === 3 && <NewRideStep_4 setIsNextButtonDisabled={setIsNextButtonDisabled} />}

      <TouchableOpacity
        style={[styles.nextButton, isNextButtonDisabled && styles.nextButtonDisabled]}
        disabled={isNextButtonDisabled}
        onPress={nextStep}
      >
        <Text style={styles.nextButtonText}>
          {step < sections.length - 1 ? t('next') : t('save')}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Add;

const styles = StyleSheet.create({
  root: {
    padding: 10,
    marginBottom: 90,
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
    fontWeight: "900",
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
});
