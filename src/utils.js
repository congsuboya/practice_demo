import React, { Component } from 'react';
import BaseView from '../base/baseView';

export function DrawView(viewNode, parentStyle) {
    let children = [];
    if (viewNode.children && viewNode.children.length > 0) {
        viewNode.children.map((item) => {
            children.push(DrawView(item));
        });
    }
    return (
        <BaseView style={viewNode.style}>
            {children}
        </BaseView>
    )
}

export function TouchEventUtils(context) {
    return PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => false,
        onPanResponderGrant: () => {
            context.props.onBeginTouch ? context.props.onBeginTouch() : null
        },
        onPanResponderMove: (evt, gs) => {
            context.props.onTouchMove ? context.props.onTouchMove(evt, gs) : null
        },
        onPanResponderRelease: (evt, gs) => {
            if (!context.props.onTouchMove) {
                if (Math.abs(gs.dx) > 10) {
                    if (gs.dx > 0 && context.props.onRightSlip) {
                        context.props.onRightSlip();
                    } else if (gs.dx < 0 && context.props.onLeftSlip) {
                        context.props.onLeftSlip();
                    }
                } else if (Math.abs(gs.dy) < 10 && context.props.onTouch) {
                    context.props.onTouch();
                };
            }
        },
        onPanResponderTerminationRequest: (evt, gestureState) => true,
        onPanResponderTerminate: (evt, gestureState) => {
            // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
        }
    })
}