//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, StatusBar, LayoutAnimation } from 'react-native';
import * as firebase from 'firebase'

// create a component
class LoginScreen extends Component {
    static navigationOptions = {
        headerShown: false
    }
  state = {
    email: "",
    password: "",
    errorMessage: null,
  };

  handleLogin = () => {
    const { email, password } = this.state;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => this.setState({ errorMessage: error.message }));
  };

  render() {
      LayoutAnimation.easeInEaseOut();
    return (
      <View style={styles.container}>
          <StatusBar barStyle="light-content"></StatusBar>
          <Image source={require('../assets/authHeader.png')}  style={{width: '100%', height: '30%'}}></Image>
          <Image source={require('../assets/loginLogo.png')} style={{alignSelf: 'center', width: 100, height: 100, marginTop: -120}}></Image>
        <Text style={styles.greeting}>{`Hello agian.\nWelcome back.`}</Text>
        <View style={styles.errorMessage}>
          {this.state.errorMessage && (
            <Text style={styles.error}>{this.state.errorMessage}</Text>
          )}
        </View>
        <View style={styles.form}>
          <View>
            <Text style={styles.inputTitle}>Emaill Address</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              onChangeText={(email) => this.setState({ email })}
              value={this.state.email}
            ></TextInput>
          </View>
          <View style={{ marginTop: 32 }}>
            <Text style={styles.inputTitle}>Password</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              autoCapitalize="none"
              onChangeText={(password) => this.setState({ password })}
              value={this.state.password}
            ></TextInput>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
          <Text style={{ color: "#FFF", fontWeight: "500", fontSize: 18 }}>
            Sign in
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignSelf: "center", marginTop: 32 }} onPress={() => this.props.navigation.navigate("Register")}>
          <Text style={{ color: "#414959", fontSize: 13 }}>
            New to SocialApp?{" "}
            <Text style={{ fontWeight: "500", color: "#E9446A" }}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    greeting: {
        marginTop: 32,
        fontSize: 18,
        fontWeight: '400',
        textAlign: 'center'
    },
    errorMessage:{
        height: 72,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 30,
    },
    error: {
        color: '#e9446A',
        fontSize: 13,
        fontWeight: '600',
        textAlign: 'center',
    },
    form: {
        marginBottom: 48,
        marginHorizontal: 30,
    },
    inputTitle: {
        color: '#8A8F9E',
        fontSize: 10,
        textTransform: 'uppercase',
    },
    input: {
        borderBottomColor: '#8A8F9E',
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: '#161F3D',
    },
    button: {
        marginHorizontal: 50,
        backgroundColor: '#E9446A',
        borderRadius: 4,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

//make this component available to the app
export default LoginScreen;
