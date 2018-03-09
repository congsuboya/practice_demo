package com.practicedemo.studyMp.charts;

import android.content.Context;
import android.util.AttributeSet;
import android.view.ViewGroup;

import com.practicedemo.studyMp.data.ChartData;
import com.practicedemo.studyMp.data.Entry;
import com.practicedemo.studyMp.interfaces.ChartInterface;
import com.practicedemo.studyMp.interfaces.datasets.IDataSet;

/**
 * Created by chaoye on 2018/1/31.
 */

public abstract class Chart<T extends ChartData<? extends IDataSet<? extends Entry>>> extends ViewGroup implements ChartInterface {


    /**
     * log 的 key
     */
    public static final String LOG_TAG = "STUDY_MP";


    /**
     * 是否开启log的开关
     */
    protected boolean mLogEnable = false;


    /**
     * object that holds all data that was originally set for the chart, before
     * it was modified or any filtering algorithms had been applied
     */
    protected T mData = null;


    public Chart(Context context) {
        super(context);
    }

    public Chart(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    public Chart(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
    }

}
