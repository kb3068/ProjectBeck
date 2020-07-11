import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, ImageBackground, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import { RFPercentage} from "react-native-responsive-fontsize";
// Background SVG
import BackgroundIcon from './components/BackgroundIcon';

// Character SVG Icons
import ExcitedCharacter from './components/ExcitedCharacter';
import HappyCharacter from './components/HappyCharacter';
import NeutralCharacter from './components/NeutralCharacter';
import SadCharacter from './components/SadCharacter';

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
    return (
      <TouchableWithoutFeedback onPress={this.goToNext}>
        <View style={containerStyles.container}>

          <ImageBackground style={containerStyles.standardBackground}>
            <BackgroundIcon style={{ zIndex: 1 }} />
          </ImageBackground>

          <View style={componentStyles.textBubble}>
      
            <View style={componentStyles.iconView} onPress={this.goBack}>
              <Icon name="angle-left" size={45} color="#095266" style={componentStyles.leftIcon} onPress={this.goBack} />
            </View>

            <View style={componentStyles.textView}>
              <Text style={componentStyles.text}>{this.textBoxes[this.state.currentId][0]}</Text>
            </View>

          </View>

          {this.characterIcons[this.textBoxes[this.state.currentId][1]]}

        </View>
      </TouchableWithoutFeedback>
    );
  };
}

// Used to place the character in the bottom right corner, no matter the size of the screen
const { width, height } = Dimensions.get("window");
const screenWidth = width;
const screenHeight = height;

const containerStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  standardBackground: {
    flex: 1,
    zIndex: 1
  },
  character: {
    zIndex: 3,
    position: 'absolute',
    right:0,
    bottom:0
  }
});

const componentStyles = StyleSheet.create({
  textBubble: {
    zIndex: 2,
    width: '70%',
    height: '60%',
    backgroundColor: '#FFFFFF',
    borderWidth: 0,
    borderRadius: 42,
    position: 'absolute',    
    shadowOffset: { width: 10, height: 10 },
    shadowRadius: 0,
    shadowColor: '#000000',
    shadowOpacity: .1,
  },
  textView: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100
  },
  text: {
    fontSize: RFPercentage(4),
    flexWrap: 'wrap',
    textAlign: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  iconView: {
    justifyContent: 'space-around',
    height: 80,
  },
  leftIcon: {
    marginTop: 32,
    marginLeft: 17,

  }
});

export default App;