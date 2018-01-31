import React from 'react';
import {
    Text,
    View,
    processColor,
    Dimensions
} from 'react-native';
import { LineChart } from 'react-native-charts-wrapper';

const window = Dimensions.get('window');

import { AssemblLineConfig } from './chartUtils';

class LineChartView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...AssemblLineConfig(props.option)
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
            <View style={{ flex: 0 }}>
                <LineChart
                    style={this.props.style}
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
        );
    }
}




LineChartView.defaultProps = {
    style: { height: 230, width: window.width },
    option: {
        valueFormatter: ['Mon', 'Tue', 'Wed', 'Thusssss'],
        dataMap: [{
            data: [{
                y: 109,
                markerObj:
                    [{ valueName: '顺序', value: 'Mon' },
                    { valueName: '度量', value: 109 }]
            }, {
                y: 105,
                markerObj:
                    [{ valueName: '顺序', value: 'Tue' },
                    { valueName: '度量', value: 105 }]
            }, {
                y: 99,
                markerObj:
                    [{ valueName: '顺序', value: 'Wed' },
                    { valueName: '度量', value: 99 }]
            }, {
                y: 95,
                markerObj:
                    [{ valueName: '顺序', value: 'Thusssss' },
                    { valueName: '度量', value: 95 }]
            }],
            label: '第一个'
        }, {
            data: [{ y: 105 }, { y: 102 }, { y: 110 }, { y: 114 }],
            label: '第二个'
        }],
        valueName: '度量',
        dimensName: '顺序'
    }
}


export default LineChartView;
