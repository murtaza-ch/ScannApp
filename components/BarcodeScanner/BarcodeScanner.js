import * as Permissions from 'expo-permissions';

import {Alert, Dimensions, Image, Keyboard, KeyboardAvoidingView, StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import {Button, Icon} from 'native-base'
import React, {useEffect, useState} from 'react';

import {BarCodeScanner} from 'expo-barcode-scanner';
import Modal from 'react-native-modal';
import {TextInput} from 'react-native-paper';

// import {EventRegister} from 'react-native-event-listeners';
// import {Permissions} from 'expo';

export function BarCodeScanners(props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const [isModalVisible, setModalVisible] = useState(false);

  const [text, setText] = useState('');
  const [disable, setDisable] = useState(false);
  const [visible, setVisible] = useState(true);

  // const setHandleTruck = () => {
  //   // setDisable(true);
  //   // setVisible(false);
  //   console.log(text);
  //   props.handleTruck(text);
  // }
  // if (!visible) {
  //   return null 
  // }
  
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    setScanned(true)
  };

  const closeModal = () =>{
    setModalVisible(!isModalVisible);
  }

    useEffect(() => {
      (async () => {
        const {status} = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
        // const permission = await Permissions.getAsync(Permissions.CAMERA)
        console.log(status);
      })();
    }, []);

  const handleBarCodeScanned = ({type, data}) => {
    setScanned(false);
    setModalVisible(!isModalVisible);
    // console.log(type, data);
    props.Scannedhandler(type, data, text);
    setText('');
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    
    <View>
    <View style={{flex:1, flexDirection:"column"}}>

    <View style={{flex:1,flexDirection:"row", justifyContent:"center"}}>
    <KeyboardAvoidingView behavior="height">
    <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
      <TextInput style={{width:210, height:55}}
        label=" Enter Truck Name"
        value={text}
        onChangeText={(text) => setText(text)}
      />
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    {/* </View> */}
    <Button style={{marginLeft:9,padding:40, height:55}} onPress={toggleModal}>
    <Text style={{color:"white"}}>SCAN</Text>
    </Button>
    </View>

    <View>
    <Button style={{marginTop:18,width:340, height:40,justifyContent:"center"}} onPress={()=>props.exportData()} disabled={disable}>
     <Text style={{color:'white'}}>Submit</Text>
     </Button>
    </View>

    <View style={{flex:1, justifyContent:"center",flexDirection:"row", alignItems:"center", bottom:0}}>
    <Text style={{paddingTop:4}}>POWERED BY </Text>
    <Text style={{fontStyle:"italic", fontSize:20, color:"#4615b2"}}> Blue</Text>
    <Text style={{fontStyle:"italic", fontSize:20, color:"green"}}>East</Text>
    </View>
    
    </View>

     <Modal isVisible={isModalVisible}>
     <View style={{flex: 1,justifyContent:"space-between",
     alignItems:"center", backgroundColor:"#ffffff", borderRadius:10, padding:10, }}>
     
     <View style={{flex:1,justifyContent:"flex-start",right:-130}}>
     <Button transparent style={{padding:20}} onPress={closeModal}>
     <Text style={{color:"gray"}}><Icon  name='ios-close-circle' style={{color:'gray'}}/></Text>
     </Button>
     </View>
     
      {scanned === true ? (
        
        <BarCodeScanner
          onBarCodeScanned={handleBarCodeScanned}
          style={{width:323, height:470}}
        />

      ) : null}
      <View style={{flex:1, justifyContent:"center",flexDirection:"row", alignItems:"center"}}>
        <Text>POWERED BY </Text>
        <Image style={{width:35, height:35, borderRadius:50}} source={require('../../assets/blueeast.png')}/>
        </View>
      </View>
      </Modal>
      {/* {scanned === false ? (
        <Button
          id="scanBtn"
          title={'Tap to Scan'}
          onPress={() => setScanned(true)}
        />
      ) : null} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:"center",
    justifyContent:"center"
  }
})