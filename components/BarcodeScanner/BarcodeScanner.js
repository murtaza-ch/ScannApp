import * as Permissions from 'expo-permissions';

import {Button, Footer} from 'native-base'
import {Keyboard, KeyboardAvoidingView, Text, TouchableWithoutFeedback, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import {BarCodeScanner} from 'expo-barcode-scanner';
import Modal from 'react-native-modal';
import {TextInput} from 'react-native-paper';

export function BarCodeScanners(props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const [isModalVisible, setModalVisible] = useState(false);

  const [text, setText] = useState('');
  // const [disable, setDisable] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(()=> {
    setVisible(props.disable)
  });

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
    <>
      <Footer style={{ flex: 1, flexDirection: "column", padding: 10,height:300, backgroundColor:"white"}}>
        <View style={{ flexDirection: "row" }}>
        <KeyboardAvoidingView behavior="height">
    <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
      <TextInput style={{width:180, height:55}}
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
    
    <View style={{flex:1, justifyContent:"flex-start"}}>
    <Button style={{marginTop:18,width:300, height:40,justifyContent:"center"}} onPress={()=>props.exportData()}>
     <Text style={{color:'white'}}>Submit</Text>
     </Button>
    </View>

    {/* <View style={{flex:1, justifyContent:"center",flexDirection:"row", alignItems:"flex-start", bottom:0}}>
    <Text style={{paddingTop:4}}>POWERED BY</Text>
    <Text style={{fontStyle:"italic", fontSize:20, color:"#4615b2"}}> Blue</Text>
    <Text style={{fontStyle:"italic", fontSize:20, color:"green"}}>East</Text>
    </View> */}
    
    </Footer>

     <Modal isVisible={isModalVisible}>
     <View style={{flex: 1,justifyContent:"space-between",
     alignItems:"center", backgroundColor:"#ffffff", borderRadius:10, padding:10, }}>
     
     <View style={{flex:1,justifyContent:"center", flexDirection:"row",alignItems:"center"}}>
    
     <Text style={{paddingTop:3}}>POWERED BY </Text>
     <Text style={{fontStyle:"italic", fontSize:20, color:"#4615b2"}}>Blue</Text>
    <Text style={{fontStyle:"italic", fontSize:20, color:"green"}}>East</Text>
     </View>
     
      {scanned === true ? (
        
        <BarCodeScanner
          onBarCodeScanned={handleBarCodeScanned}
          style={{width:340, height:380}}
        />

      ) : null}
      <View style={{flex:1, justifyContent:"center",flexDirection:"row", alignItems:"center"}}>
      <Button style={{padding:20, height:35,margin:6, width:100,justifyContent:"center"}} onPress={closeModal}>
     <Text style={{color:"white"}}>CLOSE</Text>
     </Button>
      </View>
      </View>
      </Modal>
      </>
  );
}
