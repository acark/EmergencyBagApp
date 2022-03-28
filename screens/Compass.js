/* eslint-disable react/self-closing-comp */
import {useRoute} from '@react-navigation/core';
import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Animated,
  Image,
  Dimensions,
} from 'react-native';
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import Header from '../components/Header';
import CompassHeading from 'react-native-compass-heading';
import {Color, Theme} from '../utils/Constants';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

class Compass extends Component {
  constructor(props) {
    super(props);
    this.topInset = this.props.insets.top;
    this.bottomInset = this.props.insets.bottom;
    this.spinValue = new Animated.Value(0);
    this.state = {
      compassHeading: 0,
    };
  }

  shouldComponentUpdate() {
    return true;
  }
  componentDidMount() {
    // accuracy on android will be hardcoded to 1
    // since the value is not available.
    // For iOS, it is in degrees

    CompassHeading.start(1, ({heading, accuracy}) => {
      this.spinValue.setValue(heading);
    });
  }

  componentWillUnmount() {
    CompassHeading.stop();
  }

  render() {
    const spin = this.spinValue.interpolate({
      inputRange: [0, 360],
      outputRange: ['0deg', '360deg'],
    });
    return (
      <View style={styles.container}>
        <View style={[styles.headingInfo, {marginTop: this.topInset + 150}]}>
          <Text style={styles.headingInfoText}>NE</Text>
        </View>

        <View style={styles.compassContainer}>
          <View style={styles.compassPointerContainer}>
            <Image
              style={styles.compassPointer}
              resizeMode="contain"
              source={require('../utils/img/compass_pointer.png')}></Image>
          </View>
          <Animated.View style={styles.compass}>
            <Animated.Image
              style={[styles.compassImage, {transform: [{rotate: spin}]}]}
              resizeMode="contain"
              source={require('../utils/img/compass_bg.png')}></Animated.Image>
            <View style={styles.headingValue}>
              <Text style={styles.headingValueText}>
                {this.state.compassHeading + '°'}
              </Text>
            </View>
          </Animated.View>
        </View>
        <Header
          theme={Theme.DARK}
          leftIconPressed={() => {
            this.props.navigation.pop();
          }}
          headerTitle={'Pusula'}
          headerLeftIcon={require('../utils/img/left.png')}
        />
      </View>
    );
  }
}

//  {rotate: `${360 - this.state.compassHeading}deg`}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
  },

  headingInfo: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingInfoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },

  compassContainer: {
    marginTop: 40,
  },

  compassPointerContainer: {
    width: WIDTH * 0.8,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  compassPointer: {
    width: 40,
    height: 40,
    tintColor: Color.primary,
  },
  compass: {
    width: WIDTH * 0.8,
    height: WIDTH * 0.8,
  },
  compassImage: {
    width: WIDTH * 0.8,
    height: WIDTH * 0.8,
  },

  headingValue: {
    position: 'absolute',
    alignSelf: 'center',
    height: 40,
    top: WIDTH * 0.4 - 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingValueText: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'center',
  },
});

function CompassContainer(props) {
  const route = useRoute();
  const frame = useSafeAreaFrame();
  const insets = useSafeAreaInsets();

  return <Compass {...props} route={route} frame={frame} insets={insets} />;
}

export default CompassContainer;
