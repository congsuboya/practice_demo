import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  processColor,
  Dimensions
} from 'react-native';
import update from 'immutability-helper';

import _ from 'lodash';
import { LineChart } from 'react-native-charts-wrapper';

const window = Dimensions.get('window');

const COLOR_PURPLE = processColor('#697dfb');

class LineChartView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      data: {},
      xAxis: {},
      yAxis: {},
      ...props.option
    };
  }

  componentDidMount() {
  }

  handleSelect(event) {
    let entry = event.nativeEvent
    if (entry == null) {
      this.setState({ ...this.state, selectedEntry: null })
    } else {
      this.setState({ ...this.state, selectedEntry: JSON.stringify(entry) })
    }
    console.log(event.nativeEvent)
  }



  render() {
    return (

      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <LineChart
            style={styles.chart}
            data={this.state.data}
            chartDescription={{ text: 'sdfsfs' }}
            xAxis={this.state.xAxis}
            yAxis={this.state.yAxis}
            animation={{ durationX: 1500 }}
            marker={{
              enabled: true,
              markerColor: processColor('#0E4068'),
              textColor: processColor('white'),
              markerFontSize: 14,
            }}
            legend={{ enabled: false }}
            onSelect={this.handleSelect.bind(this)}
            onChange={(event) => console.log(event.nativeEvent)}
            ref="chart"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  chart: {
    width: window.width,
    height: 230
  }
});


LineChartView.defaultProps = {
  option: {
    xAxis: {
      textColor: processColor('#8FA1B2'),//x轴字体颜色
      textSize: 10,//字体大小
      drawGridLines: false,//是否画x轴的竖线
      axisLineColor: processColor('#8FA1B2'),//x轴线的颜色
      axisLineWidth: 0.5,//x轴线的宽度
      avoidFirstLastClipping: true,
      position: 'BOTTOM',
      granularityEnabled: true,
      data: ['Mon', 'Tue', 'Wed', 'Thusssss', 'Fri', 'Satsfsffsfsdfsdfsf', 'Sun', 'wqe', 'sdr', 'opu'],
    },
    yAxis: {
      left: {
        drawGridLines: true
      },
      right: {
        enabled: false
      }
    },
    data: {
      dataSets: [{
        values: [{ y: -90 }, { y: 130 }, { y: -2000, marker: "eat more" }, { y: 9000, marker: "eat less" }
        ],
        label: '',
        config: {
          lineWidth: 1,
          drawCircles: true,
          circleColor: processColor('#8FA1B2'),
          drawCubicIntensity: 0.3,
          drawHighlightIndicators: false,
          color: processColor('#8FA1B2'),
          drawFilled: false,
          mode: "CUBIC_BEZIER",
          highlightColor: processColor('red')
        }
      },
      {
        values: [{ y: 100 }, { y: 1300 }, { y: -1000, marker: "eat more" }, { y: 8000, marker: "eat less" }],
        label: '',
        config: {
          lineWidth: 1,
          drawCircles: true,
          circleColor: processColor('#8FA1B2'),
          drawCubicIntensity: 0.3,
          drawHighlightIndicators: false,
          color: processColor('#8FA1B2'),
          drawFilled: false,
          mode: "CUBIC_BEZIER",
          highlightColor: processColor('red')
        }
      }
      ],
    }
  }
}

export default LineChartView;
