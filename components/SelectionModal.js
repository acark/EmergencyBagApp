/* eslint-disable react/self-closing-comp */
import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Modal,
  Pressable,
  Platform,
  Animated,
  ScrollView,
} from 'react-native';
import {CATEGORY} from '../utils/Constants';

import SelectionModalListItem from './SelectionModalListItem';

class SelectionModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animatedColor: new Animated.Value(0),
      category: CATEGORY.other,
    };
  }

  componentDidMount() {
    //start animation
  }
  render() {
    //console.log(this.state.category);
    return (
      <Modal
        ref={ref => (this.modalRef = ref)}
        visible={true}
        animationType={'fade'}
        statusBarTranslucent={true}
        transparent={true}>
        <View style={styles.wrapper}>
          <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <SelectionModalListItem
                title="Sağlık"
                icon={require('../utils/img/health.png')}
                isLast={false}
                checked={this.state.category === CATEGORY.health ? true : false}
                onClicked={() => {
                  this.setState({category: CATEGORY.health});
                }}
              />

              <SelectionModalListItem
                title="Hayatta Kalma"
                icon={require('../utils/img/tools.png')}
                isLast={false}
                checked={
                  this.state.category === CATEGORY.survival ? true : false
                }
                onClicked={() => {
                  this.setState({category: CATEGORY.survival});
                }}
              />
              <SelectionModalListItem
                title="Gıda"
                icon={require('../utils/img/food.png')}
                isLast={false}
                checked={this.state.category === CATEGORY.food ? true : false}
                onClicked={() => {
                  this.setState({category: CATEGORY.food});
                }}
              />
              <SelectionModalListItem
                title="Savunma"
                icon={require('../utils/img/defence.png')}
                isLast={false}
                checked={
                  this.state.category === CATEGORY.defence ? true : false
                }
                onClicked={() => {
                  this.setState({category: CATEGORY.defence});
                }}
              />
              <SelectionModalListItem
                title="Giyim"
                icon={require('../utils/img/dress.png')}
                isLast={false}
                checked={
                  this.state.category === CATEGORY.clothing ? true : false
                }
                onClicked={() => {
                  this.setState({category: CATEGORY.clothing});
                }}
              />
              <SelectionModalListItem
                title="Diğer"
                icon={require('../utils/img/add.png')}
                isLast={true}
                checked={this.state.category === CATEGORY.other ? true : false}
                onClicked={() => {
                  this.setState({category: CATEGORY.other});
                }}
              />
            </ScrollView>
          </View>
          <View style={[styles.container, {marginTop: 15}]}>
            <View style={styles.buttonContainer}>
              <Pressable
                style={({pressed}) => [
                  {
                    backgroundColor:
                      Platform.OS === 'android'
                        ? 'transparent'
                        : pressed
                        ? '#F1F1F1'
                        : 'transparent',
                  },

                  {
                    //width: '100%',
                    height: 60,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 5,
                    backgroundColor: '#212121',
                  },
                ]}
                onPress={() => {
                  const setCategory = this.props?.setCategory;
                  if (setCategory) {
                    this.props.setCategory(this.state.category);
                  }

                  const onConfirm = this.props?.onConfirm;
                  if (onConfirm) {
                    this.props.onConfirm();
                  }
                }}
                android_ripple={{color: '#CFD8DC', borderRadius: 5}}>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>TAMAM</Text>
                </View>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
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
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 5,
    overflow: 'hidden',
    paddingVertical: 5,
  },
  buttonContainer: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },

  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    width: '100%',
    backgroundColor: 'transparent',
    borderRadius: 5,
    paddingHorizontal: 10,
  },

  buttonText: {
    fontSize: 15,
    color: '#fff',
  },
});

export default SelectionModal;
