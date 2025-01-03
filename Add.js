import React,{useState} from 'react';
import { StatusBar, View, Button, Text, TextInput, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
        inputBox: {
            borderWidth: 1,
            marginBottom: 20,
            marginLeft: 10,
            marginRight: 10,
        },

        inputHeader: {
            marginLeft: 10,
            fontSize: 15,
            fontWeight: 'bold',
        },

        submit: {
            marginLeft: 10,
            marginRight:10
        }
})

const Add = ({navigation, route}) => {
  const[Book,setBook] = useState("");

    const setData = async (value) => {
        AsyncStorage.setItem("bookData", value);
        navigation.navigate('Home');
    }

  return (
    <View>
        <StatusBar/>
        <Text style={styles.inputHeader}>Title</Text>
        <TextInput maxLength={1000} style={styles.inputBox} onChangeText={(text)=>setBook(text)}/>

        <Text style={styles.inputHeader}> ISBN: </Text>
        <TextInput maxLength={13} style={styles.inputBox} onChangeText={(text)=>setBook(text)}/>

        <Text style={styles.inputHeader}> Copies Owned: </Text>
        <TextInput maxLength={1000} style={styles.inputBox} onChangeText={(text)=>setBook(text)}/>

        <Text style={styles.inputHeader}> Image URL</Text>
        <TextInput maxLength={10000} style={styles.inputBox} onChangeText={(text)=>setBook(text)}/>

      <Button title='Submit'
              style={styles.submit} onPress={()=>{
          let mydata = JSON.parse((route.params.datastring));
          let item = {key: item.name};
          let indexnum = 1;

          mydata[indexnum].data.push(item);
          let stringdata = JSON.stringify(mydata);
          setData(stringdata);
        }
      }
      />
    </View>
  );
};

export default Add;
