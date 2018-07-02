/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform, StyleSheet,
  Text, View, Button, Image
} from 'react-native';

import { createStackNavigator } from 'react-navigation';

import HeaderButtons from 'react-navigation-header-buttons'
import Ionicons from 'react-native-vector-icons/Ionicons';


import styles from './styles'

class LogoTitle extends React.Component {
  render() {
    return (
      <Image
        source={require('./images/icon.png')}
        style={{ width: 30, height: 30 }}
      />
    );
  }
}

class HomeScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'iFrontQA',
      headerRight: (
        <HeaderButtons IconComponent={Ionicons} iconSize={23} color="#007AFF">
          <HeaderButtons.Item title="add" iconName="ios-create" 
            onPress={() => navigation.navigate('Details')} />
        </HeaderButtons>
      ),
    };
  };
  
  // static navigationOptions = {
  //   // title: 'iFrontQA',
  //   headerTitle: <LogoTitle />,
  // };

  render() {
    return (
      <View style={styles.container}>
        <Text>Home Screen</Text>
        {/*<Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Details')}
        />*/}
        <Button
          title="Go to Details"
          onPress={() => {
            /* 1. Navigate to the Details route with params */
            this.props.navigation.navigate('Details', {
              itemId: 86,
              otherParam: 'anything you want here',
            });
          }}
        />
      </View>
    );
  }
}

class DetailsScreen extends React.Component {

  // static navigationOptions = {
  //   title: 'Details',
  // };

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('otherParam', 'A Nested Details Screen'),
    };
  };

  render() {
    /* 2. Get the param, provide a fallback value if not available */
    const { navigation } = this.props;
    const itemId = navigation.getParam('itemId', 'NO-ID');
    const otherParam = navigation.getParam('otherParam', 'some default value');

    return (
      <View style={styles.container}>
        <Text>Details Screen</Text>
        <Text>itemId: {JSON.stringify(itemId)}</Text>
        <Text>otherParam: {JSON.stringify(otherParam)}</Text>
        <Button
          title="Go to Details... again"
          onPress={() =>
            this.props.navigation.push('Details', {
              itemId: Math.floor(Math.random() * 100),
            })}
        />
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

// export default createStackNavigator({
//   Home: {
//     screen: HomeScreen
//   },
// });

// const RootStack = createStackNavigator({
//   Home: HomeScreen
//   // Home: {
//   //   screen: HomeScreen
//   // },
// });

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen,
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

