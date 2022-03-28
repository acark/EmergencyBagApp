/* eslint-disable react-native/no-inline-styles */
import {useRoute} from '@react-navigation/core';
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  FlatList,
  Text,
  Dimensions,
  Vibration,
  Platform,
} from 'react-native';
import Header from '../components/Header';
import {Color, Theme} from '../utils/Constants';
import {deleteNotesAction, setNotesAction} from '../redux/actions/action';
import {connect} from 'react-redux';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('screen').height;

class Notes extends Component {
  isEditState = false;
  constructor(props) {
    super(props);
    this.topInset = this.props.insets.top;
    this.bottomInset = this.props.insets.bottom;
    this.state = {
      isEditState: false,
      selectedNotes: [],
    };
  }

  renderItem = (item, index) => {
    const {title, body, id, date, backgroundColor} = item.item;

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onLongPress={() => {
          if (this.isEditState) {
            return;
          }
          if (Platform.OS === 'android') {
            Vibration.vibrate([40, 40]);
          }
          this.setState({isEditState: true});
          this.isEditState = true;
        }}
        onPress={() => {
          //TODO: update selected id's when pressed
          if (this.state.isEditState) {
            return;
          }
          this.props.navigation.navigate('NoteEdit', {
            itemID: id,
          });
        }}
        key={id}
        style={[styles.noteContainer, {backgroundColor: backgroundColor}]}>
        {title !== '' ? (
          <View style={styles.noteHeaderContainer}>
            <Text numberOfLines={2} style={styles.noteHeader}>
              {title}
            </Text>
          </View>
        ) : (
          <View style={{height: 25}} />
        )}

        <View style={styles.noteBodyContainer}>
          <Text numberOfLines={4} style={styles.noteBody}>
            {body}
          </Text>
        </View>

        <View style={styles.noteDateContainer}>
          <Text style={styles.noteDate}>{date}</Text>
        </View>

        {this.state.isEditState && (
          <View style={styles.checkBoxContainer}>
            <BouncyCheckbox
              key={id}
              size={20}
              fillColor="#212121"
              style={{
                borderWidth: 0,
              }}
              isChecked={false}
              unfillColor="transparent"
              onPress={isChecked => {
                if (isChecked) {
                  const IDs = [...this.state.selectedNotes];

                  const isIncluded = IDs.includes(id);

                  if (!isIncluded) {
                    this.setState({
                      selectedNotes: [...IDs, id],
                    });
                  }
                } else {
                  const selectedNotes = [...this.state.selectedNotes];

                  const isIDIncluded = selectedNotes.includes(id);

                  if (isIDIncluded) {
                    const filtered = selectedNotes.filter(
                      noteId => noteId !== id,
                    );

                    this.setState({selectedNotes: [...filtered]});
                    return;
                  }
                }
              }}
            />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  render() {
    const NOTES = this.props?.notes?.notes ? this.props.notes.notes : [];
    return (
      <View style={styles.container}>
        <View
          style={[styles.notesListContainer, {marginTop: 80 + this.topInset}]}>
          <Animated.FlatList
            style={{flex: 1, width: '100%'}}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            numColumns={2}
            contentContainerStyle={{
              paddingBottom: 90 + this.bottomInset,
            }}
            columnWrapperStyle={{
              alignItems: 'center',
              paddingHorizontal: WIDTH * 0.04,
            }}
            data={NOTES}
            keyExtractor={item => item.id}
            renderItem={this.renderItem}
          />
        </View>
        {!this.state.isEditState && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              if (this.state.isEditState) {
                return;
              }
              try {
                this.props.navigation.navigate('NoteEdit', {
                  itemID: undefined,
                });
              } catch (e) {
                console.error(e);
              }
            }}
            style={[
              styles.fabButtonContainer,
              {bottom: 30 + this.bottomInset},
            ]}>
            <Image
              source={require('../utils/img/add.png')}
              style={styles.fabButtonImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}

        <Header
          leftIconPressed={() => {
            if (this.isEditState) {
              this.setState({isEditState: false, selectedNotes: []});
              this.isEditState = false;
              return;
            }
            this.props.navigation.pop();
          }}
          headerRightIcon={
            this.state.isEditState
              ? require('../utils/img/delete_outlined.png')
              : null
          }
          rightIconPressed={() => {
            if (!this.isEditState || this.state.selectedNotes?.length === 0) {
              return;
            }

            const deleteNotes = this.props?.deleteNotes;

            if (!deleteNotes) {
              this.setState({isEditState: false, selectedNotes: []});
              this.isEditState = false;
              return;
            }

            try {
              deleteNotes(
                this.state?.selectedNotes ? this.state.selectedNotes : [],
              );
              this.setState({isEditState: false, selectedNotes: []});
              this.isEditState = false;
              return;
            } catch (e) {
              console.error(e);
              this.setState({isEditState: false, selectedNotes: []});
              this.isEditState = false;
              return;
            }
          }}
          theme={Theme.LIGHT}
          backgroundColor={'transparent'}
          headerTitle={'Notlar'}
          headerLeftIcon={
            this.state.isEditState
              ? require('../utils/img/close.png')
              : require('../utils/img/left.png')
          }
        />
      </View>
    );
  }
}

function NotesContainer(props) {
  const route = useRoute();
  const frame = useSafeAreaFrame();
  const insets = useSafeAreaInsets();

  return <Notes {...props} route={route} frame={frame} insets={insets} />;
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

    deleteNotes: item => {
      dispatch(deleteNotesAction(item));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
)(NotesContainer);

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    //backgroundColor: '#252525',
  },

  fabButtonContainer: {
    position: 'absolute',

    right: 30,
    width: 55,
    height: 55,
    borderRadius: 27.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#212121',
    shadowColor: 'black',
    shadowOpacity: 0.6,
    shadowOffset: {width: 0, height: 2},
    elevation: 3,
  },

  fabButtonImage: {
    width: 32,
    height: 32,
    tintColor: '#ffffff',
  },

  notesListContainer: {
    width: '100%',
    flex: 1,
  },
  noteContainer: {
    width: '45%',
    marginHorizontal: WIDTH * 0.025,
    alignItems: 'center',
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 0.6,
    shadowOffset: {width: 0, height: 2},
    elevation: 3,
  },

  noteHeaderContainer: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  noteHeader: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#212121',
  },

  noteBodyContainer: {
    width: '100%',
    flex: 1,
    paddingHorizontal: 20,
  },

  noteBody: {
    fontSize: 14,
    color: '#313131',
  },

  noteDateContainer: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  checkBoxContainer: {
    position: 'absolute',
    height: 40,
    width: 40,
    bottom: -5,
    right: -10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  noteDate: {
    fontSize: 13,
    color: '#424242',
  },
});
