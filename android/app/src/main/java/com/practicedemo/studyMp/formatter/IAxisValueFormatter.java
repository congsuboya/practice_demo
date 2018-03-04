package com.practicedemo.studyMp.formatter;

import com.practicedemo.studyMp.components.AxisBase;

/**
 * Created by liuchao on 2018/3/4.
 */

public interface IAxisValueFormatter {


    /**
     * 在绘制之前，需要格式化来自轴的值时调用。
     * 出于性能原因，请避免在此方法内部进行过多的计算和内存分配。
     *
     * @param value the value to be formatted
     * @param axis  the axis the value belongs to
     * @return
     */
    String getFormattedValue(float value, AxisBase axis);
}
