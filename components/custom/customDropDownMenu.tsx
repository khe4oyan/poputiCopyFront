import { StyleSheet, Text, TouchableWithoutFeedback, View, Image } from 'react-native'
import React from 'react'
import Skeleton from '../skeleton';

type customInputProps = {
  valueIndex: any,
  setValueIndex: any,
  options: Array<string>,
  title?: string | number,
};

const CustomDropDownMenu = ({ title, options, valueIndex, setValueIndex }: customInputProps) => {
  const [isOptionsOpened, setIsOptionsOpened] = React.useState(false);

  const openToggle = () => {
    setIsOptionsOpened(prev => !prev);
  };

  const selectOption = (ind: number) => {
    setValueIndex(ind);
    setIsOptionsOpened(false);
  }

  return (
    <>
    <View style={styles.root}>
      {title && <Text style={styles.title}>{title}</Text>}
      <TouchableWithoutFeedback onPress={openToggle} >
        <View style={styles.box}>
          <View style={styles.content} >
            <Text>{options[valueIndex]}</Text>
          </View>
          <Image 
            width={20}
            height={10}
            source={{uri: "https://www.iconpacks.net/icons/2/free-arrow-down-icon-3101-thumb.png"}}
          />
        </View>
      </TouchableWithoutFeedback>
      {
        isOptionsOpened &&
        <View style={styles.options}>
          {
            options.map((item, ind) =>
              <TouchableWithoutFeedback key={ind} onPress={() => selectOption(ind)}>
                <Text style={styles.box} >{item}</Text>
              </TouchableWithoutFeedback>
            )
          }
        </View>
      }
    </View>
    </>
  )
}

export default CustomDropDownMenu;

const styles = StyleSheet.create({
  root: {
    position: "relative",
  },

  title: {
    color: "#ff4e00",
    marginBottom: 4,
  },

  box: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "white",
    borderColor: "#ff4e00",
    color: "#ff4e00",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  content: {},

  options: {
    padding: 10,
    backgroundColor: "white",
    flexDirection: "column",
    gap: 10,
  },
})