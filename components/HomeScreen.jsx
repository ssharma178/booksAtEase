import React, { useEffect, useState } from 'react'
import { FlatList, View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements/dist/buttons/Button';
import { Image } from 'react-native-elements/dist/image/Image';
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';
import { TouchableOpacity } from 'react-native'

const HomeScreen = ({route, navigation}, props) => {
    const [userQuery, setUserQuery] = useState('');
    const [books, setBooks] = useState([]);

    useEffect(()=> {
        fetch("https://openlibrary.org/subjects/history.json")  //gets books about history subject from api
        .then(response => response.json())
        .then(data => setBooks(data.works)) //sets books' data
        .catch((error) => {
            Alert.error('Error', error)
        })
    }, [])
    
    const getBooks = () => {
        fetch("https://openlibrary.org/search.json?q="+userQuery)
        .then(response => response.json())
        .then(data => setBooks(data))
        .catch((error) => {
            Alert.error('Error', error)
        })
    }

    // const getBook = (key) => {
    //     fetch("https://openlibrary.org/"+key)
    //     .then(response => response.json())
    //     .then(data => )
    // }

    const {setSignedIn} = route.params;
    const {signedIn} = route.params;

    return(
        <View style={{flexDirection: 'column', flex:1, height:"100%", width: "100%", backgroundColor: "#E98A15"}}>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => navigation.push("HomeScreen")}>
                    <Image source={require('../assets/logo.png')} style={{ width:120, height:70}}/>
                </TouchableOpacity>
                <Avatar 
                    rounded 
                    size="medium"  
                    icon={{name: 'user', type: 'font-awesome'}} 
                    activeOpacity={0.7}
                    overlayContainerStyle={{backgroundColor: "#f4c384"}}
                    style={{height: 50, width: 50, marginLeft: 155}}
                    onPress={() => navigation.push("UserScreen", {setSignedIn: setSignedIn, signedIn: signedIn})}
                    />
            </View>
            <View style={{flex:3, alignSelf: "center"}}>
                <View >
                    <Text style={{ color: "#FFFCF2", margin: 10, fontSize:18}}>Recommended for you</Text>
                </View>
                <FlatList
                data={books}
                numColumns="2"
                renderItem={({item}) => <View style={styles.bookContainer}><Button onPress={() => navigation.navigate('BookScreen', {bookId: item.key, signedIn: signedIn, setSignedIn: setSignedIn, bookLink: item.ia})} title={item.title} style={styles.text} /></View>}
                />

            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    container : {
        backgroundColor: '#E98A15',
        alignSelf: "center",
        alignItems: "center",
        padding: 10,
        paddingTop: 50,
        flexDirection: "row", 
        height: "20%", 
        width:"90%",
    },
    bookContainer: {
        backgroundColor: "#DB5461",
        borderRadius: 15, 
        padding: 20,
        margin: 10,
        width: "42%",
    }, 
    text: {
        color: "#FFFCF2", 
    }
});

export default HomeScreen