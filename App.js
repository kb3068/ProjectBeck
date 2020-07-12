import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, ImageBackground, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';

// Background SVGs
import BackgroundImageSmall from './components/BackgroundImageSmall';
import BackgroundImageBig from './components/BackgroundImageBig';

// Character SVGs
import ExcitedCharacter from './components/ExcitedCharacter';
import HappyCharacter from './components/HappyCharacter';
import NeutralCharacter from './components/NeutralCharacter';
import SadCharacter from './components/SadCharacter';

// Used to make the left icon and CSS attributes such as fontSize relative to the screen size
const { width } = Dimensions.get("window");
const screenWidth = width;
var iconSize = screenWidth / 10;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentId: 1
    };

    // The second item in the list controls which character will show up (these strings must match with the keys in this.characterIcons)
    this.textBoxes = {
      1: ["Hello, welcome!", "excited"],
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

  // Changes the text and image to that of the following "page" in the intro sequence
  goToNext = () => {
    if (this.state.currentId != Object.keys(this.textBoxes).length) {
      this.setState({ currentId: this.state.currentId + 1 });
    }
  };

  // Changes the text and image to that of the preceding "page" in the intro sequence
  goBack = () => {
    if (this.state.currentId != 1) {
      this.setState({ currentId: this.state.currentId - 1 });
    }
  };

  render() {
    // ****Still need to adjust for iPad screen sizes****
    var backgroundImage = [];
    // if (screenWidth > 750) {
    //   backgroundImage.push(<BackgroundImageBig key="big" style={{ zIndex: 6, height: '200%', width:'200%', transform: [{ rotate: '90deg' }] }} />);
    // }
    // else {
      backgroundImage.push(<BackgroundImageSmall key="small" style={{ zIndex: 6, height: '100%' }} />);
    // }

    return (
      <TouchableWithoutFeedback onPress={this.goToNext}>
        <View style={containerStyles.container}>

          <ImageBackground style={containerStyles.standardBackground}>
            {backgroundImage}
          </ImageBackground>
          

          <View style={componentStyles.textBubble}>
            <View style={componentStyles.iconView} onPress={this.goBack}>
              <Icon name="angle-left" size={iconSize} color="#095266" style={componentStyles.leftIcon} onPress={this.goBack} />
            </View>

            <View style={componentStyles.textView}>
              <Text style={componentStyles.text}>{this.textBoxes[this.state.currentId][0]}</Text>
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
    zIndex: 2
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
    paddingBottom: '20%'
  },
  text: {
    fontSize: screenWidth * .10,
    flexWrap: 'wrap',
    textAlign: 'center',
    paddingLeft: '5%',
    paddingRight: '5%'
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