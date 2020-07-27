import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, ImageBackground, Dimensions, Animated, Easing, Image, AppState } from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import * as SplashScreen from 'expo-splash-screen';

// Radio Button Component
import RadioButton from './components/RadioButton';

// Expo-av module for background audio
import { Audio } from "expo-av";

// Typewriter effect
import TypeWriter from "react-native-typewriter";

// Custom Font - Oxygen
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

// Background PNG
import background from './assets/images/background.png';

// Character PNGs
import excitedCharacter from './assets/images/excited.png';
import happyCharacter from './assets/images/happy.png';
import neutralCharacter from './assets/images/neutral.png';
import sadCharacter from './assets/images/sad.png';


// Used to make the left icon and CSS attributes such as fontSize relative to the screen size
const { width, height } = Dimensions.get("window");
const screenWidth = width;
const screenHeight = height;
var iconSize = screenWidth / 10;

const genderOptions = [
  {
    key: 'male',
    text: 'Male',
  },
  {
    key: 'female',
    text: 'Female',
  },
  {
    key: 'transgender',
    text: 'Transgender',
  },
  {
    key: 'genderqueerNonBinary',
    text: 'Genderqueer/Non-Binary',
  },
  {
    key: 'preferNotToAnswer',
    text: 'Prefer Not To Answer',
  },
];

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
      appState: 'active'
    };
    AppState.addEventListener('change', newState => this.setState({ appState: newState }));

    // The second item in the list controls which character will show up
    this.textBoxes = {
      1: ["Hello, welcome to Project Beck!", "happy", "text"],
      2: ["I’m so excited to meet you.", "excited", "text"],
      3: ["Please enter your name.", "neutral", "text"],
      4: ["What's your gender?", "neutral", "input"],
    }
  };

  async componentDidMount() {
    // Creates an instance of Audio.sound
    const soundObject = new Audio.Sound();
    // Loads sound
    await soundObject.loadAsync(require("./assets/soundtracks/welcome.mp3"));
    // Makes the soundtrack loop
    soundObject.setIsLoopingAsync(true);
    // Sets the volume of the soundtrack (must be between 0 and 1)
    soundObject.setVolumeAsync(0.45);
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
    var emotion = this.textBoxes[this.state.currentId][1];
    var character;
    if (emotion == "excited") {
      character = excitedCharacter;
    }
    else if (emotion == "happy") {
      character = happyCharacter;
    }
    else if (emotion == "neutral") {
      character = neutralCharacter;
    }
    else if (emotion == "sad") {
      character = sadCharacter;
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
      textType.push(<TypeWriter key="typewriter" style={componentStyles.text} typing={1} fixed={false} onTypingEnd={this.goToNext} maxDelay={35} fixed={true}>{this.textBoxes[this.state.currentId][0]}</TypeWriter>);
    }
    else {
      textType.push(<Text key="text" style={componentStyles.text}>{this.textBoxes[this.state.currentId][0]}</Text>);
    }

    // Controls whether an input option shows up
    var inputQuestion = [];
    if (this.textBoxes[this.state.currentId][2] == "input") {
      inputQuestion = <View style={containerStyles.genderOptionsView}><RadioButton options={genderOptions} /></View>
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

            <ImageBackground source={background} style={containerStyles.standardBackground}>

            <Animated.View style={[componentStyles.textBubbleAnimation, textAnimationStyle]}>
              <View style={componentStyles.textBubble}>
                <View style={componentStyles.iconView} onPress={this.goBack}>
                  <Icon name="angle-left" size={iconSize} color="#095266" style={componentStyles.leftIcon} onPress={this.goBack} />
                </View>

                <View style={componentStyles.textView}>
                    {textType}
                    {inputQuestion}
                </View>
              </View>
            </Animated.View>

            <Animated.View style={[containerStyles.characterViewAnimation, characterAnimationStyle]}>
              <View style={containerStyles.characterView}>
                <Image source={character} fadeDuration={0} />
              </View>
            </Animated.View>

            </ImageBackground>

          </View>
        </TouchableWithoutFeedback>
      );
    };
  }
}

const containerStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  standardBackground: {
    flex: 1,
    width: '100%',
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
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
  genderOptionsView: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '10%'
  }
});

const componentStyles = StyleSheet.create({
  textBubbleAnimation: {
    zIndex: 2,
    width: '92%',
    height: '62%',
    bottom: '6%',
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
    paddingLeft: '12%',
    paddingRight: '12%',
  },
  text: {
    fontFamily: 'oxygen-light',
    fontSize: screenWidth * .072,
    flexWrap: 'wrap',
    // lineHeight: screenWidth * .108,
    textAlign: 'left',
    color: '#195D70',
    paddingBottom: 0,
    marginBottom: 0,
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