/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Animated,
  Easing,
} from 'react-native';
import Header from '../components/Header';
import {Color, Theme} from '../utils/Constants';
import {useRoute} from '@react-navigation/core';
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import Collapsible from 'react-native-collapsible';

class Tools extends Component {
  constructor(props) {
    super(props);
    this.topInset = this.props.insets.top;
    this.bottomInset = this.props.insets.bottom;
    this.firstSectionArrowSpin = new Animated.Value(0);
    this.secondSectionArrowSpin = new Animated.Value(0);

    this.state = {
      isFirstSectionCollapsed: false,
      isSecondSectionCollapsed: false,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.state.isFirstSectionCollapsed !== nextState.isFirstSectionCollapsed
    ) {
      this.animateArrow(
        nextState.isFirstSectionCollapsed,
        this.firstSectionArrowSpin,
      );
    }

    if (
      this.state.isSecondSectionCollapsed !== nextState.isSecondSectionCollapsed
    ) {
      this.animateArrow(
        nextState.isSecondSectionCollapsed,
        this.secondSectionArrowSpin,
      );
    }
    return true;
  }

  render() {
    const firstSpin = this.firstSectionArrowSpin.interpolate({
      inputRange: [0, 1],
      outputRange: ['180deg', '0deg'],
    });
    const secondSpin = this.secondSectionArrowSpin.interpolate({
      inputRange: [0, 1],
      outputRange: ['180deg', '0deg'],
    });
    return (
      <View style={styles.container}>
        <Header
          leftIconPressed={() => {
            this.props.navigation.pop();
          }}
          theme={Theme.LIGHT}
          backgroundColor={'transparent'}
          headerTitle={'Araçlar'}
          headerLeftIcon={require('../utils/img/left.png')}
        />
        <View style={[styles.listContainer, {marginTop: this.topInset + 80}]}>
          <TouchableOpacity
            style={styles.sectionTitleContainer}
            onPress={() => {
              this.setState({
                isFirstSectionCollapsed: !this.state.isFirstSectionCollapsed,
              });
            }}>
            <Text style={styles.sectionTitle}>Temel Araçlar</Text>
            <View style={styles.sectionTitleIconContainer}>
              <Animated.Image
                source={require('../utils/img/expand.png')}
                resizeMode="contain"
                style={[
                  styles.sectionTitleIcon,
                  {transform: [{rotate: firstSpin}]},
                ]}
              />
            </View>
          </TouchableOpacity>
          <Collapsible
            collapsed={this.state.isFirstSectionCollapsed}
            style={{
              width: '100%',
              height: 120,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={styles.itemsRow}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  this.props.navigation.navigate('Compass');
                }}
                style={styles.sectionItem}>
                <View style={styles.sectionItemIconContainer}>
                  <Image
                    source={require('../utils/img/compass.png')}
                    style={[styles.sectionItemIcon, {tintColor: '#F44336'}]}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.sectionItemTitleContainer}>
                  <Text style={styles.sectionItemTitle}>{'Pusula'}</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  try {
                    this.props?.navigation?.navigate('Calculator');
                  } catch (e) {
                    return;
                  }
                }}
                style={styles.sectionItem}>
                <View style={styles.sectionItemIconContainer}>
                  <Image
                    source={require('../utils/img/calculator.png')}
                    style={[styles.sectionItemIcon, {tintColor: '#3F51B5'}]}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.sectionItemTitleContainer}>
                  <Text style={styles.sectionItemTitle}>
                    {'Hesap Makinesi'}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  try {
                    this.props?.navigation?.navigate('Notes');
                  } catch (e) {
                    return;
                  }
                }}
                style={styles.sectionItem}>
                <View style={styles.sectionItemIconContainer}>
                  <Image
                    source={require('../utils/img/notes.png')}
                    style={[styles.sectionItemIcon, {tintColor: '#FFC107'}]}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.sectionItemTitleContainer}>
                  <Text style={styles.sectionItemTitle}>{'Notlar'}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </Collapsible>

          <TouchableOpacity
            style={styles.sectionTitleContainer}
            onPress={() => {
              this.setState({
                isSecondSectionCollapsed: !this.state.isSecondSectionCollapsed,
              });
            }}>
            <Text style={styles.sectionTitle}>Ses Araçları</Text>
            <View style={styles.sectionTitleIconContainer}>
              <Animated.Image
                source={require('../utils/img/expand.png')}
                resizeMode="contain"
                style={[
                  styles.sectionTitleIcon,
                  {transform: [{rotate: secondSpin}]},
                ]}
              />
            </View>
          </TouchableOpacity>
          <Collapsible
            collapsed={this.state.isSecondSectionCollapsed}
            style={{
              width: '100%',
              height: 120,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={styles.itemsRow}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  try {
                    this.props?.navigation?.navigate('AudioRecord');
                  } catch (e) {
                    return;
                  }
                }}
                style={styles.sectionItem}>
                <View style={styles.sectionItemIconContainer}>
                  <Image
                    source={require('../utils/img/microphone.png')}
                    style={[styles.sectionItemIcon, {tintColor: '#4CAF50'}]}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.sectionItemTitleContainer}>
                  <Text style={styles.sectionItemTitle}>{'Ses Kaydı'}</Text>
                </View>
              </TouchableOpacity>

              <View style={[styles.sectionItemPlaceholder]} />
              <View style={[styles.sectionItemPlaceholder]} />
            </View>
          </Collapsible>
        </View>
      </View>
    );
  }

  animateArrow = (collapsed, value) => {
    if (collapsed) {
      Animated.timing(value, {
        toValue: 1,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(value, {
        toValue: 0,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    }
  };
}

function ToolsContainer(props) {
  const route = useRoute();
  const frame = useSafeAreaFrame();
  const insets = useSafeAreaInsets();

  return <Tools {...props} route={route} frame={frame} insets={insets} />;
}

export default ToolsContainer;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    backgroundColor: '#ffffff',
  },

  listContainer: {
    flex: 1,
  },

  sectionTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
    width: '100%',
    paddingHorizontal: 40,
  },

  sectionTitleIconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  sectionTitleIcon: {
    width: 31,
    height: 31,
    tintColor: '#212121',
  },

  sectionTitle: {
    fontSize: 16,
    color: '#212121',
    fontWeight: 'bold',
  },

  itemsRow: {
    width: '100%',
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 40,
    justifyContent: 'space-between',
  },

  sectionItem: {
    width: 90,
    height: 90,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
  },

  sectionItemPlaceholder: {
    width: 90,
    height: 90,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },

  sectionItemIconContainer: {
    height: 50,
    width: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },

  sectionItemIcon: {
    width: 31,
    height: 31,
    tintColor: Color.primary,
  },

  sectionItemTitleContainer: {
    height: 40,
    width: 90,
    alignItems: 'center',
  },
  sectionItemTitle: {
    fontSize: 14,
    color: '#313131',
    textAlign: 'center',
  },
});
