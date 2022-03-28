/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import React, {Component} from 'react';
import {Image, Platform, Pressable, StyleSheet, Text, View} from 'react-native';
import {Badge} from 'react-native-paper';
import {Color} from '../utils/Constants';

class ListElement extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={[styles.container, styles.shadow]}>
        <Pressable
          onPress={() => {
            const onPress = this.props?.onPress;

            if (onPress) {
              onPress();
            }
          }}
          style={({pressed}) => [
            {
              backgroundColor:
                Platform.OS === 'android'
                  ? 'transparent'
                  : pressed
                  ? '#F1F1F1'
                  : 'transparent',
            },
            styles.pressable,
          ]}
          android_ripple={{color: '#F1F1F1', borderless: true}}>
          <View style={styles.imageContainer}>
            <Image
              resizeMode="cover"
              source={
                this.props?.imageSource
                  ? this.props.imageSource
                  : require('../utils/img/tool.png')
              }
              style={styles.image}
            />
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.primaryInfoContainer}>
              <Text numberOfLines={1} style={styles.primaryText}>
                {this.props?.itemName ? this.props.itemName : ''}
              </Text>
              <Text numberOfLines={1} style={styles.dateText}>
                {this.props?.itemDate ? this.props.itemDate : ''}
              </Text>
            </View>
            <View style={styles.seperatorContainer}>
              <View style={styles.seperator}></View>
            </View>
            <View style={styles.secondaryInfoContainer}>
              <Text style={styles.secondaryText}>
                {this.props?.category ? this.props.category : ''}
              </Text>
              <View style={styles.amountInfoContainer}>
                <Text style={styles.amountText} numberOfLines={1}>
                  {this.props?.amount ? this.props.amount : 1}
                </Text>
                <Text style={styles.amountText} numberOfLines={1}>
                  {' Adet'}
                </Text>
              </View>
            </View>
          </View>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 75,
    borderRadius: 15,
    backgroundColor: '#FeFeFe',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
    marginBottom: 10,
  },

  pressable: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },

  shadow: {
    shadowColor: '#212121',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },

  imageContainer: {
    width: 75,
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  infoContainer: {
    height: 75,
    flex: 1,
    marginLeft: 10,
  },

  primaryInfoContainer: {
    height: 35,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },

  seperatorContainer: {
    justifyContent: 'center',
    height: 5,
    marginRight: 20,
  },

  seperator: {
    height: 1,
    backgroundColor: '#EEEEEE',
  },

  secondaryInfoContainer: {
    height: 35,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },

  primaryText: {
    color: '#424242',
    fontFamily: 'AirbnbCerealBold',
    fontSize: 13,
    marginTop: 5,
    flex: 1,
    marginRight: 30,
  },
  dateText: {
    color: '#4CAF50',
    fontFamily: 'AirbnbCerealBook',
    fontWeight: 'bold',
    fontSize: 12,
    marginTop: 5,
    marginRight: 20,
  },

  secondaryText: {
    color: '#616161',
    fontFamily: 'AirbnbCerealBook',
    fontWeight: 'bold',
    fontSize: 12,
    marginBottom: 5,
    flex: 1,
  },

  amountInfoContainer: {
    height: 35,
    justifyContent: 'flex-end',
    marginRight: 20,
    alignItems: 'flex-end',
    flex: 1,
    flexDirection: 'row',
  },

  amountText: {
    color: '#616161',
    fontFamily: 'AirbnbCerealBook',
    fontWeight: 'bold',
    fontSize: 12,
    marginBottom: 5,
  },
});

export default ListElement;
