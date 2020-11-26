import { Alert, ScrollView, Text, View } from 'react-native';
import { Body, Button, CheckBox, Container, Content, Header, Icon, Left, Right, Title } from 'native-base';
import React, { useState } from 'react';

import { DataTable } from 'react-native-paper';
import Modal from 'react-native-modal';

export function DataTables(props) {
  const { data } = props;
  const [list, setList] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState(null);
  const [selectAll, setSelectAll] = useState(false);


  React.useEffect(() => {
    setList(data);
  }, [data]);

  const toggleModal = (id) => {
    Alert.alert(
      "DELETE",
      "Do you want to delete this item?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => deleteItem(id) }
      ],
      { cancelable: false }
    );

    // setModalVisible(!isModalVisible);
  };

  const toggleDeleteAll = () => {
    Alert.alert(
      "DELETE",
      "Do you want to delete all items?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => deleteAllItems() }
      ],
      { cancelable: false }
    );

  };

  const closeModal = () => {
    setModalVisible(!isModalVisible);
  }

  const deleteItem = (id) => {

    props.DeleteItem(id);
  }

  const deleteAllItems = () => {
    props.DeleteAll();
    setSelectAll(!selectAll);
  }


  const Load = (list) => {
    return (
      list &&
      list.length > 0 &&
      list.map((item, index) => (
        // <View>
        <DataTable.Row key={index}>
          <DataTable.Cell style={{ justifyContent: "flex-start" }}>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
              <View style={{ marginRight: 20 }}>
                <CheckBox color="green" style={{ borderColor: 'white' }} checked={selectAll} />
              </View>
              <View>
                <Text>{index}</Text>
              </View>
            </View>
          </DataTable.Cell>

          <DataTable.Cell style={{ justifyContent: "center" }}><Text style={{ fontSize: 10 }}>{item.code}</Text></DataTable.Cell>
          <DataTable.Cell style={{ justifyContent: "flex-end", paddingTop: 7 }}><Button transparent onPress={() => toggleModal(item.id)}><Icon name="trash" style={{ fontSize: 20, color: '#808080' }} /></Button></DataTable.Cell>
        </DataTable.Row>
        // </View>
      )))
  }

  // Alert.alert('table');
  return (
    // <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
    <Container>
      <Header style={{ height: 80 }}>
        <Left />
        <Body>
          <View style={{ flex: 1, justifyContent: "center", marginRight: 10 }}>
            <Title>
              <Text style={{ fontSize: 20, color: "black" }}>Batch Scanning App</Text>
            </Title>

            <View style={{ flex: 1, justifyContent: "center", flexDirection: "row", alignItems: "center" }}>

              <View>
                <View style={{ flexDirection: "row", alignItems: "center", marginRight: 20 }}>
                  <CheckBox style={{ marginRight: 15 }} color="green" onPress={() => setSelectAll(!selectAll)} checked={selectAll} />
                  <Text style={{ color: "black", fontSize: 15 }}>Select All</Text>
                </View>
              </View>

              <View>
                <Text style={{ color: "black", fontSize: 13.5 }}>Batch Number</Text>
              </View>

              <View style={{ margin: 20 }}>
                {
                  !selectAll ? <Text style={{ color: "black", fontSize: 13.5 }}>Action</Text> : (
                    <Button transparent onPress={toggleDeleteAll}><Text style={{ color: "red", fontSize: 14 }}>Delete All</Text></Button>
                  )
                }
              </View>
            </View>

          </View>
        </Body>
        <Right />
      </Header>
      <ScrollView>
        <View style={{}}>
          <DataTable>

            <View style={{ flex: 1, margin: 2 }}>
              {Load(list)}
            </View>


            <Modal isVisible={isModalVisible}>
              <View style={{
                flex: 1, justifyContent: "space-between",
                alignItems: "center", backgroundColor: "#ffffff", borderRadius: 10, padding: 10,
              }}>

                <View style={{ flex: 1, justifyContent: "center" }}>
                  <Text>{`Are you sure to want to delete this item NO:${id} ?`}</Text>
                  <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                    <Button warning style={{ width: 50, justifyContent: "center" }} onPress={closeModal}><Text>NO</Text></Button>
                    <Button danger style={{ width: 50, justifyContent: "center" }} onPress={deleteAllItems}><Text>YES</Text></Button>
                  </View>
                </View>

              </View>
            </Modal>
          </DataTable>
        </View>
      </ScrollView>
    </Container>

  );
}

