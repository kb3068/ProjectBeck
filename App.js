import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, ImageBackground, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import * as SplashScreen from 'expo-splash-screen';

// Typewriter effect
import TypeWriter from "react-native-typewriter";

// Custom Font - Oxygen Light
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

// Background SVG
import BackgroundImage from './components/background/BackgroundImage';

// Character SVGs
import ExcitedCharacter from './components/character/ExcitedCharacter';
import HappyCharacter from './components/character/HappyCharacter';
import NeutralCharacter from './components/character/NeutralCharacter';
import SadCharacter from './components/character/SadCharacter';

// Used to make the left icon and CSS attributes such as fontSize relative to the screen size
const { width, height } = Dimensions.get("window");
const screenWidth = width;
const screenHeight = height;
var iconSize = screenWidth / 10;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentId: 1,
      assetsLoaded: false,
      typewriterEffect: true,
    };

    // The second item in the list controls which character will show up (these strings must match with the keys in this.characterIcons)
    this.textBoxes = {
      1: ["Hello, welcome to Project Beck!", "excited"],
      2: ["I’m so excited to meet you.", "happy"],
      3: ["Please enter your name.", "neutral"]
    }

    // In order to add a character, just add the SVG in the "components" folder
    this.characterIcons = {
      "excited": <ExcitedCharacter style={containerStyles.character} key="excited" />,
      "happy": <HappyCharacter style={containerStyles.character} key="happy" />,
      "neutral": <NeutralCharacter style={containerStyles.character} key="neutral" />,
      "sad": <SadCharacter style={containerStyles.character} key="sad" />
    }
  };

  async componentDidMount() {
    try {
      await SplashScreen.preventAutoHideAsync();
    } catch (e) {
      console.warn(e);
    }
    await Font.loadAsync({
      'oxygen-bold': require('./assets/fonts/Oxygen-Bold.ttf'),
      'oxygen-regular': require('./assets/fonts/Oxygen-Regular.ttf'),
      'oxygen-light': require('./assets/fonts/Oxygen-Light.ttf')
    });
    this.setState({ assetsLoaded: true });
    await SplashScreen.hideAsync();
  }

  // Changes the text and image to that of the following "page" in the intro sequence
  goToNext = () => {
    if (this.state.typewriterEffect == true) {
      this.setState({ typewriterEffect: false});
    }
    else if (this.state.currentId != Object.keys(this.textBoxes).length) {
      this.setState({ currentId: this.state.currentId + 1 });
      this.setState({ typewriterEffect: true });
    }
  };

  // Changes the text and image to that of the preceding "page" in the intro sequence
  goBack = () => {
    if (this.state.currentId != 1) {
      this.setState({ typewriterEffect: false });
      this.setState({ currentId: this.state.currentId - 1 });
    }
  };

  render() {
    // Controls whether the text is shown as a typewriter or not
    var textType = [];
    if (this.state.typewriterEffect) {
      textType.push(<TypeWriter key="typewriter" style={componentStyles.text} typing={1} fixed={false} onTypingEnd={this.goToNext} maxDelay={35}>{this.textBoxes[this.state.currentId][0]}</TypeWriter>);
    }
    else {
      textType.push(<Text key="text" style={componentStyles.text}>{this.textBoxes[this.state.currentId][0]}</Text>);
    }

    // Waits to load the page until the custom font is loaded
    const { assetsLoaded } = this.state;
    if (!assetsLoaded) {
      return (
        <AppLoading
          startAsync={this.fetchFonts}
          onFinish={() => setDataLoaded(true)}
        />
      );
    }
    else {
      return (
        <TouchableWithoutFeedback onPress={this.goToNext}>
          <View style={containerStyles.container}>

            <ImageBackground style={containerStyles.standardBackground}>
              <BackgroundImage />
            </ImageBackground>

            <View style={componentStyles.textBubble}>
              <View style={componentStyles.iconView} onPress={this.goBack}>
                <Icon name="angle-left" size={iconSize} color="#095266" style={componentStyles.leftIcon} onPress={this.goBack} />
              </View>

              <View style={componentStyles.textView}>
                {textType}
              </View>
            </View>

            <View style={containerStyles.characterView}>
              {this.characterIcons[this.textBoxes[this.state.currentId][1]]}
            </View>

          </View>
        </TouchableWithoutFeedback>
      );
    };
  }
}

const containerStyles = StyleSheet.create({
  standardBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    zIndex: 1,
  },
  container: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  characterView: {
    zIndex: 4,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  character: {
    zIndex: 3,
  },
});

const componentStyles = StyleSheet.create({
  textBubble: {
    zIndex: 2,
    width: '74%',
    height: '62%',
    bottom: '25%',
    backgroundColor: '#FFFFFF',
    borderWidth: 0,
    borderRadius: screenWidth * .1,
    shadowOffset: { width: screenWidth * .024, height: screenWidth * .024 },
    shadowRadius: 0,
    shadowColor: '#000000',
    shadowOpacity: .1,
  },
  textView: {
    height: '80%',
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '30%',
    paddingLeft: '15%',
    paddingRight: '15%',
  },
  text: {
    fontFamily: 'oxygen-light',
    fontSize: screenWidth * .072,
    flexWrap: 'wrap',
    lineHeight: screenWidth * .108,
    textAlign: 'left',
    color: '#195D70'
  },
  iconView: {
    justifyContent: 'space-around',
    height: '20%'
  },
  leftIcon: {
    height: '100%',
    paddingTop: '8%',
    paddingLeft: '8%',
  }
});

export default App;