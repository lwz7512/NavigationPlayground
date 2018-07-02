import React from 'react';
import { Text, View, StyleSheet, Image, Button } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { createDrawerNavigator } from 'react-navigation';

const styles = StyleSheet.create({
  mrgn: {
    margin: 60,
  },
  icon: {
    width: 24,
    height: 24,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});


class MyHomeScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Home',
    drawerIcon: ({ tintColor }) => (
      <MaterialIcons name="move-to-inbox" size={24} style={{ color: tintColor }}/>
      // <Image
      //   source={require('./images/chats-icon.png')}
      //   style={[styles.icon, {tintColor: tintColor}]}
      // />
    ),
  };

  render() {
    return (
      <View style={styles.container}>
        <Button style={styles.mrgn}
          onPress={() => this.props.navigation.openDrawer()}
          title="Pull out Drawer Panel"
        />
      </View>
    );
  }
}

class MyNotificationsScreen extends React.Component {

  static navigationOptions = {
    drawerLabel: 'Notifications',
    drawerIcon: ({ tintColor }) => (
      <MaterialIcons name="drafts" size={24} style={{ color: tintColor }} />
      // <Image
      //   source={require('./images/notif-icon.png')}
      //   style={[styles.icon, {tintColor: tintColor}]}
      // />
    ),
  };

  render() {
    return (
      <View style={styles.container}>
        <Button style={styles.mrgn}
          onPress={() => this.props.navigation.goBack()}
          title="Go back home"
        />
      </View>
    );
  }
}


export default createDrawerNavigator({
  Home: {
    screen: MyHomeScreen,
  },
  Notifications: {
    screen: MyNotificationsScreen,
  },
});
