/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  Easing,
  Image,
  ImageBackground,
  TouchableWithoutFeedback,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Animated,
  LogBox,
  Button,
} from 'react-native';
import Header from '../components/Header';
import {BLOOD, Color, Gender, PICKER_MODE, Theme} from '../utils/Constants';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import InfoItem from '../components/InfoItem';
import {useRoute} from '@react-navigation/native';
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import TabSelector from '../components/TabSelector';
import LinearGradient from 'react-native-linear-gradient';

import {connect} from 'react-redux';
import {
  setAge,
  setBloodType,
  setGender,
  setHeight,
  setName,
  setSurname,
  setWeight,
  setWeightDecimal,
} from '../redux/actions/action';

//TODO: check for index
//TODO: dot between weight input

//TODO: name input

//TODO: bottom sheet snap point

const INPUT_TYPES = {
  none: 'none',
  name: 'name',
  gender: 'gender',
  age: 'age',
  height: 'height',
  weight: 'weight',
  blood: 'blood',
};

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('screen').height;

const options = [
  {
    label: 'Erkek',
    value: Gender.male,
  },
  {
    label: 'Kadın',
    value: Gender.female,
  },
];

const ages = Array.from(new Array(99), (x, i) => i + 1);

const slidingConstant = WIDTH - ((30 + 10) * 2 + 8 * 2);
const weight = Array.from(new Array(149), (x, i) => i + 1);
const weight_decimal = Array.from(new Array(10), (x, i) => i);
const height = Array.from(new Array(219), (x, i) => i + 1);

const BLOOD_TYPES = [
  BLOOD.A_POSITIVE,
  BLOOD.A_NEGATIVE,
  BLOOD.B_POSITIVE,
  BLOOD.B_NEGATIVE,
  BLOOD.AB_POSITIVE,
  BLOOD.AB_NEGATIVE,
  BLOOD.O_POSITIVE,
  BLOOD.O_NEGATIVE,
];

class Health extends Component {
  isBottomSheetOpen = false;
  isPressable = false;
  constructor(props) {
    super(props);
    this.topInset = this.props.insets.top;
    this.bottomInset = this.props.insets.bottom;
    this.minSnapPoint = 380 + this.bottomInset;
    this.maxSnapPoint = HEIGHT * 0.75;
    this.snapPoints = [this.minSnapPoint, this.maxSnapPoint];
    this.inputSheetSnapPoint = [
      220 + this.bottomInset,
      220 + this.bottomInset,
      310 + this.bottomInset,
      310 + this.bottomInset,
    ];
    this.ageIndex = this.props.personalInfo.age;
    this.heightIndex = this.props.personalInfo.height;
    this.weightIndex = this.props.personalInfo?.weight;
    this.weightDecimalIndex = this.props.personalInfo?.weightDecimal;

    this.state = {
      flatListX: new Animated.Value(0),
      inputType: INPUT_TYPES.none,
      selectedBloodTypeIndex: this.props.personalInfo?.bloodType,
      //inputs
      selectedGender: this.props.personalInfo?.gender,
      selectedAge: this.props.personalInfo?.age,
      selectedWeight: this.props.personalInfo?.weight,
      selectedWeightDecimal: this.props.personalInfo?.weightDecimal,
      selectedHeight: this.props.personalInfo?.height,
      selectedBloodType: this.props.personalInfo?.bloodType,
    };
  }

  componentDidMount() {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }

  infoHeader = () => {
    return (
      <>
        <View style={styles.infoHeaderContainer}>
          <View style={styles.infoHeaderImageContainer}>
            <Image
              style={styles.avatarImage}
              source={require('../utils/img/userAvatar.png')}
              resizeMode="contain"
            />
          </View>
          <View style={styles.infoHeaderTextContainer}>
            <View style={styles.infoPrimaryTextContainer}>
              <Text style={styles.infoPrimaryText} numberOfLines={1}>
                {this.props?.personalInfo?.name
                  ? this.props?.personalInfo?.name
                  : 'Kullanıcı Adı'}
              </Text>
            </View>
            <View style={styles.infoSecondaryTextContainer}>
              <Text style={styles.infoSecondaryText}>Ek bilgiler</Text>
            </View>
          </View>
        </View>
        <View style={styles.divider} />
      </>
    );
  };

  render() {
    const gender = this.props?.personalInfo?.gender
      ? this.props.personalInfo.gender
      : Gender.male;
    const age = this.props.personalInfo.age;

    const ageText = age.toString();
    const Userweight = this.props.personalInfo.weight;
    const weightDecimal = this.props.personalInfo.weightDecimal;
    const weightText =
      Userweight.toString() + '.' + weightDecimal.toString() + ' kg';
    const Userheight = this.props.personalInfo.height;
    const heightText = Userheight?.toString();
    const bloodType = this.props.personalInfo?.bloodType;

    return (
      <View style={styles.container}>
        <StatusBar animated={true} barStyle={'light-content'} />

        <ImageBackground
          source={require('../utils/img/healthBackground.jpg')}
          resizeMode="cover"
          style={{
            width: '100%',
            height: HEIGHT - this.minSnapPoint + this.bottomInset,
          }}
        />

        <BottomSheet
          ref={ref => (this.bottomSheet = ref)}
          index={0}
          snapPoints={this.snapPoints}
          animateOnMount={true}
          enableOverDrag={false}
          enableContentPanningGesture={this.state.isEditMode ? false : true}
          enablePanDownToClose={false}
          handleComponent={null}
          onChange={index => {
            if (index === 1) {
              this.isPressable = true;
            } else {
              this.isPressable = false;
            }
          }}
          backdropComponent={props => {
            return (
              <BottomSheetBackdrop
                pressBehavior={'none'}
                {...props}
                opacity={0.5}
              />
            );
          }}
          backgroundComponent={() => <View style={styles.contentContainer} />}>
          <BottomSheetScrollView
            style={{flex: 1}}
            showsVerticalScrollIndicator={false}
            stickyHeaderIndices={[0]}
            contentContainerStyle={{}}>
            {this.infoHeader()}

            <View style={styles.personalInfoContainer}>
              <View style={styles.personalInfoTitleContainer}>
                <Text style={styles.personalInfoTitle}>Kişisel Bilgilerim</Text>
              </View>

              <TouchableOpacity
                activeOpacity={0.8}
                style={{width: '100%'}}
                onPress={() => {
                  if (!this.isPressable) {
                    this.bottomSheet.snapToIndex(1);
                    setTimeout(() => {
                      this.setState({inputType: INPUT_TYPES.gender});
                    }, 210);
                  } else {
                    this.setState({inputType: INPUT_TYPES.gender});
                  }
                }}>
                <InfoItem
                  infoType={'Cinsiyet'}
                  value={gender === Gender.male ? 'Erkek' : 'Kadın'}
                  iconBackgroundColor={'#3F51B5'}
                  iconSource={require('../utils/img/body.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                style={{width: '100%'}}
                onPress={() => {
                  if (!this.isPressable) {
                    this.bottomSheet.snapToIndex(1);
                    setTimeout(() => {
                      this.setState({inputType: INPUT_TYPES.age});
                    }, 210);
                  } else {
                    this.setState({inputType: INPUT_TYPES.age});
                  }
                }}>
                <InfoItem
                  infoType={'Yaş'}
                  value={ageText}
                  iconBackgroundColor={'#FFC107'}
                  iconSource={require('../utils/img/cake.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                style={{width: '100%'}}
                onPress={() => {
                  if (!this.isPressable) {
                    this.bottomSheet.snapToIndex(1);
                    setTimeout(() => {
                      this.setState({inputType: INPUT_TYPES.weight});
                    }, 210);
                  } else {
                    this.setState({inputType: INPUT_TYPES.weight});
                  }
                }}>
                <InfoItem
                  infoType={'Kilo'}
                  value={weightText}
                  iconBackgroundColor={'#2196F3'}
                  iconSource={require('../utils/img/weight.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                style={{width: '100%'}}
                onPress={() => {
                  if (!this.isPressable) {
                    this.bottomSheet.snapToIndex(1);
                    setTimeout(() => {
                      this.setState({inputType: INPUT_TYPES.height});
                    }, 210);
                  } else {
                    this.setState({inputType: INPUT_TYPES.height});
                  }
                }}>
                <InfoItem
                  infoType={'Boy'}
                  value={heightText}
                  iconBackgroundColor={'#4CAF50'}
                  iconSource={require('../utils/img/ruler.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                style={{width: '100%'}}
                onPress={() => {
                  if (!this.isPressable) {
                    this.bottomSheet.snapToIndex(1);
                    setTimeout(() => {
                      this.setState({inputType: INPUT_TYPES.blood});
                    }, 210);
                  } else {
                    this.setState({inputType: INPUT_TYPES.blood});
                  }
                }}>
                <InfoItem
                  infoType={'Kan grubu'}
                  value={this.setBloodTypeText(bloodType)}
                  iconBackgroundColor={'#EF5350'}
                  iconSource={require('../utils/img/blood.png')}
                />
              </TouchableOpacity>
            </View>
          </BottomSheetScrollView>
        </BottomSheet>

        <Header
          leftIconPressed={() => {
            this.props.navigation.pop();
          }}
          theme={Theme.DARK}
          backgroundColor={'transparent'}
          headerTitle={'Sağlık Bilgilerim'}
          headerLeftIcon={require('../utils/img/left.png')}
        />

        {this.state.inputType !== INPUT_TYPES.none ? (
          <BottomSheet
            ref={ref => (this.inputBottomSheet = ref)}
            index={2}
            snapPoints={this.inputSheetSnapPoint}
            animateOnMount={true}
            enableOverDrag={false}
            enableContentPanningGesture={false}
            enablePanDownToClose={false}
            handleComponent={null}
            backdropComponent={props => {
              return (
                <BottomSheetBackdrop
                  pressBehavior={'none'}
                  {...props}
                  opacity={0.5}
                  disappearsOnIndex={-1}
                />
              );
            }}
            backgroundComponent={() => (
              <View style={styles.inputSheetContentContainer} />
            )}>
            <View style={styles.inputModalHeaderContainer}>
              <Text style={styles.inputModalHeader}>
                {this.state.inputType === INPUT_TYPES.gender
                  ? 'Cinsiyet'
                  : this.state.inputType === INPUT_TYPES.age
                  ? 'Yaş'
                  : this.state.inputType === INPUT_TYPES.weight
                  ? 'Kilo'
                  : this.state.inputType === INPUT_TYPES.height
                  ? 'Boy'
                  : this.state.inputType === INPUT_TYPES.blood
                  ? 'Kan Grubu'
                  : ''}
              </Text>
            </View>

            <View style={styles.inputModalContent}>
              {this.state.inputType === INPUT_TYPES.gender && (
                <View style={styles.editItemContainer}>
                  <TabSelector
                    textColor={'#212121'}
                    selectedColor={'#ffffff'}
                    borderRadius={10}
                    fontSize={14}
                    options={options}
                    style={{
                      width: '100%',
                    }}
                    buttonColor={'#3F51B5'}
                    borderWidth={0.5}
                    initial={gender === Gender.male ? 0 : 1}
                    onPress={userGender => {
                      this.setState({
                        selectedGender:
                          userGender === Gender.male
                            ? Gender.male
                            : Gender.female,
                      });
                    }}
                    backgroundColor={'#EBEBEB'}
                  />
                </View>
              )}

              {this.state.inputType === INPUT_TYPES.age && (
                <View style={styles.editItemContainer}>
                  <View
                    style={{
                      height: 50,
                      width: '100%',
                      justifyContent: 'center',
                    }}>
                    <LinearGradient
                      start={{x: 0, y: 0.5}}
                      end={{x: 1, y: 0.5}}
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        height: 50,
                        width: WIDTH / 2 - 100,
                        elevation: 3,
                        //backgroundColor: 'red',
                      }}
                      colors={[
                        'rgba(255, 255, 255, 0.8)',
                        'rgba(255, 255, 255, 0.1)',
                      ]}
                      pointerEvents={'none'}
                    />
                    <View
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        right: (WIDTH - 80) / 2 - 2.5,

                        backgroundColor: 'transparent',
                        width: 0,
                        height: 0,
                        borderStyle: 'solid',
                        borderLeftWidth: 4,
                        borderRightWidth: 4,
                        borderBottomWidth: 8,
                        borderLeftColor: 'transparent',
                        borderRightColor: 'transparent',
                        borderBottomColor: '#212121',
                      }}
                    />
                    <LinearGradient
                      start={{x: 0, y: 1}}
                      end={{x: 1, y: 1}}
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        height: 50,
                        width: WIDTH / 2 - 100,
                        elevation: 3,
                      }}
                      colors={[
                        'rgba(255, 255, 255, 0.1)',
                        'rgba(255, 255, 255, 0.8)',
                      ]}
                      pointerEvents={'none'}
                    />
                    <Animated.FlatList
                      ref={ref => (this.agePicker = ref)}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      data={ages}
                      scrollEventThrottle={1}
                      initialScrollIndex={this.ageIndex - 1}
                      snapToOffsets={[...Array(ages.length)].map(
                        (x, i) => i * 50 - slidingConstant * 0.5,
                      )}
                      getItemLayout={(data, index) => ({
                        length: 50,
                        offset: 50 * index,
                        index,
                      })}
                      snapToAlignment={'center'}
                      pagingEnabled={true}
                      onScroll={Animated.event(
                        [
                          {
                            nativeEvent: {
                              contentOffset: {x: this.state.flatListX},
                            },
                          },
                        ],
                        {
                          useNativeDriver: true,
                          listener: e => {
                            this.handleAgePickerScroll(e);
                          },
                        },
                      )}
                      contentContainerStyle={{
                        alignItems: 'center',
                        //backgroundColor: 'gray',
                        paddingHorizontal: (WIDTH - 80) / 2 - 25,
                      }}
                      keyExtractor={item => item.index}
                      renderItem={(item, index) => {
                        //console.log(item.index);
                        return (
                          <Animated.View
                            style={{
                              width: 50,
                              height: 30,
                              justifyContent: 'center',
                              alignItems: 'center',
                              transform: [
                                {
                                  scale: this.state.flatListX.interpolate({
                                    inputRange: [
                                      (item.index - WIDTH / 100) * 50,
                                      item.index * 50,
                                      (item.index + WIDTH / 100) * 50,
                                    ],
                                    outputRange: [0.65, 1, 0.65],
                                  }),
                                },
                              ],
                            }}>
                            <Text
                              style={{
                                fontSize: 16,
                                textAlign: 'center',
                                fontWeight: 'bold',
                              }}>
                              {item.item}
                            </Text>
                          </Animated.View>
                        );
                      }}
                    />
                  </View>
                </View>
              )}

              {this.state.inputType === INPUT_TYPES.weight && (
                <View style={styles.pickerContainer}>
                  <View style={styles.weightPickerContainer}>
                    <View style={styles.WeightPickerLeft}>
                      <View
                        style={styles.pickerIndicator}
                        pointerEvents="none"
                      />
                      <FlatList
                        style={{flex: 1}}
                        keyExtractor={item => item.index}
                        data={weight}
                        showsVerticalScrollIndicator={false}
                        snapToInterval={32}
                        initialScrollIndex={this.weightIndex - 1}
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

                          if (index + 1 === this.weightIndex) {
                            return;
                          }

                          this.weightIndex = index + 1;
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
                                  color: '#212121',
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
                      <View
                        style={styles.pickerIndicator}
                        pointerEvents="none"
                      />

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
                                  color: '#212121',
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
                </View>
              )}

              {this.state.inputType === INPUT_TYPES.height && (
                <View style={styles.pickerContainer}>
                  <View style={styles.heightPickerContainer}>
                    <View style={styles.heightPicker}>
                      <View style={[styles.pickerIndicator]} />
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

                          if (index + 1 === this.heightIndex) {
                            return;
                          }

                          this.heightIndex = index + 1;
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
                                  color: '#212121',
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
                </View>
              )}

              {this.state.inputType === INPUT_TYPES.blood && (
                <View style={styles.bloodSelectorContainer}>
                  <FlatList
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    numColumns={4}
                    data={BLOOD_TYPES}
                    contentContainerStyle={{
                      paddingHorizontal: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    keyExtractor={(item, index) => String(index)}
                    renderItem={(item, index) => {
                      const isSelected =
                        this.state.selectedBloodTypeIndex === item.index;
                      return (
                        <TouchableOpacity
                          activeOpacity={0.9}
                          onPress={() => {
                            this.setState({selectedBloodTypeIndex: item.index});
                          }}
                          style={{
                            width: WIDTH / 8,
                            height: WIDTH / 8,
                            marginVertical: WIDTH / 20,
                            marginHorizontal: WIDTH / 20,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: isSelected ? '#EF5350' : '#ffffff',
                            borderRadius: 5,
                            elevation: isSelected ? 0 : 1.75,
                            shadowOpacity: 0.5,
                            shadowOffset: {width: 0, height: 2},
                            borderColor: isSelected ? 'transparent' : '#424242',
                          }}>
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: 'bold',
                              textAlign: 'center',
                              color: isSelected ? '#ffffff' : '#212121',
                            }}>
                            {item.item}
                          </Text>
                        </TouchableOpacity>
                      );
                    }}
                  />
                </View>
              )}
            </View>

            <View
              style={[
                styles.inputModalButtonsContainer,
                {bottom: this.bottomInset},
              ]}>
              <TouchableOpacity
                style={styles.inputModalButton}
                activeOpacity={0.8}
                onPress={() => {
                  if (this.inputBottomSheet) {
                    this.inputBottomSheet.close();
                  }

                  setTimeout(() => {
                    this.onInputCancel();
                  }, 200);
                }}>
                <Text style={styles.inputModalButtonText}>İptal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  if (this.inputBottomSheet) {
                    this.inputBottomSheet.close();
                  }

                  setTimeout(() => {
                    this.onInputConfirm();
                  }, 200);
                }}
                style={[styles.inputModalButton, {backgroundColor: '#3F51B5'}]}>
                <Text style={styles.inputModalButtonText}>Tamam</Text>
              </TouchableOpacity>
            </View>
          </BottomSheet>
        ) : null}
      </View>
    );
  }

  onInputConfirm = () => {
    if (this.state.inputType === INPUT_TYPES.age) {
      const setUserAge = this.props.setAge;

      if (setUserAge) {
        setUserAge(this.ageIndex);
      }

      this.setState({
        selectedAge: this.ageIndex,
        inputType: INPUT_TYPES.none,
      });

      return;
    }

    if (this.state.inputType === INPUT_TYPES.gender) {
      const setUserGender = this.props?.setGender;
      const currentSelectedGender = this.state.selectedGender;

      if (setUserGender) {
        try {
          currentSelectedGender === Gender.male
            ? setUserGender(Gender.male)
            : setUserGender(Gender.female);
          this.setState({inputType: INPUT_TYPES.none});
          return;
        } catch (e) {
          console.error(e);
          this.setState({
            inputType: INPUT_TYPES.none,
          });
          return;
        }
      }
    }

    if (this.state.inputType === INPUT_TYPES.weight) {
      const setUserWeight = this.props?.setWeight;
      const setUserWeightDecimal = this.props?.setWeightDecimal;

      try {
        if (!setUserWeight || !setUserWeightDecimal) {
          this.setState({
            inputType: INPUT_TYPES.none,
          });
          return;
        }

        setUserWeight(this.weightIndex);
        setUserWeightDecimal(this.weightDecimalIndex);

        this.setState({
          inputType: INPUT_TYPES.none,
        });
        return;
      } catch (e) {
        console.error(e);
        this.setState({
          inputType: INPUT_TYPES.none,
        });
        return;
      }
    }

    if (this.state.inputType === INPUT_TYPES.height) {
      const setUserHeight = this.props?.setHeight;

      if (setUserHeight) {
        try {
          setUserHeight(this.heightIndex);
          this.setState({
            inputType: INPUT_TYPES.none,
          });
          return;
        } catch (e) {
          console.error(e);
          this.setState({
            inputType: INPUT_TYPES.none,
          });
          return;
        }
      }
    }

    if (this.state.inputType === INPUT_TYPES.blood) {
      const setUserBloodType = this.props?.setBloodType;
      const selectedType = this.state.selectedBloodTypeIndex;

      if (setUserBloodType) {
        try {
          setUserBloodType(selectedType);
          this.setState({
            inputType: INPUT_TYPES.none,
          });
        } catch (e) {
          console.error(e);
          this.setState({
            inputType: INPUT_TYPES.none,
          });
          return;
        }
      }
    }
  };

  onInputCancel = () => {
    if (this.state.inputType === INPUT_TYPES.gender) {
      const userGender = this.props.personalInfo?.gender;

      this.setState({
        selectedGender: userGender,
        inputType: INPUT_TYPES.none,
      });
      return;
    }
    if (this.state.inputType === INPUT_TYPES.age) {
      const userAge = this.props.personalInfo?.age;

      this.ageIndex = userAge;

      this.setState({
        inputType: INPUT_TYPES.none,
      });

      return;
    }

    if (this.state.inputType === INPUT_TYPES.weight) {
      const userWeight = this.props.personalInfo?.weight;
      const userWeightDecimal = this.props.personalInfo?.weightDecimal;

      this.weightIndex = userWeight;
      this.weightDecimalIndex = userWeightDecimal;

      this.setState({
        inputType: INPUT_TYPES.none,
      });

      return;
    }
    if (this.state.inputType === INPUT_TYPES.height) {
      const userHeight = this.props.personalInfo?.height;

      this.heightIndex = userHeight;

      this.setState({
        inputType: INPUT_TYPES.none,
      });

      return;
    }
    if (this.state.inputType === INPUT_TYPES.blood) {
      const userBloodType = this.props.personalInfo?.bloodType;

      console.log(userBloodType, 'user prev blood typ');

      this.setState({
        selectedBloodTypeIndex: userBloodType,
        inputType: INPUT_TYPES.none,
      });

      return;
    }
  };

  handleAgePickerScroll = e => {
    let index = Math.ceil(e.nativeEvent.contentOffset.x / 50);

    if (index === 0) {
      index = 1;
    }

    if (index === this.ageIndex) {
      return;
    }

    this.ageIndex = index;
  };

  setBloodTypeText = index => {
    if (index > BLOOD_TYPES.length - 1) {
      return '';
    }

    return BLOOD_TYPES[index];
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

function HealthContainer(props) {
  const route = useRoute();
  const frame = useSafeAreaFrame();
  const insets = useSafeAreaInsets();

  return <Health {...props} route={route} frame={frame} insets={insets} />;
}

const mapStateToProps = state => {
  return {
    personalInfo: state.personalInfo,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setName: name => {
      dispatch(setName(name));
    },

    setSurname: surname => {
      dispatch(setSurname(surname));
    },

    setAge: age => {
      dispatch(setAge(age));
    },

    setWeight: weight_ => {
      dispatch(setWeight(weight_));
    },

    setWeightDecimal: weightDecimal => {
      dispatch(setWeightDecimal(weightDecimal));
    },

    setBloodType: bloodType => {
      dispatch(setBloodType(bloodType));
    },

    setGender: gender => {
      dispatch(setGender(gender));
    },

    setHeight: height_ => {
      dispatch(setHeight(height_));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
)(HealthContainer);

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    backgroundColor: '#000000',
  },

  contentContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },

  inputSheetContentContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },

  inputModalHeaderContainer: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },

  inputModalHeader: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#212121',
  },

  inputModalButtonsContainer: {
    height: 70,
    position: 'absolute',
    right: 0,
    left: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  inputModalButton: {
    width: '40%',
    height: 50,
    backgroundColor: Color.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  inputModalButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#ffffff',
  },

  inputModalContent: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',

    flex: 1,
    marginBottom: 70,
  },

  infoHeaderContainer: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: 140,
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 40,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },

  infoHeaderImageContainer: {
    height: 80,
    width: 80,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: Color.primary,
  },

  avatarImage: {
    height: 40,
    width: 40,
    tintColor: '#ffffff',
  },
  infoHeaderTextContainer: {
    flex: 1,
    height: 80,
    paddingLeft: 30,
  },

  infoPrimaryTextContainer: {
    height: 40,
    width: '100%',
    justifyContent: 'center',
  },

  infoPrimaryText: {
    color: '#212121',
    fontSize: 24,
    fontWeight: 'bold',
  },

  infoSecondaryText: {
    color: '#424242',
    fontSize: 14,
  },

  infoSecondaryTextContainer: {
    height: 40,
    width: '100%',
    justifyContent: 'center',
  },

  personalInfoContainer: {
    width: '100%',
  },

  personalInfoTitleContainer: {
    height: 80,
    paddingHorizontal: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  editIconContainer: {
    height: 80,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  editIcon: {
    width: 25,
    height: 25,
    marginLeft: 20,
    tintColor: '#212121',
  },

  personalInfoTitle: {
    color: '#212121',
    fontSize: 16,
    fontWeight: 'bold',
  },

  divider: {
    height: 0.5,
    width: '80%',
    backgroundColor: '#cccccc',
    alignSelf: 'center',
  },

  editItemContainer: {
    height: 55,
    width: '100%',
    paddingHorizontal: 40,
    justifyContent: 'center',
  },

  editItemTitleContainer: {
    width: '100%',
    paddingHorizontal: 40,
    height: 30,
    justifyContent: 'center',
  },

  editItemTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#212121',
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
    width: '40%',
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
    borderTopColor: '#212121',
    borderBottomColor: '#212121',
    height: 30,
    borderBottomEndRadius: 0.5,
    borderTopEndRadius: 0.5,
  },
  pickerContainer: {
    height: 180,
    width: '80%',
  },

  bloodSelectorContainer: {
    flex: 1,
  },
});
