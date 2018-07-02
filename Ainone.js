import React from 'react';

import {
  Animated,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  StatusBar,
  View,
} from 'react-native';
import { SafeAreaView, createStackNavigator } from 'react-navigation';

import CustomTabs from './components/CustomTabs';
import CustomTransitioner from './components/CustomTransitioner';
import Drawer from './components/Drawer';
import MultipleDrawer from './components/MultipleDrawer';
import TabsInDrawer from './components/TabsInDrawer';
import ModalStack from './components/ModalStack';
import StacksInTabs from './components/StacksInTabs';
import StacksOverTabs from './components/StacksOverTabs';
import StacksOverTopTabs from './components/StacksOverTopTabs';
import StacksWithKeys from './components/StacksWithKeys';
import InactiveStack from './components/InactiveStack';
import StackWithCustomHeaderBackImage from './components/StackWithCustomHeaderBackImage';
import SimpleStack from './components/SimpleStack';
import StackWithHeaderPreset from './components/StackWithHeaderPreset';
import StackWithTranslucentHeader from './components/StackWithTranslucentHeader';
import SimpleTabs from './components/SimpleTabs';
import SwitchWithStacks from './components/SwitchWithStacks';
import TabsWithNavigationFocus from './components/TabsWithNavigationFocus';
import KeyboardHandlingExample from './components/KeyboardHandlingExample';

const ExampleInfo = {
  SimpleStack: {
    name: 'Stack Example',
    description: 'A card stack',
  },
  SwitchWithStacks: {
    name: 'Switch between routes',
    description: 'Jump between routes',
  },
  InactiveStack: {
    name: 'Navigate idempotently to stacks in inactive routes',
    description:
      'An inactive route in a stack should be given the opportunity to handle actions',
  },
  StackWithCustomHeaderBackImage: {
    name: 'Custom header back image',
    description: 'Stack with custom header back image',
  },
  SimpleTabs: {
    name: 'Tabs Example',
    description: 'Tabs following platform conventions',
  },
  Drawer: {
    name: 'Drawer Example',
    description: 'Android-style drawer navigation',
  },
  StackWithHeaderPreset: {
    name: 'UIKit-style Header Transitions',
    description: 'Masked back button and sliding header items. iOS only.',
  },
  StackWithTranslucentHeader: {
    name: 'Translucent Header',
    description: 'Render arbitrary translucent content in header background.',
  },
  TabsInDrawer: {
    name: 'Drawer + Tabs Example',
    description: 'A drawer combined with tabs',
  },
  CustomTabs: {
    name: 'Custom Tabs',
    description: 'Custom tabs with tab router',
  },
  CustomTransitioner: {
    name: 'Custom Transitioner',
    description: 'Custom transitioner with stack router',
  },
  ModalStack: {
    name:
      Platform.OS === 'ios'
        ? 'Modal Stack Example'
        : 'Stack with Dynamic Header',
    description:
      Platform.OS === 'ios'
        ? 'Stack navigation with modals'
        : 'Dynamically showing and hiding the header',
  },
  StacksInTabs: {
    name: 'Stacks in Tabs',
    description: 'Nested stack navigation in tabs',
  },
  StacksOverTabs: {
    name: 'Stacks over Tabs',
    description: 'Nested stack navigation that pushes on top of tabs',
  },
  StacksOverTopTabs: {
    name: 'Stacks with non-standard header height',
    description: 'Tab navigator in stack with custom header heights',
  },
  StacksWithKeys: {
    name: 'Link in Stack with keys',
    description: 'Use keys to link between screens',
  },
  LinkStack: {
    name: 'Link in Stack',
    description: 'Deep linking into a route in stack',
  },
  LinkTabs: {
    name: 'Link to Settings Tab',
    description: 'Deep linking into a route in tab',
  },
  TabsWithNavigationFocus: {
    name: 'withNavigationFocus',
    description: 'Receive the focus prop to know when a screen is focused',
  },
  KeyboardHandlingExample: {
    name: 'Keyboard Handling Example',
    description:
      'Demo automatic handling of keyboard showing/hiding inside StackNavigator',
  },
};

const ExampleRoutes = {
  SimpleStack,
  SwitchWithStacks,
  SimpleTabs: SimpleTabs,
  Drawer: Drawer,
  StackWithCustomHeaderBackImage: StackWithCustomHeaderBackImage,
  ...Platform.select({
    ios: {
      StackWithHeaderPreset: StackWithHeaderPreset,
    },
    android: {},
  }),
  StackWithTranslucentHeader: StackWithTranslucentHeader,
  TabsInDrawer: TabsInDrawer,
  CustomTabs: CustomTabs,
  CustomTransitioner: CustomTransitioner,
  ModalStack: ModalStack,
  StacksWithKeys: StacksWithKeys,
  StacksInTabs: StacksInTabs,
  StacksOverTabs: StacksOverTabs,
  StacksOverTopTabs: StacksOverTopTabs,
  LinkStack: {
    screen: SimpleStack,
    path: 'people/Jordan',
  },
  LinkTabs: {
    screen: SimpleTabs,
    path: 'settings',
  },
  TabsWithNavigationFocus,
  KeyboardHandlingExample,
  // This is commented out because it's rarely useful
  // InactiveStack,
};

type State = {
  scrollY: Animated.Value,
};

class MainScreen extends React.Component<any, State> {

  state = {
    scrollY: new Animated.Value(0),
  };

  render() {
    const { navigation } = this.props;

    const scale = this.state.scrollY.interpolate({
      inputRange: [-450, 0, 100],
      outputRange: [2, 1, 0.8],
      extrapolate: 'clamp',
    });

    const translateY = this.state.scrollY.interpolate({
      inputRange: [-450, 0, 100],
      outputRange: [-150, 0, 40],
    });

    const opacity = this.state.scrollY.interpolate({
      inputRange: [0, 50],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    const underlayOpacity = this.state.scrollY.interpolate({
      inputRange: [0, 50],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });

    const backgroundScale = this.state.scrollY.interpolate({
      inputRange: [-450, 0],
      outputRange: [3, 1],
      extrapolate: 'clamp',
    });

    const backgroundTranslateY = this.state.scrollY.interpolate({
      inputRange: [-450, 0],
      outputRange: [0, 0],
    });

    return (
      <View style={{ flex: 1 }}>
        <Animated.ScrollView
          style={{ flex: 1 }}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [
              {
                nativeEvent: { contentOffset: { y: this.state.scrollY } },
              },
            ],
            { useNativeDriver: true }
          )}
        >
          <Animated.View
            style={[
              styles.backgroundUnderlay,
              {
                transform: [
                  { scale: backgroundScale },
                  { translateY: backgroundTranslateY },
                ],
              },
            ]}
          />
          <Animated.View
            style={{ opacity, transform: [{ scale }, { translateY }] }}
          >
            <SafeAreaView
              style={styles.bannerContainer}
              forceInset={{ top: 'always', bottom: 'never' }}
            >
              <View style={styles.banner}>
                <Image
                  source={require('./components/assets/NavLogo.png')}
                  style={styles.bannerImage}
                />
                <Text style={styles.bannerTitle}>
                  React Navigation Examples
                </Text>
              </View>
            </SafeAreaView>
          </Animated.View>

          <SafeAreaView forceInset={{ bottom: 'always', horizontal: 'never' }}>
            <View style={{ backgroundColor: '#fff' }}>
              {Object.keys(ExampleRoutes).map((routeName: string) => (
                <TouchableOpacity
                  key={routeName}
                  onPress={() => {
                    let route = ExampleRoutes[routeName];
                    if (route.screen || route.path || route.params) {
                      const { path, params, screen } = route;
                      const { router } = screen;
                      const action =
                        path && router.getActionForPathAndParams(path, params);
                      navigation.navigate(routeName, {}, action);
                    } else {
                      navigation.navigate(routeName);
                    }
                  }}
                >
                  <SafeAreaView
                    style={styles.itemContainer}
                    forceInset={{ veritcal: 'never', bottom: 'never' }}
                  >
                    <View style={styles.item}>
                      <Text style={styles.title}>
                        {ExampleInfo[routeName].name}
                      </Text>
                      <Text style={styles.description}>
                        {ExampleInfo[routeName].description}
                      </Text>
                    </View>
                  </SafeAreaView>
                </TouchableOpacity>
              ))}
            </View>
          </SafeAreaView>
        </Animated.ScrollView>
        <StatusBar barStyle="light-content" />
        <Animated.View
          style={[styles.statusBarUnderlay, { opacity: underlayOpacity }]}
        />
      </View>
    );
  }

}

const AppNavigator = createStackNavigator(
  {
    ...ExampleRoutes,
    Index: {
      screen: MainScreen,
    },
  },
  {
    initialRouteName: 'Index',
    headerMode: 'none',

    /*
   * Use modal on iOS because the card mode comes from the right,
   * which conflicts with the drawer example gesture
   */
    mode: Platform.OS === 'ios' ? 'modal' : 'card',
  }
);


export default AppNavigator;

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  itemContainer: {
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ddd',
  },
  image: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginBottom: 20,
    resizeMode: 'contain',
  },
  statusBarUnderlay: {
    backgroundColor: '#673ab7',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    // height: Constants.statusBarHeight,
    height: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
  },
  description: {
    fontSize: 13,
    color: '#999',
  },
  backgroundUnderlay: {
    backgroundColor: '#673ab7',
    position: 'absolute',
    top: -100,
    height: 300,
    left: 0,
    right: 0,
  },
  bannerContainer: {
    // backgroundColor: '#673ab7',
    alignItems: 'center',
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  bannerImage: {
    width: 36,
    height: 36,
    resizeMode: 'contain',
    tintColor: '#fff',
    margin: 8,
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: '200',
    color: '#fff',
    marginVertical: 8,
    marginRight: 5,
  },
});
