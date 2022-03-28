/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Modal,
  StyleSheet,
  Image,
  Text,
  Pressable,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';

class MessageModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: props.visible,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.visible !== nextProps.visible) {
      if (nextProps.visible) {
        this.open();
      } else {
        this.close();
      }
      return false;
    }

    return (
      this.state.modalVisible !== nextState.modalVisible ||
      this.props.buttons !== nextProps.buttons ||
      this.props.image !== nextProps.image ||
      this.props.title !== nextProps.title ||
      this.props.text !== nextProps.text ||
      this.props.text !== nextProps.closeOnOutside ||
      this.props.text !== nextProps.closeOnCancelPress ||
      this.props.text !== nextProps.closeOnBackPress
    );
  }

  render() {
    const buttons = [];
    if (this.props.buttons) {
      for (let i = 0; i < this.props.buttons.length; i++) {
        let isLast = i === this.props.buttons.length - 1;
        const onPress = this.props.buttons[i]?.onPress;
        let style = this.props.buttons[i]?.style;
        let text = this.props.buttons[i]?.text;

        buttons.push(
          <View key={i} style={isLast ? styles.buttonBottom : styles.button}>
            <Pressable
              style={({pressed}) => [
                {
                  backgroundColor:
                    Platform.OS === 'android'
                      ? '#fff'
                      : pressed
                      ? style === 'cancel'
                        ? '#FFEBEE77'
                        : '#F1F1F1'
                      : '#fff',
                },
                styles.pressable,
              ]}
              onPress={() => {
                if (style === 'cancel') {
                  if (this.props.closeOnCancelPress) {
                    this.close();
                  }
                } else {
                  if (this.props.closeOnDefaultPress) {
                    this.close();
                  }
                }

                if (onPress) {
                  onPress();
                }
              }}
              android_ripple={{
                color: style === 'cancel' ? '#FFEBEE' : '#E3F2FD',
                borderless: true,
              }}>
              <Text
                style={
                  style === 'cancel'
                    ? styles.buttonTextCancel
                    : styles.buttonText
                }>
                {text}
              </Text>
            </Pressable>
          </View>,
        );
      }
    }

    return (
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={this.state.modalVisible}
        statusBarTranslucent={true}
        onRequestClose={() => {
          if (this.props.closeOnBackPress) {
            this.close();
          }
        }}>
        <TouchableWithoutFeedback
          accessible={false}
          onPress={() => {
            if (this.props.closeOnOutside) {
              this.close();
            }
          }}>
          <View style={styles.shadow}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.container}>
                {this.props.image ? (
                  <View style={styles.imageContainer}>
                    <Image
                      resizeMode="contain"
                      style={[
                        styles.image,
                        {
                          tintColor: this.props.imageColor
                            ? this.props.imageColor
                            : '#1976D2',
                        },
                      ]}
                      source={this.props.image}
                    />
                  </View>
                ) : (
                  <View style={styles.dummy} />
                )}
                {this.props.title ? (
                  <Text style={styles.title}>{this.props.title}</Text>
                ) : null}
                {this.props.text ? (
                  <Text style={styles.text}>{this.props.text}</Text>
                ) : null}
                {buttons}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }

  open = () => {
    if (!this.state.modalVisible) {
      this.setState({modalVisible: true});

      const onOpened = this.props?.onOpened;
      if (onOpened) {
        onOpened();
      }
    }
  };

  close = () => {
    if (this.state.modalVisible) {
      this.setState({modalVisible: false});

      const onClosed = this.props?.onClosed;
      if (onClosed) {
        onClosed();
      }
    }
  };
}

MessageModal.propTypes = {
  image: PropTypes.any,
  buttons: PropTypes.arrayOf(PropTypes.object),
  text: PropTypes.string,
  title: PropTypes.string,
  closeOnOutside: PropTypes.bool,
  closeOnCancelPress: PropTypes.bool,
  closeOnDefaultPress: PropTypes.bool,
  closeOnBackPress: PropTypes.bool,
  visible: PropTypes.bool,
};

MessageModal.defaultProps = {
  closeOnOutside: true,
  closeOnCancelPress: true,
  closeOnDefaultPress: true,
  closeOnBackPress: true,
  visible: false,
};

export default MessageModal;

const styles = StyleSheet.create({
  shadow: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dummy: {
    height: 25,
  },
  content: {
    flexDirection: 'column',
    flex: 1,
  },
  container: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 15,
    flexDirection: 'column',
    overflow: 'hidden',
  },
  imageContainer: {
    height: 80,
    marginTop: 10,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 30,
    height: 30,
  },
  title: {
    fontSize: 16,
    padding: 10,
    paddingBottom: 20,
    paddingTop: 0,
    color: '#424242',
    textAlign: 'center',
  },
  text: {
    fontSize: 14,
    padding: 10,
    paddingBottom: 30,
    paddingTop: 0,
    color: '#757575',
    textAlign: 'center',
  },
  pressable: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderColor: '#8E8E8E25',
  },
  button: {
    height: 50,
    justifyContent: 'center',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  buttonBottom: {
    height: 50,
    justifyContent: 'center',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  buttonText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#1976D2',
  },
  buttonTextCancel: {
    fontSize: 14,
    textAlign: 'center',
    color: '#E53935',
  },
});
