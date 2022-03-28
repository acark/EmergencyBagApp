import {useRoute} from '@react-navigation/core';
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import Header from '../components/Header';
import {Color, Theme} from '../utils/Constants';
import PopinButton from 'react-native-popin-button';
import LottieView from 'lottie-react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import {
  request,
  PERMISSIONS,
  RESULTS,
  checkMultiple,
  check,
  requestMultiple,
} from 'react-native-permissions';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('screen').height;

const RECORD = {
  PAUSE: 'pause',
  PLAY: 'play',
  NONE: 'none',
};

class VoiceRecord extends Component {
  audioRecorderPlayer = new AudioRecorderPlayer();
  isMicrophoneAvaible = false;
  constructor(props) {
    super(props);
    this.state = {
      isRecordFinished: true,
      RecordStatus: RECORD.NONE,
      recordSecs: 0,
      recordTime: '00:00:00',
      currentPositionSec: 0,
      currentDurationSec: 0,
      playTime: '00:00:00',
      duration: '00:00:00',
    };
    this.topInset = this.props.insets.top;
    this.bottomInset = this.props.insets.bottom;
  }

  componentDidMount() {
    this.checkMicPermission();
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.timeIndicatorContainer}></View>
        <View
          style={[
            styles.recordAnimationContainer,
            {marginTop: this.topInset + 60},
          ]}>
          <View style={styles.animationContainer}>
            <LottieView
              ref={ref => (this.animation = ref)}
              source={require('../utils/animations/recordAnimation.json')}
              loop={true}
              speed={0.8}
              //progress={this.animationDuration}
              colorFilters={[
                {
                  keypath: 'lines',
                  color: Color.red,
                },
              ]}
            />
            <View style={styles.timeIndicatorTextContainer}>
              <Text numberOfLines={1} style={styles.timeIndicatorText}>
                {this.state.recordTime}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.bottomButtonsContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {}}
            style={styles.buttonContainer}>
            <Image
              style={styles.buttonIcon}
              source={require('../utils/img/cancel.png')}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <TouchableOpacity
            useNativeDriver={true}
            onPress={() => {
              this.animation.play();
              this.onStartRecord();
            }}
            style={[styles.buttonContainer, {backgroundColor: Color.red}]}>
            <Image
              style={[styles.buttonIconLight]}
              source={require('../utils/img/record.png')}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {}}
            style={styles.buttonContainer}>
            <Image
              style={styles.buttonIcon}
              source={
                this.state.isRecordFinished
                  ? require('../utils/img/menu.png')
                  : require('../utils/img/check.png')
              }
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <Header
          leftIconPressed={() => {
            this.props.navigation.pop();
          }}
          theme={Theme.LIGHT}
          backgrounColor={'transparent'}
          headerTitle={'Ses Kaydedici'}
          headerLeftIcon={require('../utils/img/left.png')}
        />
      </View>
    );
  }

  checkMicPermission = async () => {
    checkMultiple([
      PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
      PERMISSIONS.ANDROID.RECORD_AUDIO,
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    ]).then(statuses => {
      const AUDIO_PERMISSION = statuses[PERMISSIONS.ANDROID.RECORD_AUDIO];
      const READ_PERMISSION =
        statuses[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE];
      const WRITE_PERMISSION =
        statuses[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE];

      if (
        AUDIO_PERMISSION === RESULTS.GRANTED &&
        READ_PERMISSION === RESULTS.GRANTED &&
        WRITE_PERMISSION === RESULTS.GRANTED
      ) {
        this.isMicrophoneAvaible = true;
        return;
      } else {
        try {
          this.requestPermissions();
        } catch (e) {
          console.error(e);
        }
      }
    });
  };

  requestPermissions = () => {
    requestMultiple([
      PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      PERMISSIONS.ANDROID.RECORD_AUDIO,
    ]).then(statuses => {
      const AUDIO_PERMISSION = statuses[PERMISSIONS.ANDROID.RECORD_AUDIO];
      const READ_PERMISSION =
        statuses[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE];
      const WRITE_PERMISSION =
        statuses[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE];

      if (
        AUDIO_PERMISSION === RESULTS.GRANTED &&
        READ_PERMISSION === RESULTS.GRANTED &&
        WRITE_PERMISSION === RESULTS.GRANTED
      ) {
        this.isMicrophoneAvaible = true;
        return;
      } else {
        this.isMicrophoneAvaible = false;
        return;
      }
    });
  };

  onStartRecord = async () => {
    const result = await this.audioRecorderPlayer.startRecorder();
    this.audioRecorderPlayer.addRecordBackListener(e => {
      this.setState({
        recordSecs: e.currentPosition,
        recordTime: this.audioRecorderPlayer.mmssss(
          Math.floor(e.currentPosition),
        ),
      });
      return;
    });
    console.log(result);
  };
}

function VoiceRecordContainer(props) {
  const route = useRoute();
  const frame = useSafeAreaFrame();
  const insets = useSafeAreaInsets();

  return <VoiceRecord {...props} route={route} frame={frame} insets={insets} />;
}

export default VoiceRecordContainer;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    backgroundColor: '#ffffff',
  },

  bottomButtonsContainer: {
    height: 140,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
    //backgroundColor: 'red',
  },

  timeIndicatorTextContainer: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  timeIndicatorText: {
    fontSize: 21,
    fontWeight: 'bold',
    tintColor: '#212121',
  },

  recordAnimationContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },

  animationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 400,
    height: 400,
  },

  buttonContainer: {
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: '#f6f6f6',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonIcon: {
    width: 30,
    height: 30,
    tintColor: '#494949',
  },

  buttonIconLight: {
    tintColor: '#ffffff',
    width: 30,
    height: 30,
  },
});
