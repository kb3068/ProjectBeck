import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import { Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AntDesign from "react-native-vector-icons/AntDesign";

let arrImages = [{image:require('./assets/sad.png')}, {image:require('./assets/happy.png')}, {image:require('./assets/excited.png')}, {image:require('./assets/neutral.png')}];
class App extends Component {

  constructor() {
    super();
    this.state = {
      currentId: 1
    };
    this.textBoxes = {
      1: ["Hello, welcome!"],
      2: ["I’m so excited to meet you."],
      3: ["Please enter your name."]
    }
  };

  goToNext = () => {
    if (this.state.currentId != Object.keys(this.textBoxes).length) {
      this.setState({ currentId: this.state.currentId + 1 });
    }
  };

  goBack = () => {
    if (this.state.currentId != 1) {
      this.setState({ currentId: this.state.currentId - 1 });
    }
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.goToNext}>
        <View style={styles.container}>

          <LinearGradient
            colors={['#90FC8E', '#11A49B']}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              height: '100%',
            }}
          />
          <View style={styles.aroundText}>
            <View style={styles.leftIcon} onPress={this.goBack}>
              <AntDesign
                name="left"
                color="#ccc"
                size={45}
                onPress={this.goBack}
              />
            </View>
            <Text style={styles.textBubble}>{this.textBoxes[this.state.currentId]}</Text>
            <Image source = {arrImages[this.state.currentId].image} style ={{height:216, width:180, marginLeft:80}}/>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 1,
  },
  textBubble: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 40,
    flexWrap: 'wrap',
    padding: 20,
    marginBottom: 55
  },
  aroundText: {
    justifyContent: 'center',
    width: 287,
    height: 525,
    backgroundColor: '#FFFFFF',
    // shadowOffset: { width: 10, height: 10 },
    // shadowColor: 'rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    borderWidth: 0,
    borderRadius: 42,
  },
  navigation: {
    padding: 25,
    fontSize: 20,
    margin: 10,
    backgroundColor: 'lightblue'
  },
  leftIcon: {
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 'auto'
  },
  Image: {
    justifyContent: 'center'
  }
});

export default App;