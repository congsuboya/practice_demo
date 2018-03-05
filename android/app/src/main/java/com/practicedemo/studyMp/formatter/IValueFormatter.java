package com.practicedemo.studyMp.formatter;

import com.practicedemo.studyMp.data.Entry;
import com.practicedemo.studyMp.utils.ViewPortHandler;

/**
 * Created by liuchao on 2018/3/5.
 */

public interface IValueFormatter {


    /**
     * 在绘制之前，对值（来自图表中的标签）进行格式化时调用。
     * 出于性能原因，请避免在此方法内部进行过多的计算和内存分配。
     *
     * @param value           要格式化的值
     * @param entry           该值属于的条目 - 例如， BarChart，这是BarEntry类的
     * @param dataSetIndex    焦点入口所属的DataSet的索引
     * @param viewPortHandler 提供有关当前图表状态（比例，翻译...）的信息
     * @return 准备好的被绘制的格式化标签
     */
    String getFormattedValue(float value, Entry entry, int dataSetIndex, ViewPortHandler viewPortHandler);
}
