import React, { Component } from 'react';
import {
    View
} from 'react-native';


import HorizontalBar from './horizontalBar';
import VerticalBar from './verticalBar';
import { dealWithOption } from '../utils/applicationUtils';

export default class Bar extends React.Component {
    constructor(props) {
        super(props)
        let { height, width } = props.style;
        let viewHeight = height ? height : 300;
        let viewWidth = width ? width : window.width;
        this.state = {
            viewHeight,
            viewWidth,
            interWidth: props.interWidth,
            valueInterval: props.valueInterval,
            ...dealWithOption(viewWidth, viewHeight, props.option, props.valueInterval)
        }
    }

    render() {
        if (this.state.horizontal) {
            return <HorizontalBar {...this.state} style={this.props.style} />
        } else {
            return <VerticalBar {...this.state} style={this.props.style} />
        }
    }

}

Bar.defaultProps = {
    option: {
        xAxis: {
            type: 'category',
            // type: 'value',
            data: ['Mon', 'Tue', 'Wed', 'Thusssss', 'Fri', 'Sat', 'Sun', 'wqe', 'sdr', 'opu'],
            axisTick: {
                alignWithLabel: true
            }
        },
        yAxis: {
            // type: 'category',
            type: 'value',
            data: ['Mon', 'Tue', 'Wed', 'Thusssss', 'Fri', 'Sat', 'Sun', 'wqe', 'sdr', 'opu'],
            axisTick: {
                alignWithLabel: true
            }
        },
        series: [
            {
                name: '直接访问',
                type: 'bar',
                barWidth: '60%',
                data: [10, 5, 2, 3, 10, 7, 6, 5, 2, 3,]
            },
            {
                name: '直接访问',
                type: 'bar',
                barWidth: '60%',
                data: [3, 4, 1, 4, 2, 8, 3, 3, 10, 7]
            }
        ],
        stack: false
    },
    valueInterval: 3,
    style: { height: 400, width: window.width },
    interWidth: 10
}