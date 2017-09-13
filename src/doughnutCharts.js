import React, { Component } from 'react';
import {
    View,
    TextInput,
    Button,
    Slider,
    Dimensions
} from 'react-native';

const { width, height } = Dimensions.get('window');

import { Doughnut } from '../lib';

export default class DoughnutCharts extends React.Component {

    static navigationOptions = {
        title: '饼图',
    };

    constructor(props) {
        super(props);
        this.state = {
            data: [10, 30, 70],
            pieR: 100
        }
    }

    render() {
        let { data, pieR } = this.state;
        return (
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Doughnut pieData={data} style={{ height: 300 }} pieR={parseInt(pieR)} />
                <View style={{ width: width, alignItems: 'center', height: 150 }}>
                    <Slider
                        key='4'
                        value={pieR}
                        style={{ width: 250 }}
                        minimumTrackTintColor={'blue'}
                        maximumValue={100}
                        minimumValue={0}
                        onValueChange={(value) => {
                            this.setState({
                                pieR: value,
                            })
                        }} />
                </View>
                <View style={{ width: 100 }}>
                    <Button
                        style={{ width: 100 }}
                        onPress={() => {
                            this.setState({
                                data: [10, 30, 70],
                                pieR: 100
                            })
                        }}
                        title="重置"
                    />
                </View>
            </View>
        )
    }
}