//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import Fire from "../Config/Fire";
import * as firebase from "firebase";

// Temporary list data
const posts = [
  {
    id: "1",
    name: "Michael Hallorina",
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed luctus, leo id vulputate scelerisque, enim justo ultrices eros, quis pretium ipsum ipsum sit amet enim. Ut non eleifend eros. Sed imperdiet tellus eget aliquam vehicula. Vestibulum ut rutrum nibh. Nunc blandit vel purus vel dictum. Vivamus sed egestas nibh. Suspendisse potenti.",
    timestamp: 1600646400123,
    avatar: require("../assets/tempAvatar.jpg"),
    image: require("../assets/tempImage1.jpg"),
  },
  {
    id: "2",
    name: "Goran Illeviski",
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed luctus, leo id vulputate scelerisque, enim justo ultrices eros, quis pretium ipsum ipsum sit amet enim. Ut non eleifend eros. Sed imperdiet tellus eget aliquam vehicula. Vestibulum ut rutrum nibh. Nunc blandit vel purus vel dictum. Vivamus sed egestas nibh. Suspendisse potenti.",
    timestamp: 1600646400123,
    avatar: require("../assets/tempAvatar.jpg"),
    image: require("../assets/tempImage2.jpg"),
  },
  {
    id: "3",
    name: "Haymond",
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed luctus, leo id vulputate scelerisque, enim justo ultrices eros, quis pretium ipsum ipsum sit amet enim. Ut non eleifend eros. Sed imperdiet tellus eget aliquam vehicula. Vestibulum ut rutrum nibh. Nunc blandit vel purus vel dictum. Vivamus sed egestas nibh. Suspendisse potenti.",
    timestamp: 1600646400123,
    avatar: require("../assets/tempAvatar.jpg"),
    image: require("../assets/tempImage3.jpg"),
  },
  {
    id: "4",
    name: "Ashely",
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed luctus, leo id vulputate scelerisque, enim justo ultrices eros, quis pretium ipsum ipsum sit amet enim. Ut non eleifend eros. Sed imperdiet tellus eget aliquam vehicula. Vestibulum ut rutrum nibh. Nunc blandit vel purus vel dictum. Vivamus sed egestas nibh. Suspendisse potenti.",
    timestamp: 1600646400123,
    avatar: require("../assets/tempAvatar.jpg"),
    image: require("../assets/tempImage4.jpg"),
  },
  {
    id: "5",
    name: "Haley",
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed luctus, leo id vulputate scelerisque, enim justo ultrices eros, quis pretium ipsum ipsum sit amet enim. Ut non eleifend eros. Sed imperdiet tellus eget aliquam vehicula. Vestibulum ut rutrum nibh. Nunc blandit vel purus vel dictum. Vivamus sed egestas nibh. Suspendisse potenti.",
    timestamp: 1600646400123,
    avatar: require("../assets/tempAvatar.jpg"),
    image: require("../assets/tempImage1.jpg"),
  },
  {
    id: "6",
    name: "Mason",
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed luctus, leo id vulputate scelerisque, enim justo ultrices eros, quis pretium ipsum ipsum sit amet enim. Ut non eleifend eros. Sed imperdiet tellus eget aliquam vehicula. Vestibulum ut rutrum nibh. Nunc blandit vel purus vel dictum. Vivamus sed egestas nibh. Suspendisse potenti.",
    timestamp: 1600646400123,
    avatar: require("../assets/tempAvatar.jpg"),
    image: require("../assets/tempImage2.jpg"),
  },
  {
    id: "7",
    name: "Stanley",
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed luctus, leo id vulputate scelerisque, enim justo ultrices eros, quis pretium ipsum ipsum sit amet enim. Ut non eleifend eros. Sed imperdiet tellus eget aliquam vehicula. Vestibulum ut rutrum nibh. Nunc blandit vel purus vel dictum. Vivamus sed egestas nibh. Suspendisse potenti.",
    timestamp: 1600646400123,
    avatar: require("../assets/tempAvatar.jpg"),
    image: require("../assets/tempImage3.jpg"),
  },
];

// create a component
class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listPost: [],
      avatar: this.avatar,
      name: this.name,
    };
    this.ref = firebase.firestore().collection("Posts");
  }
  static navigationOptions = {
    headerShown: false,
  };

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot((querySnapshot) => {
      const post = [];
      querySnapshot.forEach((doc) => {
        post.push({
          postId: doc.data().uid,
          postText: doc.data().text,
          ...doc.data(),
        });
      });
      this.setState({
        listPost: post,
        loading: false,
      });
    });
  }

  renderPost = (listPost) => {
    return (
      <View style={styles.feedItem}>
        <Image source={listPost.avatar} style={styles.avatar} />
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <Text style={styles.name}>{listPost.uid}</Text>
              <Text style={styles.timestamp}>
                {moment(listPost.timestamp).fromNow()}
              </Text>
            </View>
            <Ionicons name="ios-more" size={24} color="#73788B" />
          </View>
          <Text style={styles.post}>{listPost.postText}</Text>
          <Image
            source={listPost.postImage}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={{ flexDirection: "row" }}>
            <Ionicons
              name="ios-heart-empty"
              size={24}
              color="#73788B"
              style={{ marginRight: 16 }}
            />
            <Ionicons name="ios-chatboxes" size={24} color="#73788B" />
          </View>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Feed</Text>
        </View>
        <FlatList
          style={styles.feed}
          data={this.state.listPost}
          renderItem={({ item }) => this.renderPost(item)}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        ></FlatList>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFECF4",
  },
  header: {
    paddingTop: 24,
    paddingBottom: 16,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#EBECF4",
    shadowColor: "#454D65",
    shadowOffset: { height: 5 },
    shadowOpacity: 0.2,
    zIndex: 10,
  },
  headerTitle: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "500",
  },
  feed: {
    marginTop: 10,
    marginHorizontal: 16,
  },
  feedItem: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 8,
    flexDirection: "row",
    marginVertical: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16,
  },
  name: {
    marginTop: 5,
    fontSize: 15,
    fontWeight: "500",
    color: "#454D65",
  },
  timestamp: {
    fontSize: 11,
    color: "#C4C6CE",
    marginTop: 4,
  },
  post: {
    marginTop: 16,
    fontSize: 14,
    color: "#838899",
  },
  image: {
    width: undefined,
    height: 150,
    borderRadius: 5,
    marginVertical: 16,
  },
});

//make this component available to the app
export default HomeScreen;
