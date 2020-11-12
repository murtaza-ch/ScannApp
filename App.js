import {Alert, Keyboard, TouchableWithoutFeedback, View} from 'react-native';
import { Body, Container, Header, Left, Right, Title } from 'native-base';

import {BarCodeScanners} from './components/BarcodeScanner/BarcodeScanner.js';
import {DataTables} from './components/Table/table.js';
// import {Home} from './components/Home/home.js';
import React from 'react';
import {Text} from 'react-native';
import axios from 'axios';

// let Data = [];
export default function App() {
  const [data, setData] = React.useState([]);
  const [truckname, setTruck] = React.useState('');
  const [error, setError] = React.useState(null);
  const [disable, setDisable] = React.useState(false);
  
  const Scannedhandler = (type, code, truck) => {

    const barCode = code.toString();
    if( truck !== ''){
    setTruck(truck)
    }
    const keyGen = () => {
      return Math.random().toString(16).slice(-4)
    }
    const id = keyGen();
    // console.log(id);
    const obj = {
      id:id,
      code:code,
    };

    const body = {
      bapiName: "ZBAPI_BATCH_SCANNING_CHECK",
      credentials: {
        user: "mm-01",
        passwd: "sapqmmm",
        ashost: "172.20.0.5",
        sysnr: "00",
        client: "600",
        lang: "EN"
      },
      items: [
        {
          CHARG: barCode
        }
      ],
      userName:"orient"
    };

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const code1 = data.find((d) => d.code === code);
    if (code1 === undefined) {
      // axios.post('http://18.195.33.234:3000/submit-data', JSON.stringify(body),config)
      // .then((res)=> console.log(res.data))
      // .catch((err)=> console.log(err));
      setError(null)
      setData([...data, obj]);
    }
    // if (code1 !== undefined) {
    //   setError('Item already scanned!');
    // }
    // if (error) {
    //   Alert.alert(
    //     "Warning",
    //     "This Item already scanned!",      
    //     { cancelable: true }
    //   );
    // }
     
  };
  
  const exportData = () => {
    setDisable(!disable);
    var today = new Date();
    let h = today.getHours().toString();
    let m = today.getMinutes().toString();
    let s = today.getSeconds().toString();
    if(h.length === 1) {
      h = '0'+''+h;
    }
    if(m.length === 1) {
      m = '0'+''+m;
    }
    if(s.length === 1) {
      s = '0'+''+s;
    }

    const time = h+''+m+''+s
    // console.log(time);
    // console.log('---',h,m,s);
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '' + mm + '' + dd;
    let arrr = []
    data.forEach((obj) => {
      const obj1 = {
        "BATCHNO": obj.code,
        "TREGNO": truckname,
        "UPLDATE": today,
        "UPLTIME": time,
      }
      arrr.push(obj1)
    });
    const body = {
      "bapiName": "ZBAPI_BATCH_SCANNING_SAVE2",
      "credentials": {
        "user": "mm-01",
        "passwd": "sapqmmm",
        "ashost": "172.20.0.5",
        "sysnr": "00",
        "client": "600",
        "lang": "EN"
      },
      "items": arrr,
      "userName":"orient"
    };
    console.log(body);

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    // console.log(body);
    axios.post('http://18.195.33.234:3000/submit-data', JSON.stringify(body),config)
    .then((res)=>{
      Alert.alert(
        "Success",
        "Saved successfully!",
        [
          { text: "OK"}
        ],
        { cancelable: false }
      );
      setData([]);
      console.log(res.data)
    })
    .catch((err)=> {
      
      console.log(err)
    });
    setDisable(!disable)
  }

  
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
    // <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
    <View style={{flex:1, flexDirection:"column"}}>
      <View style={{flex:3, marginBottom:5}}>
        <DataTables data={data} DeleteItem = {DeleteItem} DeleteAll = {DeleteAll} />
      </View>

      <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
        {/* <Home handleTruck = {handleTruck} /> */}
        <BarCodeScanners disable={disable} key={data} exportData = {exportData} handleTruck = {handleTruck} Scannedhandler={Scannedhandler} />
      </View>
    </View>
    // </TouchableWithoutFeedback>
  );
}
