/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Image,
  Linking,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {connect} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {
  request,
  PERMISSIONS,
  RESULTS,
  checkMultiple,
  check,
} from 'react-native-permissions';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Snackbar from 'react-native-snackbar';
import uuid from 'react-native-uuid';
import Header from '../components/Header';

import {
  Button as PaperButton,
  Checkbox,
  TextInput as TextInputPaper,
} from 'react-native-paper';
import {CATEGORY, Color, Theme} from '../utils/Constants';
import MessageModal from '../components/messageModal';
import ImageModal from '../components/ImageModal';
import Item from '../utils/Item';
import {setItemsAction} from '../redux/actions/action';
import SelectionModal from '../components/SelectionModal';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {Easing} from 'react-native-reanimated';

const cameraOptions = {
  mediaType: 'camera',
  quality: 0.8,
};

const galleryOptions = {
  mediaType: 'photo',
  quality: 0.8,
};

class ItemDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showErrorItemName: false,
      showErrorCategory: false,
      showErrorLastDate: false,
      showErrorAmount: false,
      dateObject: null,
      hasLastDate: false,
      isFocusedTest: false,
      isDatePickerVisible: false,
      choosenDate: '',
      itemName: '',
      categoryName: '',
      amount: '',
      ChoosenImageURI: '',

      showMessageModal: false,
      messageModalTitle: '',
      messageModalText: '',
      messageModalButtons: [],

      showImageModal: false,
      snapPoints: [170, 170],
      showBottomSheet: false,
    };
  }

  componentDidMount() {}

  render() {
    //TODO: correct
    // hide keyboard onBlur
    // test
    //console.log(this.state.itemName);
    //console.log(this.state.categoryName);
    //console.log(this.state.amount);

    //console.log(this.props.items.items);

    return (
      <View style={styles.container}>
        <StatusBar animated={true} barStyle={'light-content'} />
        <ScrollView style={styles.scrollView}>
          <View style={styles.itemImageContainer}>
            <TouchableWithoutFeedback
              onPress={() => {
                if (this.state.ChoosenImageURI) {
                  this.setState({showImageModal: true});
                }
              }}>
              <View style={styles.itemImageInnerContainer}>
                {this.state.ChoosenImageURI ? (
                  <Image
                    style={styles.itemImage}
                    resizeMode={'cover'}
                    source={
                      this.state.ChoosenImageURI !== ''
                        ? {uri: this.state.ChoosenImageURI}
                        : null
                    }></Image>
                ) : (
                  <Image
                    style={{width: 36, height: 36, tintColor: '#000000'}}
                    resizeMode={'contain'}
                    source={require('../utils/img/image.png')}></Image>
                )}

                <TouchableOpacity
                  activeOpacity={0.9}
                  style={styles.iconContainer}
                  onPress={() => {
                    this.setState({showBottomSheet: true});
                    //this.checkCameraPermission();
                  }}>
                  <Image
                    style={styles.icon}
                    resizeMode="contain"
                    source={require('../utils/img/camera.png')}></Image>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>

          <View style={styles.card}>
            <View style={styles.cardContentColumn}>
              <View style={styles.inputContainer}>
                <TextInputPaper
                  error={this.state.showErrorItemName}
                  mode={'flat'}
                  label="Eşya İsmi"
                  value={this.state.itemName}
                  onChangeText={text => this.setState({itemName: text})}
                  placeholder={''}
                  style={{
                    width: '100%',
                    height: 60,
                    fontSize: 15,
                    backgroundColor: '#ffffff',
                  }}
                  onFocus={() => {
                    if (this.state.showErrorItemName) {
                      this.setState({showErrorItemName: false});
                    }
                  }}
                  outlineColor={'#212121'}
                  theme={{
                    roundness: 10,
                    colors: {
                      text: '#212121',
                      placeholder: '#424242',
                      primary: '#212121',
                      underlineColor: '#212121',
                      error: Color.primary,
                    },
                  }}
                  right={
                    true ? (
                      <TextInputPaper.Icon
                        size={15}
                        style={{
                          marginTop: 28,
                          marginRight: -10,
                        }}
                        name="pencil"
                        color={'#212121'}
                      />
                    ) : null
                  }
                />
              </View>
              <View style={styles.inputContainer}>
                <View style={styles.row}>
                  <TextInputPaper
                    error={this.state.showErrorCategory}
                    mode={'flat'}
                    label="Kategori"
                    showSoftInputOnFocus={false}
                    caretHidden={true}
                    placeholder={''}
                    value={this.state.categoryName}
                    //onChangeText={text => this.setState({categoryName: text})}
                    style={{
                      width: '100%',
                      height: 60,
                      flex: 4,
                      fontSize: 15,
                      backgroundColor: '#fff',
                    }}
                    onFocus={() => {
                      this.setState({isSelectionModalVisible: true});
                      if (this.state.showErrorCategory) {
                        this.setState({showErrorCategory: false});
                      }
                    }}
                    outlineColor={'#212121'}
                    theme={{
                      roundness: 10,
                      colors: {
                        text: '#212121',
                        placeholder: '#424242',
                        primary: '#212121',
                        underlineColor: '#212121',
                        error: Color.primary,
                      },
                    }}
                    right={
                      true ? (
                        <TextInputPaper.Icon
                          size={24}
                          style={{marginTop: 28, marginRight: -10}}
                          name="chevron-down"
                          color={'#212121'}
                        />
                      ) : null
                    }
                  />
                  <TextInputPaper
                    mode={'flat'}
                    maxLength={7}
                    label="Adet"
                    keyboardType={'number-pad'}
                    error={this.state.showErrorAmount}
                    placeholder={''}
                    value={this.state.amount}
                    onChangeText={text =>
                      this.setState({amount: text.replace(/[^0-9]/g, '')})
                    }
                    onFocus={() => {
                      if (this.state.showErrorAmount) {
                        this.setState({showErrorAmount: false});
                      }
                    }}
                    right={
                      true ? (
                        <TextInputPaper.Icon
                          size={18}
                          style={{marginTop: 28, marginRight: -10}}
                          name="numeric"
                          color={'#212121'}
                        />
                      ) : null
                    }
                    style={{
                      width: '100%',
                      height: 60,
                      flex: 2,
                      backgroundColor: '#fff',
                      marginLeft: 5,
                      fontSize: 14,
                    }}
                    outlineColor={'#212121'}
                    theme={{
                      roundness: 10,
                      colors: {
                        text: '#212121',
                        placeholder: '#424242',
                        primary: '#212121',
                        underlineColor: '#212121',
                        error: Color.primary,
                      },
                    }}
                  />
                </View>
              </View>
              <View style={styles.inputContainer}>
                <View style={styles.textWrapper}>
                  <Text style={styles.question}>
                    Ürünün son kullanma tarihi var mı?
                  </Text>
                </View>

                <View style={styles.row}>
                  <View style={styles.checkboxGroup}>
                    <Text style={{color: '#212121'}}>Var</Text>
                    <Checkbox
                      onPress={() => {
                        this.setState({hasLastDate: true});
                      }}
                      color={Color.primary}
                      uncheckedColor={'#424242'}
                      status={
                        this.state.hasLastDate ? 'checked' : 'unchecked'
                      }></Checkbox>
                  </View>
                  <View style={styles.checkboxGroup}>
                    <Text style={{color: '#212121'}}>Yok</Text>
                    <Checkbox
                      onPress={() => {
                        this.setState({
                          hasLastDate: false,
                          choosenDate: '',
                          dateObject: null,
                        });
                      }}
                      uncheckedColor={'#424242'}
                      color={Color.primary}
                      status={
                        !this.state.hasLastDate ? 'checked' : 'unchecked'
                      }></Checkbox>
                  </View>
                </View>
              </View>

              {this.state.hasLastDate ? (
                <View style={styles.inputContainer}>
                  <TextInputPaper
                    error={this.state.showErrorLastDate}
                    mode={'flat'}
                    label="Son Kullanma Tarihi"
                    ref={ref => (this.dateInputRef = ref)}
                    showSoftInputOnFocus={false}
                    autoCorrect={false}
                    caretHidden={true}
                    onFocus={() => {
                      this.dateInputRef.blur();
                      this.showDatePicker();
                      if (this.state.showErrorLastDate) {
                        this.setState({showErrorLastDate: false});
                      }
                    }}
                    placeholder={''}
                    value={this.state.choosenDate}
                    style={{
                      width: '100%',
                      height: 60,
                      fontSize: 15,
                      backgroundColor: '#ffffff',
                    }}
                    outlineColor={'#424242'}
                    theme={{
                      roundness: 10,
                      colors: {
                        text: '#212121',
                        placeholder: '#424242',
                        primary: '#212121',
                        underlineColor: '#212121',
                        error: Color.primary,
                      },
                    }}
                    right={
                      true ? (
                        <TextInputPaper.Icon
                          size={18}
                          style={{marginTop: 28, marginRight: -10}}
                          name="calendar-month"
                          color={'#212121'}
                        />
                      ) : null
                    }
                  />
                </View>
              ) : null}
            </View>
          </View>
          <View
            style={{
              ...styles.card,
              ...{backgroundColor: 'transparent', elevation: 0},
            }}>
            <View style={styles.cardContentRow}>
              <View style={styles.buttonContainer}>
                <View style={styles.buttonWrapper}>
                  <PaperButton
                    style={{marginRight: 2, elevation: 0}}
                    icon="floppy"
                    labelStyle={{color: '#fff'}}
                    mode="contained"
                    color={Color.primary}
                    onPress={() => {
                      console.log('record item');
                      this.validateItem();
                    }}>
                    Kaydet
                  </PaperButton>
                </View>
                <View style={styles.buttonWrapper}>
                  <PaperButton
                    style={{
                      marginLeft: 2,
                      borderColor: Color.primary,
                      borderWidth: 1,
                      elevation: 0,
                    }}
                    icon="delete"
                    labelStyle={{color: Color.primary}}
                    mode="outlined"
                    onPress={() => {
                      console.log('clear pressed');
                    }}
                    outlineColor={Color.primary}
                    color={Color.primary}>
                    Temizle
                  </PaperButton>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        <DateTimePickerModal
          isVisible={this.state.isDatePickerVisible}
          mode="date"
          onConfirm={this.handleConfirm}
          onCancel={this.hideDatePicker}
          isDarkModeEnabled={true}
          pickerContainerStyleIOS={{
            backgroundColor: Color.primary,
            borderRadius: 15,
            color: Color.primary,
          }}
        />
        {this.state.showMessageModal ? (
          <MessageModal
            visible={true}
            title={this.state.messageModalTitle}
            text={this.state.messageModalText}
            buttons={this.state.messageModalButtons}
            onClosed={() => {
              this.setState({
                showMessageModal: false,
                messageModalTitle: '',
                messageModalText: '',
                messageModalButtons: [],
              });
            }}
          />
        ) : null}
        {this.state.showImageModal ? (
          <ImageModal
            visible={true}
            onClose={() => this.setState({showImageModal: false})}
            imageSource={
              this.state.ChoosenImageURI ? this.state.ChoosenImageURI : null
            }
          />
        ) : null}
        {this.state.isSelectionModalVisible ? (
          <SelectionModal
            onConfirm={() => {
              this.setState({isSelectionModalVisible: false});
            }}
            setCategory={category => {
              console.log(category, 'received category');
              const selectedCategory = this.mapCategory(category);
              this.setState({categoryName: selectedCategory});
            }}
          />
        ) : null}
        <Header
          leftIconPressed={() => {
            this.props.navigation.pop();
          }}
          theme={Theme.DARK}
          hasBorder={false}
          //backgroundColor={'#000000'}
          headerTitle={'Yeni Eşya'}
          headerLeftIcon={require('../utils/img/left.png')}
        />
        {this.state.showBottomSheet ? (
          <BottomSheet
            ref={ref => (this.bottomSheet = ref)}
            index={1}
            snapPoints={this.state.snapPoints}
            animateOnMount={true}
            enableOverDrag={false}
            handleComponent={null}
            enablePanDownToClose={true}
            onClose={() => {
              setTimeout(() => {
                this.setState({showBottomSheet: false});
              }, 200);
            }}
            backdropComponent={props => {
              return (
                <BottomSheetBackdrop
                  {...props}
                  enableTouchThrough={true}
                  closeOnPress={true}
                  opacity={0.3}></BottomSheetBackdrop>
              );
            }}
            backgroundComponent={() => <View style={styles.contentContainer} />}
            animationConfigs={{
              duration: 200,
              easing: Easing.inOut(Easing.ease),
            }}>
            <View style={styles.modalHeaderContainer}>
              <Text style={styles.modalHeader}>Eşya Fotoğrafı</Text>
            </View>
            <View style={styles.modalButtonsContainer}>
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity
                  onPress={() => {
                    if (this.bottomSheet) {
                      this.bottomSheet.close();
                    }

                    this.setState({
                      showBottomSheet: false,
                      ChoosenImageURI: null,
                    });
                  }}
                  activeOpacity={0.9}
                  style={[styles.modalButton, {backgroundColor: '#e84d2f'}]}>
                  <Image
                    style={styles.modalButtonIcon}
                    source={require('../utils/img/delete.png')}
                    resizeMode={'contain'}></Image>
                </TouchableOpacity>
                <View style={styles.modalButtonTextContainer}>
                  <Text style={styles.modalButtonText}>Fotoğrafı Kaldır</Text>
                </View>
              </View>
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity
                  onPress={() => {
                    if (this.bottomSheet) {
                      this.bottomSheet.close();
                    }

                    this.setState({showBottomSheet: false});

                    this.checkGalleryPermission();
                  }}
                  activeOpacity={0.9}
                  style={[styles.modalButton, {backgroundColor: '#9937a3'}]}>
                  <Image
                    style={styles.modalButtonIcon}
                    source={require('../utils/img/image.png')}
                    resizeMode={'contain'}></Image>
                </TouchableOpacity>
                <View style={styles.modalButtonTextContainer}>
                  <Text style={styles.modalButtonText}>Galeri</Text>
                </View>
              </View>
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity
                  onPress={() => {
                    if (this.bottomSheet) {
                      this.bottomSheet.close();
                    }

                    this.setState({showBottomSheet: false});
                    this.checkCameraPermission();
                  }}
                  activeOpacity={0.9}
                  style={[styles.modalButton, {backgroundColor: '#fec226'}]}>
                  <Image
                    style={styles.modalButtonIcon}
                    source={require('../utils/img/camera.png')}
                    resizeMode={'contain'}></Image>
                </TouchableOpacity>
                <View style={styles.modalButtonTextContainer}>
                  <Text style={styles.modalButtonText}>Kamera</Text>
                </View>
              </View>
            </View>
          </BottomSheet>
        ) : null}
      </View>
    );
  }

  mapCategory = category => {
    if (category === CATEGORY.none) {
      return '';
    }
    if (category === CATEGORY.health) {
      return 'Sağlık';
    }
    if (category === CATEGORY.defence) {
      return 'Savunma';
    }

    if (category === CATEGORY.clothing) {
      return 'Giyim';
    }

    if (category === CATEGORY.food) {
      return 'Gıda';
    }

    if (category === CATEGORY.other) {
      return 'Diğer';
    }
  };

  validateItem = () => {
    let flag = true;
    if (this.state.itemName === '') {
      this.setState({showErrorItemName: true});
      flag = false;
    }

    if (this.state.categoryName === '') {
      this.setState({showErrorCategory: true});
      flag = false;
    }

    if (this.state.amount === '') {
      this.setState({showErrorAmount: true});
      flag = false;
    }

    if (this.state.hasLastDate && this.state.choosenDate === '') {
      this.setState({showErrorLastDate: true});
      flag = false;
    }

    if (!flag) {
      Snackbar.show({
        text: 'Lütfen boşlukları doldurunuz',
        duration: Snackbar.LENGTH_SHORT,
        action: {
          text: 'TAMAM',
          textColor: 'green',
          onPress: () => {},
        },
      });
      return;
    }

    let date = null;

    if (this.state.hasLastDate) {
      date = this.state.dateObject;
    }
    let img = null;

    if (this.state.ChoosenImageURI !== '') {
      img = this.state.ChoosenImageURI;
    }

    const item = new Item(
      uuid.v4(),
      this.state.itemName,
      this.state.amount,
      date,
      img,
      this.state.categoryName,
    );

    //console.log(item);
    // redux call

    this.props.setItem(item);
    this.props.navigation.pop();
  };

  showDatePicker = () => {
    this.setState({isDatePickerVisible: true});
  };

  hideDatePicker = () => {
    this.dateInputRef.blur();
    this.setState({isDatePickerVisible: false});
  };

  handleConfirm = date => {
    this.dateInputRef.blur();
    console.warn('A date has been picked: ', date);
    this.hideDatePicker();
    const dateObj = new Date(date);

    const Currentdate =
      dateObj.getDate() +
      '.' +
      (dateObj.getMonth() + 1) +
      '.' +
      dateObj.getFullYear();

    this.setState({choosenDate: Currentdate, dateObject: dateObj});
  };

  checkPermissions = () => {
    if (Platform.OS !== 'android') {
      return;
    }

    checkMultiple([
      PERMISSIONS.ANDROID.CAMERA,
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    ]).then(result => {
      if (
        !result ||
        !result[PERMISSIONS.ANDROID.CAMERA] ||
        !result[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE]
      ) {
        console.log('could not get any result. Please try later.');
      }

      if (
        result[PERMISSIONS.ANDROID.CAMERA] === RESULTS.GRANTED &&
        result[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] === RESULTS.GRANTED
      ) {
        console.log('granted for both permissions');
        // do smthing here
      }
    });
  };

  checkCameraPermission = () => {
    if (Platform.OS !== 'android') {
      return;
    }

    check(PERMISSIONS.ANDROID.CAMERA)
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            this.setState({
              showMessageModal: true,
              messageModalTitle: 'Kamera İzni',
              messageModalText: 'Cihazınız kamera özelliğine sahip değildir.',
              messageModalButtons: [{text: 'Kapat', style: 'cancel'}],
            });
            break;
          case RESULTS.DENIED:
            this.setState({
              showMessageModal: true,
              messageModalTitle: 'Kamera',
              messageModalText:
                'Kamera özelliğini kullanmak ve galeriye erişmek için izin vermeniz gerekir.',
              messageModalButtons: [
                {
                  text: 'Tamam',
                  onPress: () => {
                    this.requestCameraPermission();
                  },
                },

                {text: 'Şimdi Değil', style: 'cancel'},
              ],
            });
            break;
          case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are possible');
            break;
          case RESULTS.GRANTED:
            // permission granted for camera
            launchCamera(cameraOptions, response => {
              if (response) {
                this.handleCameraResponse(response);
              }
            });

            break;
          case RESULTS.BLOCKED:
            this.setState({
              showMessageModal: true,
              messageModalTitle: 'Kameranıza erişim izni verin.',
              messageModalText:
                'İzin vermek için Ayarlar > DepremÇantası Konumuna gidin',
              messageModalButtons: [
                {
                  text: 'Ayarlar',
                  onPress: () => {
                    Linking.openSettings();
                  },
                },

                {text: 'Şimdi Değil', style: 'cancel'},
              ],
            });
            break;
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  checkGalleryPermission = () => {
    if (Platform.OS !== 'android') {
      return;
    }

    check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            this.setState({
              showMessageModal: true,
              messageModalTitle: 'Galeri İzni',
              messageModalText: 'Galerinize ulaşılamamaktadır.',
              messageModalButtons: [{text: 'Kapat', style: 'cancel'}],
            });
            break;
          case RESULTS.DENIED:
            this.setState({
              showMessageModal: true,
              messageModalTitle: 'Galeri',
              messageModalText:
                'Fotoğraf Galerisine erişmek için izin vermeniz gerekir.',
              messageModalButtons: [
                {
                  text: 'Tamam',
                  onPress: () => {
                    this.requestGalleryPermission();
                  },
                },

                {text: 'Şimdi Değil', style: 'cancel'},
              ],
            });
            break;
          case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are possible');
            break;

          case RESULTS.GRANTED:
            // permission granted for camera
            launchImageLibrary(galleryOptions, response => {
              if (response) {
                this.handleGalleryResponse(response);
              }
            });

            break;
          case RESULTS.BLOCKED:
            this.setState({
              showMessageModal: true,
              messageModalTitle: 'Fotoğraf Galerinize erişim izni verin.',
              //TODO: update the name when the application name changes.
              messageModalText:
                'İzin vermek için Ayarlar > DepremÇantası Konumuna gidin',
              messageModalButtons: [
                {
                  text: 'Ayarlar',
                  onPress: () => {
                    Linking.openSettings();
                  },
                },

                {text: 'Şimdi Değil', style: 'cancel'},
              ],
            });
            break;
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  requestCameraPermission = async () => {
    try {
      await request(PERMISSIONS.ANDROID.CAMERA).then(() => {
        this.checkCameraPermission();
      });
    } catch (e) {
      console.error(e);
    }
  };

  requestGalleryPermission = async () => {
    try {
      await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE).then(() => {
        this.checkGalleryPermission();
      });
    } catch (e) {
      console.error(e);
    }
  };

  handleCameraResponse = response => {
    if (response?.didCancel) {
      return;
    }

    if (!response?.assets) {
      return;
    }

    this.setState({
      ChoosenImageURI: response.assets[0].uri,
    });
  };

  handleGalleryResponse = response => {
    if (response?.didCancel) {
      return;
    }

    if (!response?.assets) {
      return;
    }
    this.setState({
      ChoosenImageURI: response.assets[0].uri,
    });
  };

  renderBackdrop = props => {
    return (
      <BottomSheetBackdrop
        {...props}
        enableTouchThrough={true}
        closeOnPress={true}
        opacity={0.9}
      />
    );
  };
}

const mapStateToProps = state => {
  return {
    items: state.items,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setItem: item => {
      dispatch(setItemsAction(item));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps, null)(ItemDetails);

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#f7f9f8',
  },

  contentContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },

  itemImageContainer: {
    height: 200,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 70,
  },
  itemImageInnerContainer: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EBEBEB',
    borderRadius: 75,
    borderWidth: 2,
    borderColor: '#000000',
  },

  itemImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'transparent',
  },

  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 44,
    height: 44,
    borderRadius: 22,
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#000000',
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: '#ffffff',
  },

  scrollView: {
    padding: 15,
    backgroundColor: '#ebebeb',
  },

  card: {
    width: '100%',
    marginBottom: 10,
    borderRadius: 15,
    backgroundColor: '#ffffff',
    paddingVertical: 20,
  },

  cardContentRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#ffffff',
    paddingHorizontal: 5,
    paddingVertical: 15,
    borderRadius: 10,
  },
  cardContentColumn: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 5,
    paddingVertical: 10,
  },

  imageContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },

  image: {
    width: 70,
    height: 70,
  },

  buttonContainer: {
    flex: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  imagePressable: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: 'transparent',
    zIndex: 4,
  },

  button: {
    marginLeft: 10,
  },
  buttonWrapper: {
    width: '45%',
  },

  inputContainer: {
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },

  textWrapper: {
    width: '100%',
    marginVertical: 10,
  },

  question: {
    color: '#212121',
    marginLeft: 12,
  },

  checkboxGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
  },

  modalHeaderContainer: {
    height: 50,
    width: '100%',
    justifyContent: 'center',
  },

  modalHeader: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#212121',
    marginLeft: 20,
  },

  modalButtonsContainer: {
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  modalButtonContainer: {
    height: 100,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  modalButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: Color.primary,
    marginHorizontal: 30,
  },
  modalButtonIcon: {
    width: 22,
    height: 22,
    tintColor: '#ffffff',
  },

  modalButtonTextContainer: {
    marginTop: 5,
    height: 40,
    maxWidth: 70,
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 14,
    color: '#424242',
    textAlign: 'center',
  },
});
