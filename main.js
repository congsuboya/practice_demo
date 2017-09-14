import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity
} from 'react-native';


export default class Main extends React.Component {

    static navigationOptions = {
        title: '主列表',
        headerTitleStyle: {
            alignSelf: 'center'
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            Data: [
                { name: 'Demo', id: 1 },
                { name: '饼图', id: 2 },
                { name: '柱状图', id: 3 },
                { name: '环形图', id: 4 },
                { name: '基础类', id: 5 },
                { name: 'webView图', id: 100 },
            ]
        }
        this.renderItem = this.renderItem.bind(this);
        this.clickItem = this.clickItem.bind(this);

    }

    clickItem(Id) {
        const { navigate } = this.props.navigation;
        switch (Id) {
            case 1:
                navigate('Demo')
                return;
            case 2:
                navigate('PieChart')
                return;
            case 3:
                navigate('BarChart')
                return;
            case 4:
                navigate('DoughnutCharts')
                return;
            case 5:
                navigate('ViewDemo')
                return;
            case 100:
                navigate('WebDemo')
                return;
        }
    }

    renderItem({ item }) {
        return (
            <TouchableOpacity onPress={() => this.clickItem(item.id)} >
                <View key={item.id} style={{ height: 50, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 18 }}>{item.name}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <FlatList
                data={this.state.Data}
                renderItem={this.renderItem}
                ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: 'gray' }} />}
            />
        )
    }
}