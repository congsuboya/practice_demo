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
        xAxis: { type: 'value', name: '总人数' },
        yAxis:
            {
                type: 'category',
                name: '客户名称',
                data:
                    ['澳洲布莱堡工业集团',
                        '毕尔巴鄂比斯开银行',
                        '安盛',
                        '阿塞洛',
                        '安海斯-布希(品牌:百威)',
                        '美国电话电报无线公司',
                        '英杰华',
                        '旭化成',
                        '旭硝子',
                        '阿海珐',
                        '艾地盟',
                        '布朗-福曼公司',
                        '百思买',
                        '伯克希尔哈撒韦',
                        '加拿大贝尔电子']
            },
        series:
            [{ name: '132313', data: [57] },
            { name: '132314', data: [, 102] },
            { name: '132315', data: [, , 150] },
            { name: '132321', data: [, , , 99] },
            { name: '132329', data: [, , , 99] },
            { name: '132330', data: [, , , , 180] },
            { name: '132332', data: [, , , , , 59] },
            { name: '132333', data: [, , , , 180] },
            { name: '132334', data: [, , 150] },
            { name: '132335', data: [, , 150] },
            { name: '132342', data: [, , , , 180] },
            { name: '132343', data: [, , , , , , 53] },
            { name: '132344', data: [, , , , , , , 193] },
            { name: '132345', data: [, , , , , , , , 264] },
            { name: '132346', data: [, , , , , , , , , 64] },
            { name: '132347', data: [, , , , , , , , , , 202] },
            { name: '132348', data: [, , , 99] },
            { name: '132400', data: [, , , , , , , , , , , 88] },
            { name: '132807', data: [, , , , , , , , , , , , 257] },
            { name: '132826', data: [, , , , , , , , , , , , , 116] },
            { name: '132827', data: [, , , , , , , , , , , , , , 290] },
            { name: '132832', data: [, , , , 180] },
            { name: '132833', data: [, , , , , , 53] },
            { name: '132834', data: [, , , , , , , 193] },
            { name: '132835', data: [, , , , , , , , 264] },
            { name: '132836', data: [, , , , , , , , , 64] },
            { name: '132837', data: [, , , , , , , , , , 202] },
            { name: '132865', data: [, , 150] },
            { name: '132872', data: [, , , , , 59] },
            { name: '132873', data: [, , , , 180] },
            { name: '132874', data: [, , , , , , 53] },
            { name: '132875', data: [, , , , , , , 193] },
            { name: '132876', data: [, , , , , , , , 264] },
            { name: '132877', data: [, , , , , , , , , 64] },
            { name: '132878', data: [, , , , , , , , , , 202] },
            { name: '132879', data: [, , , 99] },
            { name: '132931', data: [, , , , , , , , , , , 88] },
            { name: '132937', data: [, , 150] },
            { name: '132944', data: [, , , , , 59] },
            { name: '132945', data: [, , , , 180] },
            { name: '132946', data: [, , , , , , 53] },
            { name: '132947', data: [, , , , , , , 193] },
            { name: '132948', data: [, , , , , , , , 264] },
            { name: '132949', data: [, , , , , , , , , 64] },
            { name: '132950', data: [, , , , , , , , , , 202] },
            { name: '132951', data: [, , , 99] },
            { name: '132960', data: [, , 150] },
            { name: '132967', data: [, , , , , 59] },
            { name: '132968', data: [, , , , 180] },
            { name: '132969', data: [, , , , , , 53] },
            { name: '132970', data: [, , , , , , , 193] },
            { name: '132971', data: [, , , , , , , , 264] },
            { name: '132972', data: [, , , , , , , , , 64] },
            { name: '132973', data: [, , , , , , , , , , 202] },
            { name: '132978', data: [, , 150] },
            { name: '132985', data: [, , , , , 59] },
            { name: '132986', data: [, , , , , , 53] },
            { name: '132987', data: [, , , , , , , 193] },
            { name: '132988', data: [, , , , , , , , 264] },
            { name: '132989', data: [, , , , , , , , , 64] },
            { name: '132990', data: [, , 150] },
            { name: '133001', data: [, , 150] }],
        stack: false
    },
    valueInterval: 3,
    style: { height: 400, width: window.width },
    interWidth: 10
}