import React, { useState} from 'react';
import {StatusBar, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { datasource } from './Data.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 15,
        margin: 10,
        textAlign: 'left',
    },
    opacityStyle: {
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 20,
        margin: 10,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    bookImage: {
        width: 100,
        height: 120,
        marginRight: 10,
        borderRadius: 5,
    },
    bookDetails: {
        flex: 1,
        marginLeft: 10,
    },
    addButton: {
        backgroundColor: '#84D98A',
        padding: 10,
        borderRadius: 5,
        margin: 10,
        alignItems: 'center',
    },
    buttonText: {
        fontWeight: 'bold',
    },
});

const Home = ({ navigation }) => {
    const [mydata, setMyData] = useState([]);

    const getData = async () => {
            const datastr = await AsyncStorage.getItem('bookData');
            if (datastr != null) {
                const jsondata = JSON.parse(datastr);
                setMyData(jsondata);
            } else {
                setMyData(datasource);
            }
    };
    getData();

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.opacityStyle}
            onPress={() => {
                let datastr = JSON.stringify(mydata);
                navigation.navigate("Edit", {datastring: datastr});
            }}
        >
            <Image style={styles.bookImage} source={{ uri: item.ImageURL}} />
            <View style={styles.bookDetails}>
                <Text style={styles.textStyle}>Title: {item.name}</Text>
                <Text style={styles.textStyle}>ISBN: {item.ISBN}</Text>
                <Text style={styles.textStyle}>Copies Owned: {item.CopiesOwned}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={{ flex: 1 }}>
            <StatusBar />
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => {
                    let datastr = JSON.stringify(mydata);
                    navigation.navigate("Add", {datastring: datastr});
                }}
            >
                <Text style={styles.buttonText}>Add New Book</Text>
            </TouchableOpacity>
            <FlatList
                data={mydata}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

export default Home;
