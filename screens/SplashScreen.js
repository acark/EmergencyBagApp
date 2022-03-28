import {useRoute} from '@react-navigation/core';
import React, {Component} from 'react';
import {View, Text, StyleSheet, Animated, Easing} from 'react-native';
import LottieView from 'lottie-react-native';
import {Color} from '../utils/Constants';

class SplashScreen extends Component {
  animationDuration = new Animated.Value(0.3);
  constructor(props) {
    super(props);
  }

  finishAnimation = () => {
    this.props.navigation.replace('HomeScreen');
  };

  startAnimation = () => {
    Animated.timing(this.animationDuration, {
      toValue: 0.5,
      duration: 2400,
      useNativeDriver: false,
    }).start(() => {
      this.finishAnimation();
    });
  };

  componentDidMount() {
    this.startAnimation();
  }

  render() {
    return (
      <View style={styles.container}>
        <LottieView
          source={require('../utils/animations/bag.json')}
          loop={false}
          speed={0.6}
          progress={this.animationDuration}
          colorFilters={[
            {
              keypath: 'Layer 1',
              color: '#95E4EE',
            },
            {
              keypath: 'Layer 2',
              color: '#95E4EE',
            },
            {
              keypath: 'Layer 6',
              color: '#95E4EE',
            },
            {
              keypath: 'Layer 6',
              color: '#95E4EE',
            },
            {
              keypath: 'Layer 7',
              color: '#95E4EE',
            },
            {
              keypath: 'Layer 7',
              color: '#95E4EE',
            },
          ]}
        />
      </View>
    );
  }
}

function SplashScreenContainer(props) {
  const route = useRoute();

  return <SplashScreen {...props} route={route} />;
}

export default SplashScreenContainer;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});
