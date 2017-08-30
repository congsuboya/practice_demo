import React, { Component } from 'react';
import {
    View,
    TextInput,
    Button,
    Slider,
    Dimensions
} from 'react-native';

const { width, height } = Dimensions.get('window');

import { Pie } from '../lib';

export default class PieCharts extends React.Component {

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
                <Pie pieData={data} style={{ height: 300 }} pieR={parseInt(pieR)} />
                <View style={{ width: width, alignItems: 'center', height: 150 }}>
                    <Slider
                        key='1'
                        value={data[0]}
                        style={{ width: 250 }}
                        minimumTrackTintColor={'#fe0'}
                        maximumValue={100}
                        minimumValue={0}
                        onValueChange={(value) => {
                            data.splice(0, 1, value);
                            this.setState({
                                data: data,
                            })
                        }} />
                    <Slider
                        key='2'
                        value={data[1]}
                        style={{ width: 250 }}
                        minimumTrackTintColor={'#0a0'}
                        maximumValue={100}
                        minimumValue={0}
                        onValueChange={(value) => {
                            data.splice(1, 1, value);
                            this.setState({
                                data: data,
                            })
                        }} />
                    <Slider
                        key='3'
                        value={data[2]}
                        style={{ width: 250 }}
                        minimumTrackTintColor={'#e00'}
                        maximumValue={100}
                        minimumValue={0}
                        onValueChange={(value) => {
                            data.splice(2, 1, value);
                            this.setState({
                                data: data,
                            })
                        }} />
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
                                pieR:100
                            })
                        }}
                        title="重置"
                    />
                </View>
            </View>
        )
    }
}