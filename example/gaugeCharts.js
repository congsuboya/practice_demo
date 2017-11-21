import React, { Component } from 'react';
import {
    View,
    TextInput,
    Button,
    Slider,
    Dimensions
} from 'react-native';

const { width, height } = Dimensions.get('window');

import { Gauge } from '../src';

export default class GaugeCharts extends React.Component {

    static navigationOptions = {
        title: '仪表盘',
    };

    constructor(props) {
        super(props);

    }


    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Gauge style={{ height: 230, width: width }} />
            </View>
        )
    }
}