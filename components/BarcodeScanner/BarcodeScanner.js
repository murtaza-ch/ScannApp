import * as Permissions from 'expo-permissions';

import {Alert, Button, Dimensions, Image, Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import {BarCodeScanner} from 'expo-barcode-scanner';
import Modal from 'react-native-modal';

// import {EventRegister} from 'react-native-event-listeners';
// import {Permissions} from 'expo';

export function BarCodeScanners(props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const [isModalVisible, setModalVisible] = useState(false);
  
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
//   useEffect(() => {
//     const view = refKey.current;
//     view.addEventListener('scanBtn', eventhandler);
//     return () => {
//       view.removeEventListener('scanBtn', eventhandler);
//     };
//   }, []);

//   function eventhandler(e) {
//     if (e.target.getAttribute('id') === 'scanBtn') {
//       if (e.code === 'Enter') {
//         console.log('Works');
//       }
//     }
//   }

  const handleBarCodeScanned = ({type, data}) => {
    setScanned(false);
    setModalVisible(!isModalVisible);
    // console.log(type, data);
    props.Scannedhandler(type, data);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
    <View>
      <Button
          id="scanBtn"
          title={'TAP TO SCAN'}
          onPress={toggleModal}
      />
     <Modal isVisible={isModalVisible}>
     <View style={{flex: 1,justifyContent:"space-between",
     alignItems:"center", backgroundColor:"#ffffff", borderRadius:10, padding:10, }}>
     <View style={{flex:1,justifyContent:"center"}}><Button title="CLOSE" onPress={closeModal}/></View>
      {scanned === true ? (
        
        <BarCodeScanner
          onBarCodeScanned={handleBarCodeScanned}
          style={{width:323, height:470}}
        />

      ) : null}
      <View style={{flex:1, justifyContent:"center",flexDirection:"row", alignItems:"center"}}>
        <Text>POWERED BY </Text>
        <Image style={{width:35, height:35, borderRadius:50}} source={require('../../assets/blueeast.png')}/></View>
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
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:"center",
    justifyContent:"center"
  }
})