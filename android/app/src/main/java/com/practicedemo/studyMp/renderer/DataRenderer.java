package com.practicedemo.studyMp.renderer;

import android.graphics.Color;
import android.graphics.Paint;

import com.practicedemo.studyMp.animation.ChartAnimator;
import com.practicedemo.studyMp.interfaces.ChartInterface;
import com.practicedemo.studyMp.utils.Utils;
import com.practicedemo.studyMp.utils.ViewPortHandler;

/**
 * 用于不同数据类型（线，条，...）的所有渲染类的超类。
 * Created by liuchao on 2018/3/11.
 */

public abstract class DataRenderer extends Renderer {

    /**
     * 动画对象用于在图表数据上执行动画
     */
    protected ChartAnimator mAnimator;

    /**
     * 用于渲染的主要画图画笔
     */
    protected Paint mRenderPaint;

    /**
     * 用于突出显示值的画笔
     */
    protected Paint mHighlightPaint;

    protected Paint mDrawPaint;

    /**
     * 绘制对象绘制值（文本表示图表条目的值）
     */
    protected Paint mValuePaint;

    public DataRenderer(ChartAnimator animator,ViewPortHandler viewPortHandler){
        super(viewPortHandler);
        this.mAnimator = animator;

        mRenderPaint = new Paint(Paint.ANTI_ALIAS_FLAG);
        mRenderPaint.setStyle(Paint.Style.FILL);

        mDrawPaint = new Paint(Paint.DITHER_FLAG);

        mValuePaint = new Paint(Paint.ANTI_ALIAS_FLAG);
        mValuePaint.setColor(Color.rgb(63,63,63));
        mValuePaint.setTextAlign(Paint.Align.CENTER);
        mValuePaint.setTextSize(Utils.convertDpToPixel(9f));

        mHighlightPaint = new Paint(Paint.ANTI_ALIAS_FLAG);
        mHighlightPaint.setStyle(Paint.Style.STROKE);
        mHighlightPaint.setStrokeWidth(2f);
        mHighlightPaint.setColor(Color.rgb(255,187,115));

    }

    protected boolean isDrawingValuesAllower(ChartInterface chart){
        return chart.getData().getEntryCount()<chart.getMaxVisibleCount()*mViewPortHandler.getScaleX();

    }

    public DataRenderer(ViewPortHandler viewPortHandler) {
        super(viewPortHandler);
    }
}
