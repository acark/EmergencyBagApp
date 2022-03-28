/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';

import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import SplashScreen from './screens/SplashScreen';
import {Provider as PaperProvider} from 'react-native-paper';
import {IconButton} from 'react-native-paper';
import {enableScreens} from 'react-native-screens';

import HomeScreen from './screens/HomeScreen';
import ItemDetails from './screens/ItemDetailsScreen';
import {Color} from './utils/Constants';

import {persistor, store} from './redux/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {SlideFromRightIOS} from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionPresets';
import EmergencyCalls from './screens/EmergencyCalls';
import Compass from './screens/Compass';
import Health from './screens/Health';
import Tools from './screens/Tools';
import CustomCalculator from './screens/CustomCalculator';
import Notes from './screens/Notes';
import NoteEdit from './screens/NoteEdit';
import VoiceRecord from './screens/VoiceRecord';

const AppStack = createStackNavigator();
const bottomTabs = createBottomTabNavigator();
enableScreens(true);

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <PaperProvider>
            <NavigationContainer>
              <StatusBar
                animated={true}
                backgroundColor="transparent"
                barStyle={'dark-content'}
                showHideTransition={'slide'}
                hidden={false}
                translucent={true}
              />
              <AppStack.Navigator
                mode={'modal'}
                initialRouteName={SplashScreen}
                screenOptions={{}}>
                <AppStack.Screen
                  name="splash"
                  component={SplashScreen}
                  options={{
                    headerShown: false,
                    gestureEnabled: false,
                  }}
                />
                <AppStack.Screen
                  name="HomeScreen"
                  component={HomeScreen}
                  options={{
                    headerShown: false,
                    gestureEnabled: false,
                    title: 'Deprem Çantası',
                    headerStyle: {
                      backgroundColor: Color.primary,
                      elevation: 0, // remove shadow on Android
                      shadowOpacity: 0, // remove shadow on iOS
                      borderBottomWidth: 0,
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                      fontFamily: 'AirbnbCerealBold',
                    },
                  }}
                />
                <AppStack.Screen
                  name="ItemDetails"
                  component={ItemDetails}
                  options={{
                    headerShown: false,
                    gestureEnabled: false,
                    title: 'Yeni Eşya',
                    headerStyle: {
                      backgroundColor: Color.primary,
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                      fontFamily: 'AirbnbCerealBold',
                    },
                  }}
                />
                <AppStack.Screen
                  name="Tools"
                  component={Tools}
                  options={{
                    headerShown: false,
                    gestureEnabled: false,
                  }}
                />
                <AppStack.Screen
                  name="Compass"
                  component={Compass}
                  options={{
                    headerShown: false,
                    gestureEnabled: false,
                  }}
                />
                <AppStack.Screen
                  name="Notes"
                  component={Notes}
                  options={{
                    headerShown: false,
                    gestureEnabled: false,
                  }}
                />
                <AppStack.Screen
                  name="NoteEdit"
                  component={NoteEdit}
                  options={{
                    headerShown: false,
                    gestureEnabled: false,
                    ...TransitionPresets.ModalPresentationIOS,
                  }}
                />
                <AppStack.Screen
                  name="AudioRecord"
                  component={VoiceRecord}
                  options={{
                    headerShown: false,
                    gestureEnabled: false,
                  }}
                />
                <AppStack.Screen
                  name="Calculator"
                  component={CustomCalculator}
                  options={{
                    headerShown: false,
                    gestureEnabled: false,
                  }}
                />
                <AppStack.Screen
                  name="Health"
                  component={Health}
                  options={{
                    headerShown: false,
                    gestureEnabled: false,
                  }}
                />
                <AppStack.Screen
                  name="EmergencyCalls"
                  component={EmergencyCalls}
                  options={{
                    headerShown: false,
                    gestureEnabled: false,
                    title: 'Yeni Eşya',
                    headerStyle: {
                      backgroundColor: Color.primary,
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                      fontFamily: 'AirbnbCerealBold',
                    },
                  }}
                />
              </AppStack.Navigator>
            </NavigationContainer>
          </PaperProvider>
        </PersistGate>
      </Provider>
    );
  }
}
