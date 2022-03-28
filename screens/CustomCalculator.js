import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import Header from '../components/Header';
import {Theme} from '../utils/Constants';
import Calculator from 'react-native-scientific-calculator';

export default class CustomCalculator extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Calculator
          showLiveResult={false}
          scientific={true}
          theme="dark"
          customize={{
            borderRadius: 5,
            spacing: 2,
          }}
        />
        <Header
          theme={Theme.DARK}
          leftIconPressed={() => {
            this.props.navigation.pop();
          }}
          backgroundColor={'#21252e'}
          headerTitle={'Hesap Makinesi'}
          headerLeftIcon={require('../utils/img/left.png')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    backgroundColor: '#21252e',
  },
});
