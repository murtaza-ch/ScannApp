import {Alert, Image, Keyboard, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import {Button, CheckBox, Content, Icon, Segment} from 'native-base';
import React,{useState} from 'react';

import {DataTable} from 'react-native-paper';
import Modal from 'react-native-modal';

export function DataTables(props) {
  const {data} = props;
  const [list, setList] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState(null);
  // const [allSelected, setAllSelected] = useState(false);
  // const [deleteArray, setDelArray] = useState([]);
  
  React.useEffect(() => {
    setList(data);
  },[data]);
  
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const closeModal = () =>{
    setModalVisible(!isModalVisible);
  }

  const deleteItem = (id) => {
    // console.log(id);
    // const Data = data.filter((v,index) => index !== id)
    // let arr = list;
    // arr.splice(id,1);
    // setList(arr);
    props.DeleteItem(id);
  }

  const deleteAllItems = () => {
    props.DeleteAll();
    setModalVisible(!isModalVisible);
  }

  // const selectAnItem = (index) => {
  //   let arr = deleteArray;
  //   let itemIndex = arr.indexOf(index);
  //   if (arr.includes(index)) {
  //     arr.splice(itemIndex, 1);
  //     setAllSelected(!allSelected);
  //   }
  //   else {
  //     arr.push(index);
  //   }
  //   setDelArray(arr);
  // }

  // const selectAll = ()=> {
  //   let arr = [];
  //   for(let i=0; i < list.length;i++) {
  //     if (!allSelected) {
  //       arr.push(i);
  //     }
  //     else if (allSelected){
  //       arr = [];
  //     }

  //     setDelArray(arr);
  //     setAllSelected(!allSelected);
  //   }
    
  // }

  const Load = (list) => { 
    return (
      list &&
        list.length > 0 &&
        list.map((item, index) => (
          <DataTable.Row key={index}>
            {/* <DataTable.Cell>
            <View style={{flex:1,justifyContent:"center", alignItems:"center",flexDirection:"row"}}>
            <View style={{marginRight:20}}>
            <CheckBox onPress={()=> selectAnItem(index)} checked={deleteArray.includes(index)}/>
            </View>
            <View>
            <Text>{index}</Text>
            </View>
            </View>
            </DataTable.Cell> */}
            <DataTable.Cell>{index}</DataTable.Cell>
            {/* <DataTable.Cell style={{width:50}}>{index}</DataTable.Cell> */}
            <DataTable.Cell style={{flex:1, justifyContent:"flex-start"}}>{item.code}</DataTable.Cell>
            <DataTable.Cell style={{flex:1, justifyContent:"center",alignItems:"flex-end",paddingTop:7}}><Button danger onPress={() => deleteItem(item.id)}><Icon name="trash"/></Button></DataTable.Cell>
          </DataTable.Row>
    )))
  }
  
  // Alert.alert('table');
  return (
    <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
    <View style={styles.container}>
    <View style={{flex:1, justifyContent:"center",flexDirection:"row", alignItems:"center"}}>
        <Image style={{width:90, height:35, borderRadius:4,marginBottom:3}} source={require('../../assets/blueeast.png')}/>
    </View>
       
      <DataTable>
        <DataTable.Header>
          <DataTable.Title style={{flex:1, justifyContent:"flex-start"}}>No</DataTable.Title>
          <DataTable.Title style={{flex:1, justifyContent:"center"}}>Batch Number</DataTable.Title>
          <DataTable.Title style={{flex:1, justifyContent:"center"}}>Action</DataTable.Title>
        </DataTable.Header>

        <ScrollView>
        {Load(list)}
        </ScrollView>

  
    <Modal isVisible={isModalVisible}>
     <View style={{flex: 1,justifyContent:"space-between",
     alignItems:"center", backgroundColor:"#ffffff", borderRadius:10, padding:10, }}>
       
       <View style={{flex:1,justifyContent:"center"}}>
        <Text>{`Are you sure to want to delete this item NO:${id} ?`}</Text>
        <View style={{flexDirection:"row", justifyContent:"space-around"}}>
         <Button warning style={{width:50,justifyContent:"center"}} onPress={closeModal}><Text>NO</Text></Button>
         <Button danger style={{width:50, justifyContent:"center"}} onPress={deleteAllItems}><Text>YES</Text></Button>
        </View>
       </View>
        
      </View>
      </Modal>
      {/* <Segment style={{backgroundColor:"#ffffff"}}> */}
          {/* <Button first style={{padding:10}}>
            <Text>Delete Selected</Text>
          </Button> */}
          {/* <Button style={{padding:10}} onPress={()=> selectAll()}>
            <Text>{ allSelected ? 'Unselect All' : 'Select All'}</Text>
          </Button> */}
          { list && list.length > 0 &&
          <View>
          <Button style={{padding:10,width:332, height:30, marginLeft:16,margin:10,justifyContent:"center"}} onPress={toggleModal}>
            <Text>Delete All</Text>
          </Button>
          </View>
          }
        {/* </Segment> */}
      </DataTable>
    </View>
    </TouchableWithoutFeedback>
    
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    //  flex: 1,
    // backgroundColor: '#fff',
    justifyContent: 'flex-end',
  },
});
