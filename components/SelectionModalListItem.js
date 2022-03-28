/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, Pressable} from 'react-native';
import CheckBox from 'react-native-check-box';

class SelectionModalListItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const isLast = this.props?.isLast ? this.props.isLast : false;
    return (
      <Pressable
        onPress={() => {
          const onClicked = this.props?.onClicked;
          if (onClicked) {
            onClicked();
          }
        }}
        android_ripple={{color: '#E0E0E0'}}
        style={[
          styles.container,
          !isLast
            ? {borderBottomColor: 'rgba(66,66,66,0.4)', borderBottomWidth: 1}
            : null,
        ]}>
        {/* <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            resizeMode={'contain'}
            source={this.props.icon}
          />
        </View> */}
        <Text style={styles.text} numberOfLines={1}>
          {this.props.title}
        </Text>

        <View style={styles.checkBoxContainer}>
          <CheckBox
            style={{with: 25, height: 25}}
            isChecked={this.props.checked}
            checkBoxColor={'#212121'}
            checkedCheckBoxColor={'#212121'}
            onClick={() => {
              const onClicked = this.props?.onClicked;
              if (onClicked) {
                onClicked();
              }
            }}
          />
        </View>
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  imageContainer: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },

  image: {
    width: 25,
    height: 25,
    tintColor: '#212121',
  },

  text: {
    flex: 1,
    color: '#212121',
    fontSize: 14,
    marginLeft: 10,
  },

  checkBoxContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SelectionModalListItem;
