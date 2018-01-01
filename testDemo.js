import React, { Component } from 'react';
import {
    View,
    Dimensions,
    ART
} from 'react-native';

import Svg, {
    Line,
    Circle,
    G,
    Rect,
    LinearGradient,
    Stop,
    Defs,
    Text as SvgText
} from 'react-native-svg';

const { Surface, Shape, Path, Group } = ART;

const window = Dimensions.get('window');

export default class Demo extends React.Component {

    GetRandomNum(Min, Max) {
        let Range = Max - Min;
        let Rand = Math.random();
        return (Min + Math.round(Rand * Range));
    }

    renderMuchBar() {
        let listView = [];
        let path;
        for (let i = 1; i < 3000; i++) {
            if (i == 1) {
                path = new Path().moveTo(0, this.GetRandomNum(0, 100)).lineTo(i, this.GetRandomNum(0, 100));
            } else {
                path = path.lineTo(i, this.GetRandomNum(0, 100));
            }
            listView.push(
                <Rect
                    key={i}
                    x={i + 1}
                    y='300'
                    width='1'
                    height={this.GetRandomNum(0, 100)}
                    fill="rgb(0,0,255)"
                />
            )
        }

        return <Shape key={'line'} d={path} stroke='rgb(0,0,255)' strokeWidth={1} />

        // return listView
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'yellow' }}>
                <Surface width={window.width} height='500' >
                    <Group scaleX='20'>
                        {this.renderMuchBar()}
                    </Group>
                </Surface>
            </View>
        )
    }
}
