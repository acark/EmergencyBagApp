/* eslint-disable react-native/no-inline-styles */
import {useRoute} from '@react-navigation/core';
import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import Header from '../components/Header';
import {Theme} from '../utils/Constants';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

class EmergencyCalls extends Component {
  constructor(props) {
    super(props);
    this.topInset = this.props.insets.top;
    this.bottomInset = this.props.insets.bottom;
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar animated={true} barStyle={'light-content'} />
        <View style={{flex: 1}}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              alignItems: 'center',
              paddingTop: this.topInset + 80,
            }}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.callContainer, {backgroundColor: '#273c75'}]}>
              <Image
                source={require('../utils/img/police_car.png')}
                style={styles.callIcon}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.callContainer, {backgroundColor: '#2c3a47'}]}>
              <Image
                source={require('../utils/img/ambulance.png')}
                style={styles.callIcon}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.callContainer, {backgroundColor: '#06c46c'}]}>
              <Image
                source={require('../utils/img/firetruck.png')}
                style={styles.callIcon}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
          </ScrollView>
        </View>
        <Header
          leftIconPressed={() => {
            this.props.navigation.pop();
          }}
          theme={Theme.DARK}
          headerTitle={'Acil Aramalar'}
          headerLeftIcon={require('../utils/img/left.png')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#ffffff',
    flex: 1,
  },

  callContainer: {
    width: WIDTH * 0.95,
    height: 200,
    overflow: 'hidden',
    borderRadius: 15,
    backgroundColor: '#212121',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  callIcon: {
    width: '80%',
    height: '80%',
  },
});

function EmergencyCallsScreenContainer(props) {
  const route = useRoute();
  const frame = useSafeAreaFrame();
  const insets = useSafeAreaInsets();

  return (
    <EmergencyCalls {...props} route={route} frame={frame} insets={insets} />
  );
}

export default EmergencyCallsScreenContainer;
