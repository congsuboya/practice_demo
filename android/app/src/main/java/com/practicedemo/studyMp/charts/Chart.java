package com.practicedemo.studyMp.charts;

import android.content.Context;
import android.graphics.Paint;
import android.util.AttributeSet;
import android.view.ViewGroup;

import com.practicedemo.studyMp.components.Description;
import com.practicedemo.studyMp.components.Legend;
import com.practicedemo.studyMp.components.XAxis;
import com.practicedemo.studyMp.data.ChartData;
import com.practicedemo.studyMp.data.Entry;
import com.practicedemo.studyMp.formatter.DefaultValueFormatter;
import com.practicedemo.studyMp.interfaces.ChartInterface;
import com.practicedemo.studyMp.interfaces.datasets.IDataSet;
import com.practicedemo.studyMp.listener.ChartTouchListener;
import com.practicedemo.studyMp.listener.OnChartGestureListener;
import com.practicedemo.studyMp.listener.OnChartValueSelectedListener;
import com.practicedemo.studyMp.renderer.LegendRenderer;

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
     * 对象，该对象包含最初为图表设置的所有数据，在修改或应用任何过滤算法之前
     */
    protected T mData = null;

    /**
     * 指示是否启用每次点击（触摸）突出显示的标记
     */
    protected boolean mHightLightPerTapEnabled = true;

    /**
     * 如果设置为true，则触摸后图表会继续滚动
     */
    private boolean mDragDecelerationEnabled = true;

    /**
     * 减速摩擦系数在[0; 1]间隔时，较高的值表示速度将缓慢下降，
     * 例如，如果设置为0，则会立即停止。 1是一个无效值，将自动转换为0.999f。
     */
    private float mDragDecelerationFrictionCoef = 0.9f;

    /**
     * 默认值格式化程序，数字的数量取决于提供的图表数据
     */
    protected DefaultValueFormatter mDefaultValueFormatter = new DefaultValueFormatter(0);

    /**
     * 用于在图表右下角绘制描述文本的绘画对象
     */
    protected Paint mDescPaint;

    /**
     * 当图表中没有值时绘制信息文本的绘图对象
     */
    protected Paint mInfoPaint;

    /**
     * 该对象表示x轴上的标签
     */
    protected XAxis mXAxis;

    /**
     * 如果为true，则在图表上启用触摸手势
     */
    protected boolean mTouchEnabled = true;

    /**
     * 负责表示描述文本的对象     
     */
    protected Description mDescription;

    /**
     * 图例对象 - 包含与图例相关的所有数据
     */
    protected Legend mLegend;

    /**
     * 选择图表上的值时调用的listener
     */
    protected OnChartValueSelectedListener mSelectionListener;

    protected ChartTouchListener mChartTouchListener;

    /**
     * 图表为空时显示的文字
     */
    private String mNoDataText = "No Chart data available";

    /**
     * 手势在图表上进行自定义回调时的手势监听器。
     */
    private OnChartGestureListener mGestureListen;

    protected LegendRenderer mLegendRendere;

    protected

    public Chart(Context context) {
        super(context);
    }

    public Chart(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    public Chart(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
    }

    public OnChartGestureListener getOnChartGestureListener() {
        return mGestureListen;
    }

}
