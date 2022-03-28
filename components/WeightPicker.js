/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  View,
  Modal,
  StyleSheet,
  Animated,
  Button,
  TouchableOpacity,
} from 'react-native';
import {FlatList, TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {Color, PICKER_MODE} from '../utils/Constants';

const weight = Array.from(new Array(150), (x, i) => i);
const weight_decimal = Array.from(new Array(10), (x, i) => i);
const height = Array.from(new Array(220), (x, i) => i);

export default class WeightPicker extends Component {
  modalBottom = new Animated.Value(-400);
  constructor(props) {
    super(props);
    this.state = {};
    this.mode =
      this.props?.mode && this.props?.mode === PICKER_MODE.WEIGHT
        ? PICKER_MODE.WEIGHT
        : this.props?.mode === PICKER_MODE.HEIGHT
        ? PICKER_MODE.HEIGHT
        : null;

    this.heightIndex = 18;
    this.weightIndex = 0;
    this.weightDecimalIndex = 0;
  }

  componentDidMount() {
    this.startAnimation();
  }
  render() {
    this.mode = PICKER_MODE.HEIGHT;
    return (
      <Modal
        ref={ref => (this.modalRef = ref)}
        visible={true}
        statusBarTranslucent={true}
        transparent={true}>
        <View style={styles.wrapper}>
          <Animated.View style={[styles.container, {bottom: this.modalBottom}]}>
            <View style={styles.modalHeaderContainer}>
              <Text style={styles.modalHeader}>{this.props?.modalHeader}</Text>
            </View>
            <View style={styles.pickerContainer}>
              {this.mode === PICKER_MODE.WEIGHT && (
                <View style={styles.weightPickerContainer}>
                  <View style={styles.WeightPickerLeft}>
                    <View style={styles.pickerIndicator} pointerEvents="none" />
                    <FlatList
                      style={{flex: 1}}
                      keyExtractor={item => item.index}
                      data={weight}
                      showsVerticalScrollIndicator={false}
                      snapToInterval={32}
                      initialScrollIndex={this.weightIndex}
                      getItemLayout={(data, index) => ({
                        length: 32,
                        offset: 32 * index,
                        index,
                      })}
                      scrollEventThrottle={1}
                      snapToAlignment={'center'}
                      pagingEnabled
                      onScroll={e => {
                        let index = Math.ceil(
                          e.nativeEvent.contentOffset.y / 32,
                        );

                        if (index === this.weightIndex) {
                          return;
                        }

                        this.weightIndex = index;
                      }}
                      contentContainerStyle={{
                        paddingVertical: 63,
                      }}
                      renderItem={item => {
                        return (
                          <View
                            style={{
                              width: '100%',
                              height: 32,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <Text
                              style={{
                                color: '#616161',
                                textAlign: 'center',
                                fontSize: 16,
                                fontWeight: 'bold',
                              }}>
                              {item.item}
                            </Text>
                          </View>
                        );
                      }}
                    />
                  </View>
                  <View style={styles.WeightPickerRight}>
                    <View style={styles.pickerIndicator} pointerEvents="none" />

                    <FlatList
                      style={{flex: 1}}
                      keyExtractor={item => item.index}
                      data={weight_decimal}
                      showsVerticalScrollIndicator={false}
                      getItemLayout={(data, index) => ({
                        length: 32,
                        offset: 32 * index,
                        index,
                      })}
                      initialScrollIndex={this.weightDecimalIndex}
                      snapToInterval={32}
                      scrollEventThrottle={1}
                      snapToAlignment={'center'}
                      pagingEnabled
                      onScroll={e => {
                        let index = Math.ceil(
                          e.nativeEvent.contentOffset.y / 32,
                        );

                        if (index === this.weightDecimalIndex) {
                          return;
                        }

                        this.weightDecimalIndex = index;
                      }}
                      contentContainerStyle={{
                        paddingVertical: 63,
                      }}
                      renderItem={item => {
                        return (
                          <View
                            style={{
                              width: '100%',
                              height: 32,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <Text
                              style={{
                                color: '#616161',
                                textAlign: 'center',
                                fontSize: 16,
                                fontWeight: 'bold',
                              }}>
                              {item.item}
                            </Text>
                          </View>
                        );
                      }}
                    />
                  </View>
                </View>
              )}
              {this.mode === PICKER_MODE.HEIGHT && (
                <View style={styles.heightPickerContainer}>
                  <View style={styles.heightPicker}>
                    <View style={styles.pickerIndicator} />
                    <FlatList
                      style={{flex: 1}}
                      keyExtractor={item => item.index}
                      data={height}
                      getItemLayout={(data, index) => ({
                        length: 32,
                        offset: 32 * index,
                        index,
                      })}
                      showsVerticalScrollIndicator={false}
                      initialScrollIndex={this.heightIndex}
                      snapToInterval={32}
                      scrollEventThrottle={1}
                      onScroll={e => {
                        let index = Math.ceil(
                          e.nativeEvent.contentOffset.y / 32,
                        );

                        if (index === this.heightIndex) {
                          return;
                        }

                        this.heightIndex = index;
                      }}
                      snapToAlignment={'center'}
                      pagingEnabled
                      contentContainerStyle={{
                        paddingVertical: 63,
                      }}
                      renderItem={item => {
                        return (
                          <View
                            style={{
                              width: '100%',
                              height: 32,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <Text
                              style={{
                                color: '#616161',
                                textAlign: 'center',
                                fontSize: 16,
                                fontWeight: 'bold',
                              }}>
                              {item.item}
                            </Text>
                          </View>
                        );
                      }}
                    />
                  </View>
                </View>
              )}
            </View>
            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity
                style={[styles.modalButton, {backgroundColor: Color.primary}]}
                activeOpacity={0.8}
                onPress={() => {
                  this.onClose();
                  const onModalClose = this.props?.onModalClose;

                  if (onModalClose) {
                    setTimeout(() => {
                      onModalClose();
                    }, 100);
                  }
                }}>
                <Text style={styles.modalButtonText}>İptal</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} activeOpacity={0.8}>
                <Text
                  style={styles.modalButtonText}
                  onPress={() => {
                    const onPickerConfirm = this.props?.onPickerConfirm;

                    if (onPickerConfirm) {
                      if (this.mode === PICKER_MODE.WEIGHT) {
                        const weightInfo = {
                          integer: this.weightIndex,
                          decimal: this.weightDecimalIndex,
                        };

                        onPickerConfirm(this.mode, weightInfo);
                      } else if (this.mode === PICKER_MODE.HEIGHT) {
                        onPickerConfirm(this.mode, this.heightIndex);
                      } else {
                        onPickerConfirm(null, null);
                      }
                    }

                    this.onClose();
                    const onModalClose = this.props?.onModalClose;

                    if (onModalClose) {
                      setTimeout(() => {
                        onModalClose();
                      }, 100);
                    }
                  }}>
                  Tamam
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Modal>
    );
  }

  startAnimation = () => {
    Animated.timing(this.modalBottom, {
      toValue: 40,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  onClose = () => {
    Animated.timing(this.modalBottom, {
      toValue: -400,
      duration: 100,
      useNativeDriver: false,
    }).start();
  };
}

const styles = StyleSheet.create({
  wrapper: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  container: {
    backgroundColor: '#fff',
    borderRadius: 15,
    overflow: 'hidden',
    position: 'absolute',
    right: 40,
    left: 40,
  },

  modalHeaderContainer: {
    width: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#616161',
  },

  modalHeader: {
    color: '#616161',
    fontSize: 17,
    fontWeight: 'bold',
  },

  pickerContainer: {
    height: 180,
    width: '100%',
  },

  modalButtonsContainer: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 0.5,
    borderTopColor: '#616161',
    alignItems: 'center',
  },

  modalButton: {
    width: '40%',
    backgroundColor: '#3F51B5', //'rgba(255,71,71,0.4)',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },

  modalButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },

  weightPickerContainer: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },

  heightPickerContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },

  heightPicker: {
    width: '100%',
    height: '100%',
  },

  WeightPickerLeft: {
    width: '40%',
    height: '100%',
  },

  WeightPickerRight: {
    width: '40%',
    height: '100%',
  },

  pickerIndicator: {
    position: 'absolute',
    top: 65,
    right: 0,
    left: 0,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderTopColor: '#616161',
    borderBottomColor: '#616161',
    height: 30,
  },
});
