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

const App = StackNavigator({
  Main: { screen: Main },
  HorizontalBar: { screen: HorizontalBar },
  HorizontalBarStack: { screen: HorizontalBarStack },
  VerticalBar: { screen: VerticalBar },
  VerticalBarStack: { screen: VerticalBarStack },
  LineDemo: { screen: LineDemo },
  FunnelDemo: { screen: FunnelDemo },
  PieDemo: { screen: PieDemo },
  BubbleDemo: { screen: BubbleDemo },
  GaugeDemo: { screen: GaugeDemo },
});

AppRegistry.registerComponent('PracticeDemo', () => App);
