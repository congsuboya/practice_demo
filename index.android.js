/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { StackNavigator } from 'react-navigation';

import PieCharts from './src/pieCharts';
import mainDemo from './demo';
import Main from './main';
import WebDemo from './webDemo';


Array.prototype.sum = function () {
  return this.reduce(function (partial, value) {
    return partial + value;
  })
};

const App = StackNavigator({
  Main: { screen: Main },
  Demo: { screen: mainDemo },
  PieChart: { screen: PieCharts },
  WebDemo: { screen: WebDemo }
});

AppRegistry.registerComponent('PracticeDemo', () => App);
