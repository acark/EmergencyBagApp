import React, {Component} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {Color} from '../utils/Constants';

export default class InfoItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <View
          style={[
            styles.imageContainer,
            {
              backgroundColor: this.props?.iconBackgroundColor
                ? this.props.iconBackgroundColor
                : Color.primary,
            },
          ]}>
          <Image
            source={this.props?.iconSource ? this.props.iconSource : null}
            resizeMode="contain"
            style={styles.image}
          />
        </View>
        <View style={styles.textContainer}>
          <View style={styles.primaryTextContainer}>
            <Text style={styles.primaryText}>
              {this.props?.infoType ? this.props.infoType : null}
            </Text>
          </View>
          <View style={styles.secondaryTextContainer}>
            <Text style={styles.secondaryText}>
              {this.props?.value ? this.props.value : null}
            </Text>
          </View>
        </View>
        <View style={styles.rightArrowContainer}>
          <Image
            style={styles.rightArrow}
            source={require('../utils/img/right.png')}
            resizeMode="contain"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 80,
    alignItems: 'center',
    paddingHorizontal: 40,

    flexDirection: 'row',
  },
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 25,
    height: 25,
    tintColor: '#ffffff',
  },

  textContainer: {
    paddingLeft: 20,
    height: 50,
    flex: 1,
  },

  primaryTextContainer: {
    height: 25,
    flex: 1,
    marginTop: 5,
  },
  secondaryTextContainer: {
    height: 25,
    flex: 1,
  },

  primaryText: {
    color: '#212121',
    fontSize: 16,
    fontWeight: 'bold',
  },

  secondaryText: {
    color: '#424242',
    fontSize: 13,
  },

  rightArrowContainer: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  rightArrow: {
    tintColor: '#212121',
    width: 20,
    height: 20,
    marginLeft: 20,
  },
});
