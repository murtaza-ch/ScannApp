import {Keyboard, TouchableWithoutFeedback, View} from 'react-native';

import {BarCodeScanners} from './components/BarcodeScanner/BarcodeScanner.js';
import {DataTables} from './components/Table/table.js';
import {Home} from './components/Home/home.js';
import React from 'react';

// let Data = [];
export default function App() {
  const [data, setData] = React.useState([]);
  const [truck, setTruck] = React.useState('');
  
  const Scannedhandler = (type, code) => {

    const keyGen = () => {
      return Math.random().toString(16).slice(-4)
    }
    const id = keyGen();
    console.log(id);
    const obj = {
      id:id,
      code:code,
      truck:truck
    };
    setData([...data, obj]);
  };

  const DeleteItem = (id) => {
    setData(data.filter(user => user.id !== id));
  }

  const DeleteAll = () => {
    setData([]);
  }
  
  const handleTruck = (name) => {
    setTruck(name);
  }
  
  return (
    <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
    <>
    <View style={{flex:1, flexDirection:"column", padding:6}}>
      <View style={{flex:3, marginBottom:5,paddingTop:6}}>
        <DataTables data={data} DeleteItem = {DeleteItem} DeleteAll = {DeleteAll} />
      </View>

      <View>
        <Home handleTruck = {handleTruck} />
        <BarCodeScanners key={data} Scannedhandler={Scannedhandler} />
      </View>
    </View>
    </>
    </TouchableWithoutFeedback>
  );
}
