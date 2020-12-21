import React from "react";
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'; 
import DashboardScreen from './DashboardScreen'; 
import FocusScreen from './FocusScreen'; 


const RootStack = createStackNavigator(
  {
    Focus: FocusScreen,
    Dashboard: DashboardScreen,
  },
  {
    initialRouteName: 'Focus',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return (
      <AppContainer />
    );
  }
}
