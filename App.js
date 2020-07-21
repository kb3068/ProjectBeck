import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, ImageBackground, Dimensions, Animated, Easing, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import * as SplashScreen from 'expo-splash-screen';

// Expo-av module for background audio
import { Audio } from "expo-av";

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
      startWriting: false,
      bubbleTransform: new Animated.Value(0),
      characterTransform: new Animated.Value(0),
      characterLoaded: true
    };

    // The second item in the list controls which character will show up (these strings must match with the keys in this.characterIcons)
    this.textBoxes = {
      1: ["Hello, welcome to Project Beck!", "excited"],
      2: ["I’m so excited to meet you.", "happy"],
      3: ["Please enter your name.", "neutral"],
    }

    // In order to add a character, just add the SVG in the "components" folder
    this.characterIcons = {
      // "excited": <ExcitedCharacter style={containerStyles.character} key="excited" />,
      // "happy": <HappyCharacter style={containerStyles.character} key="happy" />,
      // "neutral": <NeutralCharacter style={containerStyles.character} key="neutral" />,
      // "sad": <SadCharacter style={containerStyles.character} key="sad" />

      // "excited": <Image source={require('./assets/images/excited.png')} />,
      // "happy": <Image source={require('./assets/images/happy.png')} />,
      // "neutral": <Image source={require('./assets/images/neutral.png')} />,
      // "sad": <Image source={require('./assets/images/sad.png')} />,
    }
  };

  renderPage = () => {
    if (this.state.characterLoaded == false) {
      this.setState({ charactersLoaded: true });
    }
  }

  async componentDidMount() {
    // Creates an instance of Audio.sound
    const soundObject = new Audio.Sound();
    // Loads sound
    await soundObject.loadAsync(require("./assets/soundtracks/welcome.mp3"));
    // Makes the soundtrack loop
    soundObject.setIsLoopingAsync(true);
    // Sets the volume of the soundtrack (must be between 0 and 1)
    soundObject.setVolumeAsync(0.35);
    // Plays sound
    await soundObject.playAsync();

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

    // Start the text bubble animation
    this.startTextAnimation();

    this.setState({ assetsLoaded: true });
    await SplashScreen.hideAsync();
  }

  // Starts the text bubble animation and then calls the character animation
  startTextAnimation = () => {
    Animated.timing(this.state.bubbleTransform, {
      toValue: 1,
      duration: 800,
      easing: Easing.elastic(1),
      useNativeDriver: true,
    }).start(() => { this.startCharacterAnimation() });
  };

  // Starts the character animation and then changes the startWriting state variable so text can start to show up
  startCharacterAnimation = () => {
    Animated.timing(this.state.characterTransform, {
      toValue: 1,
      duration: 350,
      easing: Easing.out(Easing.linear),
      useNativeDriver: true,
    }).start(() => { this.setState({ startWriting: true }) });
  }

  // Changes the text and image to that of the following "page" in the intro sequence
  goToNext = () => {
    this.setState({ charactersLoaded: false });
    if (this.state.typewriterEffect == true) {
      this.setState({ typewriterEffect: false });
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
    var link;
    var emotion = this.textBoxes[this.state.currentId][1];
    if (emotion == 'excited') {
      link = require('./assets/images/excited.png')
    }
    else if (emotion == 'happy') {
      link = require('./assets/images/happy.png')
    }
    else if (emotion == 'neutral') {
      link = require('./assets/images/neutral.png')
    }
    else if (emotion == 'sad') {
      link = require('./assets/images/sad.png')
    }

    const textAnimationStyle = {
      transform: [{ scale: this.state.bubbleTransform }]
    }

    const yVal = this.state.characterTransform.interpolate({
      inputRange: [0, 1],
      outputRange: [450, 0]
    })

    const characterAnimationStyle = {
      transform: [{
        translateY: yVal
      }]
    }

    // Controls whether the text is shown as a typewriter or not
    var textType = [];
    if (this.state.startWriting == false) {
      textType.push();
    }
    else if (this.state.typewriterEffect) {
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
    else if (this.state.characterLoaded == false) {
      return (
        <View style={containerStyles.container}>
          <ImageBackground style={containerStyles.standardBackground}>
            <BackgroundImage />
          </ImageBackground>
        </View>
      )
    }
    else {
      return (
        <TouchableWithoutFeedback onPress={this.goToNext}>
          <View style={containerStyles.container}>

            <ImageBackground style={containerStyles.standardBackground}>
              <BackgroundImage />
            </ImageBackground>

            <Animated.View style={[componentStyles.textBubbleAnimation, textAnimationStyle]}>
              <View style={componentStyles.textBubble}>
                <View style={componentStyles.iconView} onPress={this.goBack}>
                  <Icon name="angle-left" size={iconSize} color="#095266" style={componentStyles.leftIcon} onPress={this.goBack} />
                </View>

                <View style={componentStyles.textView}>
                  {textType}
                </View>
              </View>
            </Animated.View>

            <Animated.View style={[containerStyles.characterViewAnimation, characterAnimationStyle]}>
              <View style={containerStyles.characterView}>
                <Image source={link}
                  onRender={this.renderPage()}
                  ref={(thisImage) => { this[`characterImage`] = thisImage }}
                  />
              </View>
            </Animated.View>

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
    // resizeMode: 'cover',
    zIndex: 1,
  },
  container: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  characterView: {
    height: '100%',
    width: '100%',
  },
  characterViewAnimation: {
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
  textBubbleAnimation: {
    zIndex: 2,
    width: '74%',
    height: '62%',
    bottom: '25%',
  },
  textBubble: {
    zIndex: 2,
    height: '100%',
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