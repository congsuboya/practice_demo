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

import NativeBar from '../src/elements/nativeBar';


const nativeOption = {
    "perLength": 116,
    "barCanvasHeight": 295,
    "offsetLength": 109,
    "rectWidth": 12,
    "intervalNum": 2,
    "perRectHeight": 24.583333333333332,
    "svgHeight": 450,
    "svgWidth": 310,
    "viewHeight": 500,
    "svgLength": 450,
    "viewWidth": 360,
    "interWidth": 10,
    "valueInterval": 3,
    "stack": false,
    "perInterLength": 98.33333333333333,
    "xAxis": {
        "data": [
            "Mon",
            "Tue",
            "Wed",
            "Thusssss",
            "Fri",
            "Sat",
            "Sun",
            "wqe",
            "sdr",
            "opu"
        ],
        "nameLocation": "start",
        "name": "",
        "nameRotate": 0,
        "position": "bottom",
        "type": "value",
        "show": true
    },
    "yAxis": {
        "data": [
            "Mon",
            "Tue",
            "Wed",
            "Thusssss",
            "Fri",
            "Sat",
            "Sun",
            "wqe",
            "sdr",
            "opu"
        ],
        "nameLocation": "end",
        "name": "",
        "nameRotate": 0,
        "position": "left",
        "type": "category",
        "show": true
    },
    "rectNum": 2,
    "horizontal": false,
    "maxNum": 12,
    "series": [
        {
            "data": [10, 5, 2, 3, 10, 7, 6, 5, 2, 3,],
            "name": "直接访问"
        },
        {
            "data": [3, 4, 1, 4, 2, 8, 3, 3, 10, 7],
            "name": "非直接访问"
        }
    ]
}

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
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <Bar style={{ height: 230, width: width }} option={this.props.option} valueInterval={3} />
            </View>
        )
    }
}

HorizontalBarCharts.defaultProps = {
    option: {
        xAxis: {
            // type: 'category',
            type: 'value',
            show: true,
            name: 'x轴名称',
            data: ["Mon",
                "Tue",
                "Wed",
                "Thusssss",
                "Fri",
                "Sat",
                "Sun",
                "wqe",
                "sdr",
                "opu", "Mon",
                "Tue",
                "Wed",
                "Thusssss",
                "Fri",
                "Sat",
                "Sun",
                "wqe",
                "sdr",
                "opu"],
        },
        yAxis: {
            type: 'category',
            // type: 'value',
            name: 'y轴名称',
            show: true,
            data: ["Mon",
                "Tue"],
        },
        series: [
            {
                "data": [-10, 5],
                "name": "直接访问"
            },
            {
                "data": [-3, -4],
                "name": "非直接访问"
            }
        ],
        stack: false
    },
    valueInterval: 3,
    style: { height: 400, width: window.width },
    interWidth: 10
}