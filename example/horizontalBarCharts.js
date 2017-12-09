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
        xAxis:
            {
                type: 'category',
                title: '客户所有人',
                data: ['杨爽', '张建昂', '王吉亮', '徐志磊', '矮大紧', '李亚超']
            },
        yAxis: { type: 'value', title: '客户名称' },
        series:
            [
                { name: '销售部', data: [2, 0, 0, 0, 0, 0] },
                { name: '销售一部', data: [42, 50, 43, 38, 68, 64] },
                { name: '销售三部', data: [1, 0, 0, 0, 0, 0] },
                { name: '研发部', data: [1, 0, 0, 0, 0, 0] }
            ],
        stack: false
    },
    valueInterval: 6,
    style: { height: 400, width: window.width },
    interWidth: 10
}