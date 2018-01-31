
import React from 'react';

import { AppRegistry } from 'react-native';

import { StackNavigator } from 'react-navigation';


import Main from './App';


import HorizontalBar from './example/horizontalBarCharts';
import HorizontalBarStack from './example/horizontalBarStackCharts';
import VerticalBar from './example/verticalBarCharts';
import VerticalBarStack from './example/verticalBarStackCharts';
import LineDemo from './example/lineCharts';
import FunnelDemo from './example/funnelCharts';
import PieDemo from './example/pieCharts';
import BubbleDemo from './example/bubbleCharts';
import GaugeDemo from './example/gaugeCharts';

import ChartsListScreen from './app/GroupBarChartScreen';
import ChartsListScreen2 from './app/AxisLineChartScreen';
import ChartsListScreen3 from './app/BubbleChartScreen';
import ChartsListScreen4 from './app/HorizontalBarChartScreen';
import ChartsListScreen5 from './app/BarChartScreen';


import LineChartView from './baseChartView/LineChartView';
import BarChartView from './baseChartView/BarChartView';



const App = StackNavigator({
  Main: { screen: Main },
  HorizontalBar: { screen: ChartsListScreen },
  HorizontalBarStack: { screen: BarChartView },
  VerticalBar: { screen: ChartsListScreen3 },
  VerticalBarStack: { screen: ChartsListScreen4 },
  LineDemo: { screen: LineChartView },
  FunnelDemo: { screen: FunnelDemo },
  PieDemo: { screen: PieDemo },
  BubbleDemo: { screen: BubbleDemo },
  GaugeDemo: { screen: GaugeDemo },
});


import TestDemo from './testDemo';


AppRegistry.registerComponent('PracticeDemo', () => TestDemo);
