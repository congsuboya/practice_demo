package com.practicedemo.studyMp.charts;

import android.content.Context;
import android.util.AttributeSet;
import android.view.ViewGroup;

import com.practicedemo.studyMp.interfaces.ChartInterface;

/**
 * Created by chaoye on 2018/1/31.
 */

public abstract class Chart  extends ViewGroup implements ChartInterface {


    /**
     * log 的 key
     */
    public static final  String LOG_TAG = "STUDY_MP";


    /**
     * flag的开关
     */
    protected boolean mLogEnable = false;


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
