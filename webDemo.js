import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,
    ScrollView
} from 'react-native';
import Echarts from 'native-echarts';

const { width } = Dimensions.get('window');



export default class WebDemo extends Component {

    static navigationOptions = {
        title: 'WebDemo'
    };

    constructor(props) {
        super(props);
        this.state = {
            apple: [2, 4, 7, 2, 2, 7, 13, 16],
            organ: [6, 9, 9, 2, 8, 7, 17, 18],
        }
    }

    render() {

        const option1 = {
            //点击某一个点的数据的时候，显示出悬浮窗
            tooltip: {
                trigger: 'axis'
            },
            //可以手动选择现实几个图标
            legend: {
                data: ['苹果', '橘子']
            },
            //各种表格
            toolbox: {
                //改变icon的布局朝向
                //orient: 'vertical',
                show: true,
                showTitle: true,
                feature: {
                    //show是否显示表格，readOnly是否只读
                    dataView: { show: true, readOnly: false },
                    magicType: {
                        //折线图  柱形图    总数统计 分开平铺
                        type: ['line', 'bar', 'stack', 'tiled'],
                    },

                }
            },
            xAxis: [
                {
                    //就是一月份这个显示为一个线段，而不是数轴那种一个点点
                    boundaryGap: true,
                    type: 'category',
                    name: '时间',
                    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月']
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '销量(kg)'
                }
            ],
            //图形的颜色组
            color: ['rgb(249,159,94)', 'rgb(67,205,126)'],
            //需要显示的图形名称，类型，以及数据设置
            series: [
                {
                    name: '苹果',
                    //默认显
                    type: 'bar',
                    data: this.state.apple
                },
                {
                    name: '橘子',
                    type: 'bar',
                    data: this.state.organ
                }
            ]
        };

        const option2 = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎', '百度', '谷歌', '必应', '其他']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '直接访问',
                    type: 'bar',
                    data: [320, 332, 301, 334, 390, 330, 320]
                },
                {
                    name: '邮件营销',
                    type: 'bar',
                    stack: '广告',
                    data: [120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name: '联盟广告',
                    type: 'bar',
                    stack: '广告',
                    data: [220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name: '视频广告',
                    type: 'bar',
                    stack: '广告',
                    data: [150, 232, 201, 154, 190, 330, 410]
                },
                {
                    name: '搜索引擎',
                    type: 'bar',
                    data: [862, 1018, 964, 1026, 1679, 1600, 1570],
                    markLine: {
                        lineStyle: {
                            normal: {
                                type: 'dashed'
                            }
                        },
                        data: [
                            [{ type: 'min' }, { type: 'max' }]
                        ]
                    }
                },
                {
                    name: '百度',
                    type: 'bar',
                    barWidth: 5,
                    stack: '搜索引擎',
                    data: [620, 732, 701, 734, 1090, 1130, 1120]
                },
                {
                    name: '谷歌',
                    type: 'bar',
                    stack: '搜索引擎',
                    data: [120, 132, 101, 134, 290, 230, 220]
                },
                {
                    name: '必应',
                    type: 'bar',
                    stack: '搜索引擎',
                    data: [60, 72, 71, 74, 190, 130, 110]
                },
                {
                    name: '其他',
                    type: 'bar',
                    stack: '搜索引擎',
                    data: [62, 82, 91, 84, 109, 110, 120]
                }
            ]
        };

        const option3 = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'horizontal',
                x: 'left',
                data: ['直达', '营销广告', '搜索引擎', '邮件营销', '联盟广告', '视频广告', '百度', '谷歌', '必应', '其他']
            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    selectedMode: 'single',
                    radius: [0, '30%'],

                    label: {
                        normal: {
                            position: 'inner'
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: [
                        { value: 335, name: '直达', selected: true },
                        { value: 679, name: '营销广告' },
                        { value: 1548, name: '搜索引擎' }
                    ]
                },
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: ['40%', '55%'],
                    label: {
                        normal: {
                            formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                            backgroundColor: '#eee',
                            borderColor: '#aaa',
                            borderWidth: 1,
                            borderRadius: 4,
                            rich: {
                                a: {
                                    color: '#999',
                                    lineHeight: 22,
                                    align: 'center'
                                },
                                hr: {
                                    borderColor: '#aaa',
                                    width: '100%',
                                    borderWidth: 0.5,
                                    height: 0
                                },
                                b: {
                                    fontSize: 16,
                                    lineHeight: 33
                                },
                                per: {
                                    color: '#eee',
                                    backgroundColor: '#334455',
                                    padding: [2, 4],
                                    borderRadius: 2
                                }
                            }
                        }
                    },
                    data: [
                        { value: 335, name: '直达' },
                        { value: 310, name: '邮件营销' },
                        { value: 234, name: '联盟广告' },
                        { value: 135, name: '视频广告' },
                        { value: 1048, name: '百度' },
                        { value: 251, name: '谷歌' },
                        { value: 147, name: '必应' },
                        { value: 102, name: '其他' }
                    ]
                }
            ]
        };

        const option4 = {
            title: {
                text: '浏览器占比变化',
                subtext: '纯属虚构',
                top: 10,
                left: 10
            },
            tooltip: {
                trigger: 'item',
                backgroundColor: 'rgba(0,0,250,0.2)'
            },
            legend: {
                type: 'scroll',
                bottom: 10,
                data: (function () {
                    var list = [];
                    for (var i = 1; i <= 28; i++) {
                        list.push(i + 2000 + '');
                    }
                    return list;
                })()
            },
            visualMap: {
                top: 'middle',
                right: 10,
                color: ['red', 'yellow'],
                calculable: true
            },
            radar: {
                indicator: [
                    { text: 'IE8-', max: 400 },
                    { text: 'IE9+', max: 400 },
                    { text: 'Safari', max: 400 },
                    { text: 'Firefox', max: 400 },
                    { text: 'Chrome', max: 400 }
                ]
            },
            series: (function () {
                var series = [];
                for (var i = 1; i <= 28; i++) {
                    series.push({
                        name: '浏览器（数据纯属虚构）',
                        type: 'radar',
                        symbol: 'none',
                        itemStyle: {
                            normal: {
                                lineStyle: {
                                    width: 1
                                }
                            },
                            emphasis: {
                                areaStyle: { color: 'rgba(0,250,0,0.3)' }
                            }
                        },
                        data: [
                            {
                                value: [
                                    (40 - i) * 10,
                                    (38 - i) * 4 + 60,
                                    i * 5 + 10,
                                    i * 9,
                                    i * i / 2
                                ],
                                name: i + 2000 + ''
                            }
                        ]
                    });
                }
                return series;
            })()
        };


        return (
            <ScrollView style={{ flex: 1 }}>
                <Echarts option={option3} height={450} width={width} />
                <Echarts option={option1} height={300} width={width} />
                <Echarts option={option2} height={500} width={width} />
                <Echarts option={option4} height={500} width={width} />
            </ScrollView>

        );
    }
}