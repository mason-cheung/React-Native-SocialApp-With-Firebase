//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Image, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase'
import Fire from '../Config/Fire'

// create a component
class ProfileScreen extends Component {
    state = {
        user: {}
    }

    unsubscribe = null

    componentDidMount() {
        const user = this.props.uid || Fire.shared.uid

        this.unsubscribe = Fire.shared.firestore
          .collection("users")
          .doc(user)
          .onSnapshot((doc) => {
            this.setState({ user: doc.data() });
          });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        return (
          <View style={styles.container}>
            <View style={{ marginTop: 64, alignItems: "center" }}>
              <View style={styles.avatarContainer}>
                <Image
                  style={styles.avatar}
                  source={
                    this.state.user.avatar
                      ? { uri: this.state.user.avatar } || ''
                      : require("../assets/tempAvatar.jpg")
                  }
                />
              </View>
              <Text style={styles.name}>{this.state.user.name}</Text>
            </View>
            <View style={styles.statsContainer}>
              <View style={styles.stat}>
                <Text style={styles.statAmount}>21</Text>
                <Text style={styles.statTitle}>Posts</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statAmount}>981</Text>
                <Text style={styles.statTitle}>Followers</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statAmount}>63</Text>
                <Text style={styles.statTitle}>Following</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                Fire.shared.signOut();
              }}
              style={styles.logout}
            >
                <Text style={styles.logoutText}>Log out</Text>
            </TouchableOpacity>
          </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EFECF4',
    },
    avatarContainer: {
        shadowColor: '#151734',
        shadowRadius: 15,
        shadowOpacity: 0.4,
    },
    avatar: {
        width: 136,
        height: 136,
        borderRadius: 68,
    },
    name: {
        marginTop: 24,
        fontSize: 16,
        fontWeight: '600'
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 32,
    },
    stat: {
        flex: 1,
        alignItems: 'center',
    },
    statAmount: {
        color: '#4F566D',
        fontSize: 18,
        fontWeight: '300',
    },
    statTitle: {
        color: '#C3C5CD',
        fontSize: 12,
        fontWeight: '500',
        marginTop: 4,
    },
    logout: {
        marginHorizontal: 50,
        backgroundColor: '#E9446A',
        borderRadius: 4,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 100,
    },
    logoutText: {
        alignItems: 'center',
        fontSize: 18,
    }
});

//make this component available to the app
export default ProfileScreen;
