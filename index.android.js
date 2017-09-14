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
import BarCharts from './src/barCharts';
import DoughnutCharts from './src/doughnutCharts';

import ViewDemo from './src/viewDemo';



Array.prototype.sum = function () {
  return this.reduce(function (partial, value) {
    return partial + value;
  })
};

const App = StackNavigator({
  Main: { screen: Main },
  Demo: { screen: mainDemo },
  PieChart: { screen: PieCharts },
  BarChart: { screen: BarCharts },
  DoughnutCharts: { screen: DoughnutCharts },  
  ViewDemo: { screen: ViewDemo },    
  WebDemo: { screen: WebDemo }
});



import doughnut from './lib/elements/doughnut';

AppRegistry.registerComponent('PracticeDemo', () => App);
