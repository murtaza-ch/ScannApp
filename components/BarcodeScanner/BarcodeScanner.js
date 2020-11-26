import { Button, Footer } from 'native-base'
import { Keyboard, KeyboardAvoidingView, Text, TouchableWithoutFeedback, View } from 'react-native';
import React, { useEffect, useState } from 'react';

import { TextInput } from 'react-native-paper';

export function BarCodeScanners(props) {
  const [bar, setBar] = useState(null);

  const [text, setText] = useState(props.truckname);
  const textInput = React.useRef(null);

  useEffect(() => {

    if (textInput.current) {
      textInput.current.focus();
    }

  }, []);

  const func = () => {
    props.Scannedhandler(256, bar, text);
    setBar(null)
  }

  return (
    <>
      <Footer style={{ flex: 1, flexDirection: "column", padding: 10, height: 300, backgroundColor: "white" }}>
        <View style={{ flexDirection: "row" }}>
          <KeyboardAvoidingView behavior="height">
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
              <View>
                <TextInput style={{ width: 300, height: 55 }}
                  label="Scan Barcode here..."
                  value={bar}
                  ref={textInput}
                  onChangeText={(bar) => setBar(bar)}
                  returnKeyType='go'
                  onSubmitEditing={func}
                />
                <TextInput style={{ width: 300, height: 55 }}
                  label=" Enter Truck Name"
                  value={text}
                  onChangeText={(text) => setText(text)}
                />
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
          {/* </View> */}

        </View>

        <View style={{ flex: 1, justifyContent: "flex-start" }}>
          <Button style={{ marginTop: 18, width: 300, height: 40, justifyContent: "center" }} onPress={() => props.exportData()}>
            <Text style={{ color: 'white' }}>Submit</Text>
          </Button>
        </View>


      </Footer>

    </>
  );
}
