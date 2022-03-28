/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import {useRoute} from '@react-navigation/core';
import React, {Component} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import PropTypes from 'prop-types';
import {Theme} from '../utils/Constants';
import {threadId} from 'worker_threads';

class Header extends Component {
  constructor(props) {
    super(props);
    this.topInset = this.props.insets.top;
    this.bottomInset = this.props.insets.bottom;
  }
  render() {
    const theme = this.props?.theme ? this.props.theme : Theme.LIGHT;
    return (
      <View
        style={[
          styles(theme).container,
          {
            height: 60 + this.topInset,
            backgroundColor: this.props?.backgroundColor
              ? this.props.backgroundColor
              : theme === Theme.LIGHT
              ? '#ffffff'
              : '#000000',

            borderBottomWidth: this.props?.hasBorder ? 1 : 0,
            borderBottomColor: '#EEEEEE',
          },
        ]}>
        <View
          style={[
            styles(theme).headerContainer,
            {
              backgroundColor: this.props?.backgroundColor
                ? this.props.backgroundColor
                : theme === Theme.LIGHT
                ? '#ffffff'
                : '#000000',
            },
          ]}>
          <Pressable
            style={styles(theme).headerLeftIconContainer}
            android_ripple={{color: '#E0E0E0', radius: 27, borderless: true}}
            onPress={() => {
              const leftIconPressed = this.props?.leftIconPressed;

              if (leftIconPressed) {
                leftIconPressed();
              }
            }}>
            {this.props?.headerLeftIcon ? (
              <Image
                style={styles(theme).headerLeftIcon}
                source={
                  this.props?.headerLeftIcon ? this.props.headerLeftIcon : null
                }></Image>
            ) : null}
          </Pressable>
          <View style={styles(theme).headerTitleContainer}>
            <Text style={styles(theme).headerTitle}>
              {this.props?.headerTitle}
            </Text>
          </View>
          <Pressable
            style={styles(theme).headerLeftIconContainer}
            android_ripple={{color: '#E0E0E0', radius: 27, borderless: true}}
            onPress={() => {
              const rightIconPressed = this.props?.rightIconPressed;

              if (rightIconPressed) {
                rightIconPressed();
              }
            }}>
            {this.props?.headerRightIcon ? (
              <Image
                style={styles(theme).headerLeftIcon}
                source={
                  this.props?.headerRightIcon
                    ? this.props.headerRightIcon
                    : null
                }></Image>
            ) : null}
          </Pressable>
        </View>
      </View>
    );
  }
}

Header.propTypes = {
  theme: PropTypes.string,
};

Header.defaultProps = {
  theme: Theme.LIGHT,
};

const styles = theme =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'flex-end',
      left: 0,
      right: 0,
      top: 0,
    },
    headerContainer: {
      height: 60,
      flexDirection: 'row',
      alignItems: 'center',
    },

    headerLeftIconContainer: {
      width: 60,
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerLeftIcon: {
      width: 28,
      height: 28,
      tintColor: theme === Theme.DARK ? '#ffffff' : '#212121',
    },
    headerTitleContainer: {
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    },

    headerTitle: {
      color: theme === Theme.DARK ? '#ffffff' : '#212121',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

function HeaderContainer(props) {
  const insets = useSafeAreaInsets();
  const route = useRoute();

  return <Header {...props} insets={insets} route={route} />;
}

export default HeaderContainer;
