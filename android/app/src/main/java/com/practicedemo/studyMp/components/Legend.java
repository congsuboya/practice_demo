package com.practicedemo.studyMp.components;

/**
 * 表示图表图例的类。
 * 该图例将包含每种颜色和DataSet的一个条目。
 * 一个DataSet中的多种颜色组合在一起。
 * 将数据设置到图表之前，图例对象不可用。
 * Created by liuchao on 2018/3/5.
 */

public class Legend extends ComponentBase {

    public enum LegendFrom{
        /**
         * 避免绘制表单
         */
        NONE,

        /**
         * 不要画表格，但留出空间
         */
        EMPTY,

        /**
         * 使用默认（默认数据集的形式到图例的形式）
         */
        DEFAULT,

        /**
         * 画一个正方形
         */
        SQUARE,

        /**
         * 画一个圆
         */
        CIRCLE,

        /**
         * 画一条水平线
         */
        LINE
    }
}
