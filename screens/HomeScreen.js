/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import {Component} from 'react';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Image,
  TextInput,
  Pressable,
  Platform,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import {useRoute} from '@react-navigation/core';
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import {Color} from '../utils/Constants';
import {setItemsAction} from '../redux/actions/action';
import {connect} from 'react-redux';
import ListElement from '../components/ListElement';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.topInset = this.props.insets.top;
    this.bottomInset = this.props.insets.bottom;
    this.state = {
      textValue: '',
      scrollY: new Animated.Value(0),
    };

    this.opacity = Animated.diffClamp(this.state.scrollY, 0, 62).interpolate({
      inputRange: [0, 75],
      outputRange: [1, 0],
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  render() {
    const items = this.props?.items?.items;

    console.log(this.state.scrollY);
    const height = this.state.scrollY.interpolate({
      inputRange: [0, 300],
      outputRange: [110, 0],
    });

    return (
      <View style={styles.container}>
        <View style={{flex: 1}}>
          <Animated.ScrollView
            style={{flex: 1, flexDirection: 'column'}}
            stickyHeaderIndices={[1]}
            showsVerticalScrollIndicator={false}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}], // event.nativeEvent.contentOffset.x to scrollX
              {useNativeDriver: false}, // use native driver for animation
            )}
            contentContainerStyle={{
              marginTop: this.topInset,
              paddingBottom: 120 + this.bottomInset,
            }}>
            <Animated.View
              opacity={this.opacity}
              style={[styles.headerContainer, {marginTop: this.topInset}]}>
              <Animated.View style={[styles.headerImageContainer]}>
                <Animated.Image
                  source={require('../utils/img/landslide.png')}
                  resizeMode="contain"
                  style={[
                    styles.headerImage,
                    {height: height},
                  ]}></Animated.Image>
              </Animated.View>
            </Animated.View>
            <View style={{elevation: 7}}>
              <View style={[styles.searchContainer]}>
                <View style={styles.search}>
                  <View style={styles.searchIconContainer}>
                    <Image
                      style={styles.searchIcon}
                      source={require('../utils/img/search.png')}
                      resizeMode="contain"></Image>
                  </View>
                  <TextInput
                    ref={ref => (this.textInput = ref)}
                    style={{
                      height: 45,
                      flex: 1,
                      backgroundColor: 'transparent',
                    }}
                    spellCheck={false}
                    underlineColorAndroid="transparent"
                    returnKeyType="search"
                    value={this.state.textValue}
                    placeholder={'Eşya ismi ile arayın'}
                    multiline={false}
                    numberOfLines={1}
                    onChangeText={text => {
                      this.setState({
                        textValue: text,
                      });
                    }}></TextInput>
                  <View style={styles.searchIconContainer}>
                    <Image
                      style={styles.searchIcon}
                      source={require('../utils/img/tune.png')}
                      resizeMode="contain"></Image>
                  </View>
                </View>
              </View>
            </View>
            {items.map(item => {
              let dateString = '';

              if (item?.date) {
                const date = new Date(item?.date);

                var dd = String(date.getDate()).padStart(2, '0');
                var mm = String(date.getMonth() + 1).padStart(2, '0');
                var yyyy = date.getFullYear();

                dateString = dd + '.' + mm + '.' + yyyy;
              }
              return (
                <ListElement
                  onPress={() => this.props.navigation.push('ItemDetails')}
                  amount={item?.amount}
                  itemName={item?.title}
                  itemDate={dateString}
                  category={item?.category}
                  imageSource={
                    item?.imageURI ? {uri: item?.imageURI} : null
                  }></ListElement>
              );
            })}
          </Animated.ScrollView>
        </View>

        <View style={[styles.bottomTabs, {height: this.bottomInset + 60}]}>
          <View
            style={[
              styles.TabItemsContainer,
              {marginBottom: this.bottomInset},
            ]}>
            <View style={styles.TabItem}>
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
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                ]}
                onPress={() => {
                  const onPress = this.props?.onPress;
                  if (onPress) {
                    this.props.onPress();
                  }
                }}
                android_ripple={{color: '#CFD8DC'}}>
                <View style={styles.tabIconContainer}>
                  <Image
                    source={require('../utils/img/work.png')}
                    resizeMode="contain"
                    style={[
                      styles.tabIcon,
                      {tintColor: Color.primary},
                    ]}></Image>
                </View>
                <Text style={[styles.tabItemText, {color: Color.primary}]}>
                  Çantam
                </Text>
              </Pressable>
            </View>
            <View style={styles.TabItem}>
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
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                ]}
                onPress={() => {
                  this.props.navigation.navigate('EmergencyCalls');
                }}
                android_ripple={{color: '#CFD8DC'}}>
                <View style={styles.tabIconContainer}>
                  <Image
                    source={require('../utils/img/call.png')}
                    resizeMode="contain"
                    style={styles.tabIcon}></Image>
                </View>
                <Text style={styles.tabItemText}>Acil Cağrılar</Text>
              </Pressable>
            </View>
            <View style={styles.TabItem}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('ItemDetails');
                }}
                activeOpacity={0.8}
                style={styles.tabMiddleButtonContainer}>
                <Image
                  source={require('../utils/img/add.png')}
                  resizeMode="contain"
                  style={styles.tabMiddleButton}></Image>
              </TouchableOpacity>
            </View>
            <View style={styles.TabItem}>
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
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                ]}
                onPress={() => {
                  this.props.navigation.navigate('Tools');
                }}
                android_ripple={{color: '#CFD8DC'}}>
                <View style={styles.tabIconContainer}>
                  <Image
                    source={require('../utils/img/tools.png')}
                    resizeMode="contain"
                    style={styles.tabIcon}></Image>
                </View>
                <Text style={styles.tabItemText}>Araçlar</Text>
              </Pressable>
            </View>
            <View style={styles.TabItem}>
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
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                ]}
                onPress={() => {
                  this.props.navigation.navigate('Health');
                }}
                android_ripple={{color: '#CFD8DC'}}>
                <View style={styles.tabIconContainer}>
                  <Image
                    source={require('../utils/img/heart_filled.png')}
                    resizeMode="contain"
                    style={styles.tabIcon}></Image>
                </View>
                <Text numberOfLines={1} style={styles.tabItemText}>
                  Sağlık
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

function HomeScreenContainer(props) {
  const route = useRoute();
  const frame = useSafeAreaFrame();
  const insets = useSafeAreaInsets();

  return <HomeScreen {...props} route={route} frame={frame} insets={insets} />;
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
)(HomeScreenContainer);

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    backgroundColor: '#ffffff',
  },

  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 120,
    elevation: 10,
    //backgroundColor: 'red',
  },

  headerImageContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'blue',
  },

  headerImage: {
    width: 140,
    height: 110,
  },

  searchContainer: {
    width: '100%',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    zIndex: 6,
    overflow: 'hidden',
    paddingHorizontal: 12,
    backgroundColor: 'transparent',
  },

  search: {
    backgroundColor: '#ffffff',
    width: '100%',
    height: 45,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#212121',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 4,
    zIndex: 20,
  },

  searchIconContainer: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },

  searchIcon: {
    width: 25,
    height: 25,
    tintColor: '#616161',
  },

  placeholderImageContainer: {
    width: 180,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    width: 160,
    height: 160,
    tintColor: '#E0E0E0',
  },

  placeholderText: {
    fontFamily: 'AirbnbCerealBook',
    color: '#E0E0E0',
    fontSize: 16,
  },

  bottomTabs: {
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: '#ffffff',
    elevation: 10,
  },

  TabItemsContainer: {
    height: 60,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
  },

  TabItem: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },

  tabIconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabIcon: {
    width: 25,
    height: 25,
    tintColor: '#616161',
  },

  tabMiddleButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: 60,
    height: 60,
    top: -25,
    borderRadius: 30,
    backgroundColor: Color.primary,
    elevation: 10,
    shadowColor: '#212121',
  },

  tabMiddleButton: {
    width: 40,
    height: 40,
    tintColor: '#ffffff',
  },

  tabItemText: {
    fontSize: 12,
    marginBottom: 5,
    color: '#616161',
  },
});
