package com.practicedemo.studyMp.listener;

import com.practicedemo.studyMp.data.Entry;
import com.practicedemo.studyMp.highlight.Highlight;

/**
 * 通过触摸手势在图表内选择值时的回调监听器。
 * <p>
 * Created by liuchao on 2018/3/11.
 */

public interface OnChartValueSelectedListener {

    /**
     * 在图表中选择一个值时调用。
     *
     * @param e 选择的Entry
     * @param h 包含有关高亮位置信息的相应高亮显示对象，例如dataSetIndex，...
     *
     */
    void onValueSelected(Entry e, Highlight h);

    /**
     * 当没有选择任何东西或已经做出“取消选择”时调用。
     */
    void onNothingSelected();
}
