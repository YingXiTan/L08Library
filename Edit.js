import React,{useState} from 'react';
import {Alert, View, Button, Text, TextInput, StyleSheet} from 'react-native';
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

const Edit = ({navigation, route}) => {

    let mydata = JSON.parse(route.params.datastring);
    let myindex = route.params.index;

    const[book,setBook] = useState(route.params.key);

    const setData = async (value) => {
        AsyncStorage.setItem("bookData", value);
        navigation.navigate('Home');
    }

  return (
    <View>
        <Text style={styles.inputHeader}>Title</Text>
        <TextInput maxLength={1000} style={styles.inputBox} onChangeText={(text)=>setBook(text)}/>

        <Text style={styles.inputHeader}> ISBN: </Text>
        <TextInput maxLength={13} style={styles.inputBox} onChangeText={(text)=>setBook(text)}/>

        <Text style={styles.inputHeader}> Copies Owned: </Text>
        <TextInput maxLength={1000} style={styles.inputBox} onChangeText={(text)=>setBook(text)}/>

        <Text style={styles.inputHeader}> Image URL</Text>
        <TextInput maxLength={10000} style={styles.inputBox} onChangeText={(text)=>setBook(text)}/>

        <View style={{flexDirection:"row"}}>

            <View style={{margin:10,flex:1}}>

                <Button title='Save'
                        onPress={()=>{
                        let indexnum = 1

                          mydata[indexnum].data.push(item);
                          let stringdata = JSON.stringify(mydata);
                          setData(stringdata);
                      }
                    }
                    />
        </View>

        <View style={{margin:10,flex:1}}>

        <Button title='Delete'
          onPress={()=>{
            let indexnum = 1

            Alert.alert("Are you sure?",'',
              [{text:'Yes', onPress:()=>{
                      mydata[indexnum].data.push(item);
                      let stringdata = JSON.stringify(mydata);
                      setData(stringdata);
              }},
              {text:'No'}])
          }
        }
        />
        </View>
      </View>
    </View>
  );
};

export default Edit;
