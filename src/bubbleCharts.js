import React, { Component } from 'react';
import {
    View,
    TextInput,
    Button,
    Slider,
    Dimensions
} from 'react-native';

const { width, height } = Dimensions.get('window');

import Bubble from '../lib/elements/bubble';

export default class BarCharts extends React.Component {

    static navigationOptions = {
        title: '气泡图',
    };

    constructor(props) {
        super(props);

    }


    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Bubble style={{ height: 500, width: width }} />
            </View>
        )
    }
}