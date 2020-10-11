import {Button, TextInput} from 'react-native-paper';
import {Keyboard, StyleSheet, TouchableWithoutFeedback, View} from 'react-native';

import React from 'react';

export function Home(props) {
  const [text, setText] = React.useState('');
  const [disable, setDisable] = React.useState(false);
  const [visible, setVisible] = React.useState(true);

  const setHandleTruck = () => {
    props.handleTruck(text);
    setDisable(true);
    setVisible(false);
  }
  if (!visible) {
    return null 
  }

  return (
    <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
    <View style={styles.container}>
      <TextInput style={{width:250}}
        label=" Enter Truck Name"
        value={text}
        onChangeText={(text) => setText(text)}
      />
      <Button style={{borderWidth:2, padding:8, marginLeft:4, paddingTop:13, paddingBottom:13}} disabled={disable} onPress={setHandleTruck}>Submit</Button>
    </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    //  flex: 1,
    flexDirection:"row",
    // backgroundColor: '#fff',
    justifyContent: "center",
    alignItems:"center"
  },
});