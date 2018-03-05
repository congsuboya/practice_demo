import React from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    processColor,
    Dimensions
} from 'react-native';

import { BarChart } from 'react-native-charts-wrapper';
const window = Dimensions.get('window');
import { AssemblBarConfig } from './chartUtils';

class BarChartView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            legend: {
                enabled: false,
                textSize: 14,
                form: 'SQUARE',
                formSize: 14,
                xEntrySpace: 5,
                yEntrySpace: 5,
                formToTextSpace: 5,
                wordWrapEnabled: true,
                maxSizePercent: 0.5
            },
            autoScaleMinMaxEnabled: false,//沿X轴滑动时自动根据y轴的最大最小值自动缩放，
            ...AssemblBarConfig(props.option)
        };
    }

    handleSelect(event) {
        let entry = event.nativeEvent
        if (entry == null) {
            this.setState({ ...this.state, selectedEntry: null })
        } else {
            this.setState({ ...this.state, selectedEntry: JSON.stringify(entry) })
        }
    }


    render() {
        return (
            <View style={{ flex: 0 }}>
                <BarChart
                    style={this.props.style}
                    data={this.state.data}
                    xAxis={this.state.xAxis}
                    yAxis={this.state.yAxis}
                    animation={{ durationY: 1100 }}
                    legend={{ enabled: false }}
                    gridBackgroundColor={processColor('#ffffff')}
                    drawBarShadow={false}
                    marker={{
                        enabled: true,
                        markerColor: processColor('black'),
                        textColor: processColor('white'),
                        markerFontSize: 14,
                        digits: 2,
                    }}
                    drawValueAboveBar={true}
                    drawHighlightArrow={true}
                    onSelect={this.handleSelect.bind(this)}
                    onChange={(event) => console.log(event.nativeEvent)}
                    chartDescription={this.state.chartDescription}
                    autoScaleMinMaxEnabled={this.state.autoScaleMinMaxEnabled}
                />
            </View>
        );
    }
}

BarChartView.defaultProps = {
    style: { height: 400, width: window.width },
    option: {
        valueFormatter: ['Mon', 'Tue', 'Wed', 'Thusssss'],
        stack: true,
        stackNum: 3,
        dataMap: [{
            data: [{ y: [40], marker: ["row1", "row2", "row3"] }, { y: [10], marker: "second" }, { y: [30], marker: ["hello", "world", "third"], llll: { name: 'haha', value: 121 } }, { y: [30], marker: "fourth" }],
            label: '第一个'
        }]
    }
};

export default BarChartView;
