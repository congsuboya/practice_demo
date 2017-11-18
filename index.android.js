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


import HorizontalBar from './src/horizontalBarCharts';
import HorizontalBarStack from './src/horizontalBarStackCharts';
import VerticalBar from './src/verticalBarCharts';
import VerticalBarStack from './src/verticalBarStackCharts';
import LineDemo from './src/lineCharts';
import FunnelDemo from './src/funnelCharts'
import PieDemo from './src/pieCharts'



import DoughnutCharts from './src/doughnutCharts';//环形图
import ViewDemo from './src/viewDemo';



Array.prototype.sum = function () {
  return this.reduce(function (partial, value) {
    return partial + value;
  })
};

const App = StackNavigator({
  Main: { screen: Main },
  HorizontalBar: { screen: HorizontalBar },
  HorizontalBarStack: { screen: HorizontalBarStack },
  VerticalBar: { screen: VerticalBar },
  VerticalBarStack: { screen: VerticalBarStack },
  LineDemo: { screen: LineDemo },
  FunnelDemo: { screen: FunnelDemo },
  PieDemo: { screen: PieDemo }

});



import doughnut from './lib/elements/doughnut';

import Demo from './base/demo';

AppRegistry.registerComponent('PracticeDemo', () => App);
