/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, Pressable, Animated} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {useRoute} from '@react-navigation/native';
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {connect} from 'react-redux';
import {setNotesAction, updateNotesAction} from '../redux/actions/action';
import uuid from 'react-native-uuid';
import Snackbar from 'react-native-snackbar';
import {Color} from '../utils/Constants';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const generateRandomBgColor = () => {
  const colors = [
    '#ffab91',
    '#ffcc80',
    '#e6ee9b',
    '#80deea',
    '#f38fb1',
    '#80cbc4',
    '#4DB6AC',
    '#FFD54F',
    '#DCEDC8',
    '#B3E5FC',
    '#D1C4E9',
    '#F8BBD0',
    '#FFCDD2',
  ];

  const selectedColor = colors[Math.floor(Math.random() * colors.length)];
  return selectedColor ? selectedColor : Color.primary;
};

class NoteEdit extends Component {
  isEditItem = false;
  editItemId = null;
  isHeaderSmall = true;
  constructor(props) {
    super(props);

    this.state = {
      header: '',
      body: '',
      isChanged: false,
      selectedColor: '#ffcc80',
      headerHeight: new Animated.Value(60),
    };
  }

  componentDidMount() {
    const {itemID} = this.props?.route?.params;
    if (itemID) {
      this.isEditItem = true;
      this.editItemId = itemID;

      try {
        const notes = this.props?.notes?.notes;
        const selectedNote = notes.find(element => {
          return element.id === itemID;
        });
        if (!selectedNote) {
          this.props.navigation.pop();
          return;
        }

        this.setState({
          header: selectedNote.title,
          selectedColor: selectedNote.backgroundColor,
          body: selectedNote.body,
        });
      } catch (e) {
        console.log(e);
        this.props.navigation.pop();
        return;
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      (this.state.header !== nextState.header ||
        this.state.body !== nextState.body) &&
      this.state.isChanged === false
    ) {
      this.setState({isChanged: true});
    }

    if (
      this.state.isChanged &&
      nextState.body === '' &&
      nextState.header === ''
    ) {
      this.setState({isChanged: false});
    }

    return true;
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Pressable
            onPress={() => {
              this.props.navigation.pop();
            }}
            android_ripple={{color: '#cccccc', radius: 30, borderless: true}}
            style={styles.headerLeftIconContainer}>
            <Image
              style={styles.headerRightIcon}
              source={require('../utils/img/left.png')}
              resizeMode="contain"
            />
          </Pressable>
          {this.state.isChanged && (
            <Pressable
              onPress={() => {
                this.onConfirm();
              }}
              style={styles.headerRightIconContainer}
              android_ripple={{color: '#cccccc', radius: 30, borderless: true}}>
              <Image
                source={require('../utils/img/check.png')}
                resizeMode="contain"
                style={styles.headerRightIcon}
              />
            </Pressable>
          )}
        </View>
        <View style={styles.colorPickerContainer}>
          <BouncyCheckbox
            size={25}
            fillColor="#ffcc80"
            style={{
              borderWidth: 0,
            }}
            disableBuiltInState={true}
            isChecked={this.state.selectedColor === '#ffcc80' ? true : false}
            unfillColor="#ffcc80"
            onPress={() => {
              this.setState({selectedColor: '#ffcc80'});
            }}
          />
          <BouncyCheckbox
            size={25}
            fillColor="#e6ee9b"
            unfillColor="#e6ee9b"
            disableBuiltInState={true}
            isChecked={this.state.selectedColor === '#e6ee9b' ? true : false}
            style={{
              borderWidth: 0,
            }}
            onPress={() => {
              this.setState({selectedColor: '#e6ee9b'});
            }}
          />
          <BouncyCheckbox
            size={25}
            fillColor="#4DB6AC"
            unfillColor="#4DB6AC"
            disableBuiltInState={true}
            isChecked={this.state.selectedColor === '#4DB6AC' ? true : false}
            style={{
              borderWidth: 0,
            }}
            onPress={() => {
              this.setState({selectedColor: '#4DB6AC'});
            }}
          />
          <BouncyCheckbox
            size={25}
            fillColor="#B3E5FC"
            unfillColor="#B3E5FC"
            disableBuiltInState={true}
            isChecked={this.state.selectedColor === '#B3E5FC' ? true : false}
            style={{
              borderWidth: 0,
            }}
            onPress={() => {
              this.setState({selectedColor: '#B3E5FC'});
            }}
          />
          <BouncyCheckbox
            size={25}
            fillColor="#f38fb1"
            unfillColor="#f38fb1"
            disableBuiltInState={true}
            isChecked={this.state.selectedColor === '#f38fb1' ? true : false}
            style={{
              borderWidth: 0,
            }}
            onPress={() => {
              this.setState({selectedColor: '#f38fb1'});
            }}
          />
          <BouncyCheckbox
            size={25}
            fillColor="#ffab91"
            unfillColor="#ffab91"
            disableBuiltInState={true}
            isChecked={this.state.selectedColor === '#ffab91' ? true : false}
            style={{
              borderWidth: 0,
            }}
            onPress={() => {
              this.setState({selectedColor: '#ffab91'});
            }}
          />
          <BouncyCheckbox
            size={25}
            fillColor="#DCEDC8"
            unfillColor="#DCEDC8"
            disableBuiltInState={true}
            isChecked={this.state.selectedColor === '#DCEDC8' ? true : false}
            style={{
              borderWidth: 0,
            }}
            onPress={() => {
              this.setState({selectedColor: '#DCEDC8'});
            }}
          />
          <BouncyCheckbox
            size={25}
            fillColor="#80deea"
            unfillColor="#80deea"
            disableBuiltInState={true}
            isChecked={this.state.selectedColor === '#80deea' ? true : false}
            style={{
              borderWidth: 0,
            }}
            onPress={() => {
              this.setState({selectedColor: '#80deea'});
            }}
          />
        </View>
        <Animated.View
          style={[styles.titleContainer, {height: this.state.headerHeight}]}>
          <TextInput
            autoCorrect={false}
            caretHidden={false}
            multiline={true}
            numberOfLines={2}
            maxLength={40}
            value={this.state.header}
            style={styles.titleInput}
            placeholder="Başlık"
            placeholderTextColor={'#727272'}
            onContentSizeChange={e => {
              const currentInputHeight = e.nativeEvent.contentSize.height;

              if (currentInputHeight > 60) {
                if (!this.isHeaderSmall) {
                  return;
                }
                this.enlargeHeaderInput();
              } else {
                if (this.isHeaderSmall) {
                  return;
                }
                this.shrinkHeaderInput();
              }
              console.log(e.nativeEvent.contentSize.height, 'change event');
            }}
            onChangeText={text => {
              this.setState({header: text});
            }}
          />
        </Animated.View>
        <View style={styles.bodyContainer}>
          <TextInput
            autoCorrect={false}
            caretHidden={false}
            autoFocus={true}
            multiline={true}
            maxLength={200}
            value={this.state.body}
            style={styles.bodyInput}
            placeholder="Başlık"
            placeholderTextColor={'#727272'}
            onChangeText={text => {
              this.setState({body: text});
            }}
          />
        </View>
      </View>
    );
  }

  onConfirm = () => {
    const setNewNote = this.props?.setNotes;

    const title = this.state.header;
    const body = this.state.body;

    if (!setNewNote) {
      Snackbar.show({
        text: 'Kayıt sırasında hata oluştu.',
        duration: Snackbar.LENGTH_SHORT,
      });
      this.props.navigation.pop();
      return;
    }

    const id = uuid.v4();

    const date = new Date();

    const color = this.state.selectedColor;

    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0');
    var yyyy = date.getFullYear();

    const dateString = dd + '.' + mm + '.' + yyyy;

    if (this.isEditItem && this.editItemId) {
      try {
        const updatedNote = {
          body: body,
          title: title,
          id: this.editItemId,
          date: dateString,
          backgroundColor: color,
        };

        const updateNote = this.props?.updateNotes;

        updateNote(updatedNote);
        this.props.navigation.pop();
        return;
      } catch (e) {
        Snackbar.show({
          text: 'Kayıt sırasında hata oluştu.',
          duration: Snackbar.LENGTH_SHORT,
        });
        console.error(e);
        this.props.navigation.pop();
        return;
      }
    }

    const newNote = {
      body: body,
      title: title,
      id: id,
      date: dateString,
      backgroundColor: color,
    };

    try {
      setNewNote(newNote);
      this.props.navigation.pop();
    } catch (e) {
      Snackbar.show({
        text: 'Kayıt sırasında hata oluştu.',
        duration: Snackbar.LENGTH_SHORT,
      });
      console.error(e);
      this.props.navigation.pop();
      return;
    }
  };

  enlargeHeaderInput = () => {
    Animated.timing(this.state.headerHeight, {
      toValue: 100,
      duration: 50,
    }).start(() => {
      this.isHeaderSmall = false;
    });
  };

  shrinkHeaderInput = () => {
    Animated.timing(this.state.headerHeight, {
      toValue: 60,
      duration: 50,
    }).start(() => {
      this.isHeaderSmall = true;
    });
  };
}

function NoteEditContainer(props) {
  const route = useRoute();
  const frame = useSafeAreaFrame();
  const insets = useSafeAreaInsets();

  return <NoteEdit {...props} route={route} frame={frame} insets={insets} />;
}

const mapStateToProps = state => {
  return {
    notes: state.notes,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setNotes: item => {
      dispatch(setNotesAction(item));
    },
    updateNotes: item => {
      dispatch(updateNotesAction(item));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
)(NoteEditContainer);

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
  headerContainer: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  headerRightIconContainer: {
    width: 60,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerLeftIconContainer: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerLefttIcon: {
    width: 28,
    height: 28,
    tintColor: '#212121',
  },

  headerRightIcon: {
    height: 28,
    width: 28,
    tintColor: '#212121',
  },

  titleContainer: {
    width: '100%',
    paddingHorizontal: 30,
    marginTop: 20,
    justifyContent: 'center',
  },
  titleInput: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212121',
  },

  bodyContainer: {
    width: '100%',
    paddingHorizontal: 30,
    flex: 1,
  },

  colorPickerContainer: {
    width: '100%',
    paddingHorizontal: 30,
    height: 30,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  bodyInput: {
    fontSize: 16,
    color: '#424242',
    lineHeight: 30,
    textAlign: 'left',
  },
});
