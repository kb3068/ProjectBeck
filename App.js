import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>This is Sabhya's test branch</Text>
    </View>
  );
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
    left: screenWidth - 200,
    top: screenHeight - 400
  }
});

const componentStyles = StyleSheet.create({
  textBubble: {
    zIndex: 2,
    width: 287,
    height: 525,
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
    fontSize: 42,
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