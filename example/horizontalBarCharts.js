import React, { Component } from 'react';
import {
    View,
    TextInput,
    Button,
    Slider,
    Dimensions
} from 'react-native';

const { width, height } = Dimensions.get('window');

import { Bar } from '../src';

import Svg, {
    Circle,
    Path,
    Rect,
    G,
    TSpan,
    Text as SvgText
} from 'react-native-svg';

export default class HorizontalBarCharts extends React.Component {

    static navigationOptions = {
        title: '水平普通柱形图',
    };

    constructor(props) {
        super(props);
        this.state = {
            data: [100, 120, 70],
            yMax: 200
        }
    }

    rnd(n, m) {
        return Math.floor(Math.random() * (m - n + 1) + n);
    }

    produceData() {
        let data = [];
        let num = Math.floor(Math.random() * (4) + 3);
        for (let i = 0; i < num; i++) {
            data.push(this.rnd(10, 200));
        }
        return data;
    }

    render() {
        let { data, yMax } = this.state;
        return (
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Bar style={{ height: 230, width: width }} option={this.props.option} valueInterval={3} />
            </View>
        )
    }
}

HorizontalBarCharts.defaultProps = {
    option: {
        xAxis: {
            type: 'category',
            // type: 'value',
            name: 'x轴名称',
            show: true,
            data: ['Mon', 'Tue', 'Wed', 'Thusssss', 'Fri', 'Satsfsffsfsdfsdfsf', 'Sun', 'wqe', 'sdr', 'opu'],
        },
        yAxis: {
            // type: 'category',
            type: 'value',
            name: 'y轴名称',
            show: true,
            data: ['Mon', 'Tue', 'Wed', 'Thusssss', 'Fri', 'Satsfsffsf', 'Sun', 'wqe', 'sdr', 'opu'],
        },
        series: [
            {
                name: '直接访问',
                type: 'bar',
                barWidth: '60%',
                data: [-10, -5, -2, -3, -4, -7, -6, -5, -2, -3,]
            },
            {
                name: '非直接访问',
                type: 'bar',
                barWidth: '60%',
                data: [-3, -4, -1, -4, -2, -8, -3, -3, -10, -7]
            }
        ],
        stack: false
    },
    valueInterval: 6,
    style: { height: 400, width: window.width },
    interWidth: 10
}