/* eslint-disable react/self-closing-comp */
import React, {Component} from 'react';
import {
  View,
  Modal,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Pressable,
  Platform,
} from 'react-native';

export default class ImageModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: props.visible,
    };
  }

  render() {
    return (
      <Modal
        animationType={'fade'}
        hardwareAccelerated={Platform.OS === 'android' ? true : null}
        visible={this.state.isVisible}
        statusBarTranslucent={true}
        transparent={true}>
        <TouchableWithoutFeedback onPress={this.props.onClose}>
          <View style={styles.modalWrapper}>
            <View style={styles.modalBody}>
              <Image
                source={{uri: this.props.imageSource}}
                style={styles.image}></Image>
            </View>

            <View style={styles.imageContainer}>
              <Pressable
                onPress={this.props.onClose}
                android_ripple={{
                  color: '#E0E0E0',
                  radius: 32,
                  borderless: true,
                }}>
                <Image
                  style={styles.icon}
                  source={require('../utils/img/left-arrow.png')}></Image>
              </Pressable>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalWrapper: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    backgroundColor: 'rgba(0,0,0,1)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalBody: {
    width: 300,
    height: 300,
    backgroundColor: 'white',
  },

  image: {
    width: '100%',
    height: '100%',
  },

  imageContainer: {
    position: 'absolute',
    top: 60,
    left: 30,
  },
  icon: {
    width: 30,
    height: 30,
    tintColor: '#fff',
  },
});
