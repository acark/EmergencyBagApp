/* eslint-disable no-undef */
import React, {Component} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {Color} from '../utils/Constants';

export default class ListItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Pressable
          onPress={this.props.onPress}
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
          android_ripple={{color: '#F1F1F1'}}>
          <View style={styles.item}>
            <View style={styles.itemHeader}>
              <View style={styles.itemNameWrapper}>
                <Text numberOfLines={1} style={styles.itemName}>
                  {this.props.title}
                </Text>
              </View>
              <View style={styles.itemDateWrapper}>
                <Text numberOfLines={1} style={styles.itemDate}>
                  Son Kullanım:
                </Text>
              </View>
            </View>
            <View style={styles.seperatorLine}></View>
            <View style={styles.itemInfo}>
              <View style={styles.itemAmountWrapper}>
                <Text numberOfLines={1} style={styles.itemAmount}>
                  {this.props.amount}
                </Text>
              </View>
              <View style={styles.itemDetaiWrapper}>
                <Text numberOfLines={1} style={styles.itemDetail}>
                  23.07.2023
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
    width: '100%',
    height: 70,

    elevation: 1,
    shadowColor: '#000',
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 20,

    borderLeftColor: Color.primary,
    borderRightColor: '#f1f1f1',
    borderLeftWidth: 6,
    borderRightWidth: 1,
  },

  pressable: {
    flex: 1,
    borderRadius: 4,
  },
  item: {
    flex: 1,

    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  itemHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  itemInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  seperatorLine: {
    width: '100%',
    height: 1,
    backgroundColor: '#ccc',
  },

  itemNameWrapper: {
    flex: 1,
    alignItems: 'flex-start',
  },
  itemDateWrapper: {
    flex: 1,
    alignItems: 'flex-end',
  },
  itemAmountWrapper: {
    flex: 1,
    alignItems: 'flex-start',
  },

  itemDetaiWrapper: {
    flex: 1,
    alignItems: 'flex-end',
  },

  itemName: {
    fontFamily: 'AirbnbCerealBook',
  },
  itemDate: {
    color: '#919191',
    fontFamily: 'AirbnbCerealLight',
  },
  itemAmount: {
    fontFamily: 'AirbnbCerealMedium',
  },

  itemDetail: {
    color: '#919191',
    fontFamily: 'AirbnbCerealLight',
  },
});
