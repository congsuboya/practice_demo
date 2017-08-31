/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Animated,
    TouchableOpacity,
    View,
    ScrollView,
    Button
} from 'react-native';
import Svg, {
    Circle,
    Ellipse,
    G,
    LinearGradient,
    RadialGradient,
    Line,
    Path,
    Polygon,
    Polyline,
    Rect,
    Symbol,
    Use,
    Defs,
    Stop,
    TextPath,
    TSpan,
    Text,
    ClipPath
} from 'react-native-svg';

let AnimatedPath = Animated.createAnimatedComponent(Path);
let AnimatedCircle = Animated.createAnimatedComponent(Circle)

export default class AwesomeProject extends Component {

    static navigationOptions = {
        title: 'Demo'
    };

    constructor(props) {
        super(props);
        this.startAnimation = this.startAnimation.bind(this);
        this.state = {
            lineFillAnimation: new Animated.Value(0),
            circleFillAnimation: new Animated.Value(0)
        };
        this.dasharray = [Math.PI * 2 * 42];
        this.lineAnimation = this.state.lineFillAnimation.interpolate({
            inputRange: [
                0,
                100
            ],
            outputRange: [
                `M5 8 l0 0`,
                `M5 8 l215 0`,
            ]
        });
        this.circleAnimation = this.state.circleFillAnimation.interpolate({
            inputRange: [
                0,
                100,
            ],
            outputRange: [
                this.dasharray[0],
                0
            ]
        });
    }
    componentDidMount() {
        this.startAnimation();
    }
    startAnimation() {
        this.state.lineFillAnimation.setValue(0);
        this.state.circleFillAnimation.setValue(0);

        Animated.spring(
            this.state.lineFillAnimation,
            {
                toValue: 80,
                friction: 5,
                tension: 35
            }
        ).start();
        Animated.spring(
            this.state.circleFillAnimation,
            {
                toValue: 80,
                friction: 5,
                tension: 35
            }
        ).start();
    }
    render() {
        const path = `
        M 10 20
         C 40 10 60  0 80 10
         C 100 20 120 30 140 20
         C 160 10 180 10 180 10
    `;


        let startAngle = 0;
        let cx = 100;
        let cy = 100;
        let r = 100;
        let deg1 = 30 + startAngle;
        let deg2 = 240 + deg1;
        let deg3 = 90 + deg2;

        let x0 = cx + r * Math.cos(startAngle * Math.PI / 180);
        let y0 = cy - r * Math.sin(startAngle * Math.PI / 180);

        let x1 = cx + r * Math.cos(deg1 * Math.PI / 180);
        let y1 = cy - r * Math.sin(deg1 * Math.PI / 180);

        let x2 = cx + r * Math.cos(deg2 * Math.PI / 180);
        let y2 = cy - r * Math.sin(deg2 * Math.PI / 180);

        let x3 = cx + r * Math.cos(deg3 * Math.PI / 180);
        let y3 = cy - r * Math.sin(deg3 * Math.PI / 180);

        let pathData1 = `M100 100,L${x0} ${y0},A${r},${r} 0 0,0 ${x1},${y1},Z`;
        let pathData2 = `M100 100,L${x1} ${y1},A${r},${r} 0 1,0 ${x2},${y2},Z`;
        let pathData3 = `M100 100,L${x2} ${y2},A${r},${r} 0 0,0 ${x3},${y3},Z`;

        return (
            <ScrollView>
                <View style={styles.container}>
                    <Svg
                        height="100"
                        width="100">
                        <Circle
                            cx="50"
                            cy="50"
                            r="42"
                            stroke="#3d5875"
                            strokeWidth="8"
                            fill="transparent"
                        />
                        <AnimatedCircle
                            cx="50"
                            cy="50"
                            r="42"
                            origin="50,50"
                            rotate="-90"
                            stroke="#00e0ff"
                            strokeWidth="8"
                            strokeLinecap="round"
                            fill="transparent"
                            strokeDasharray={this.dasharray}
                            strokeDashoffset={this.circleAnimation}
                        />
                    </Svg>

                    <Svg height="16" width="225">
                        <G fill="none" stroke="#3d5875">
                            <Path strokeLinecap="round" strokeWidth="8" d="M5 8 l215 0" />
                        </G>
                        <G fill="none" stroke="#00e0ff">
                            <AnimatedPath strokeLinecap="round" strokeWidth="8" d={this.lineAnimation} />
                        </G>
                    </Svg>
                    <Button
                        title={'试一下'}
                        onPress={this.startAnimation}
                    />

                    <Svg height="180" width="325">

                        <Defs>
                            <LinearGradient id="a1" x1="0" y1="0" x2="170" y2="0">
                                <Stop offset="0" stopColor="rgb(255,255,0)" stopOpacity="0" />
                                <Stop offset="1" stopColor="red" stopOpacity="1" />
                            </LinearGradient>
                        </Defs>

                        <Rect id="A" x="33" y="34" fill="#FF6CC4" stroke="#C30D23" stroke-width="3" width="75" height="75" />
                        <Rect id="B" x="119" y="54" fill="url(#a1)" stroke="#036EB7" stroke-width="3" width="117" height="55" onPress={() => alert('Press on Circle')} />
                        <Rect x="60" y="40" rx="10" ry="10" width="75" height="75" stroke="#FF5500" stroke-width="5" fill="#FFB255" />

                    </Svg>
                    <Svg height="150" width="300">
                        <Circle fill="#FF4343" stroke="#890000" stroke-width="5" cx="80.141" cy="73.446" r="44" />
                        <Ellipse fill="#77DD47" stroke="#246614" stroke-width="5" cx="100" cy="75" rx="50" ry="30" />

                    </Svg>

                    <Svg height="150" width="300">
                        <Path d="M0 40 c40 40,60 40,100,0 s150 -40, 200 0" stroke="black" fill="none" />
                        <Path d="M0 0 L50 50 A50 50,0 1 0 100 0" stroke="#000" fill="none" />
                        <Path d="M0 0 L50 50 A50 50,0 0 0 100 0" stroke="#f00" fill="none" onPress={() => alert('Press on Line')} />
                    </Svg>
                    <Svg height="100" width="300">
                        <Defs>
                            <Path
                                id="path"
                                d={path}
                            />
                        </Defs>
                        <G y="20">
                            <Text fill="blue">
                                <TextPath href="#path" startOffset="-10%">
                                    We go up and down,
                                  <TSpan fill="red" dy="5,5,5">then up again</TSpan>
                                </TextPath>
                            </Text>
                        </G>
                    </Svg>

                    <Svg height="200" width="300">
                        <ClipPath id="a1">
                            <Polygon id="a1Shape" points="100,10 40,180 190,60 10,60 160,180 100,10" stroke="blue" />
                        </ClipPath>

                        <ClipPath id="a2">
                            <Circle id="a2Shape" cx="100" cy="100" r="65" />
                        </ClipPath>

                        <ClipPath id="b1" clipPath="url(#a1)">
                            <Use x="0" y="0" width="200" height="200" href="#a2Shape" />
                        </ClipPath>

                        <ClipPath id="b2">
                            <Use x="0" y="0" width="200" height="200" href="#a1Shape" />
                            <Use x="0" y="0" width="200" height="200" href="#a2Shape" />
                        </ClipPath>

                        <Path id="test1" fill="#fe0" d={pathData1} />
                        <Path id="test2" fill="#0a0" d={pathData2} />
                        <Path id="test3" fill="#e00" d={pathData3} />
                    </Svg>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});