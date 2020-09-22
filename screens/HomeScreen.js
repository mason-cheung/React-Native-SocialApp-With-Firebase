//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, LayoutAnimation } from 'react-native';
import * as firebase from 'firebase'

// create a component
class HomeScreen extends Component {
    static navigationOptions = {
        headerShown: false
    }
    state = {
        email: "",
        displayName: ""
    }

    componentDidMount(){
        const {email, displayName} = firebase.auth().currentUser

        this.setState({email, displayName})
    }

    signOutUser = () => {
        firebase.auth().signOut()
    }

    render() {
        LayoutAnimation.easeInEaseOut();
        return (
            <View style={styles.container}>
                <Text>Hi {this.state.email}!</Text>
                <TouchableOpacity style={{marginTop: 32 }} onPress={this.signOutUser}>
                    <Text>Logout</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
});

//make this component available to the app
export default HomeScreen;
