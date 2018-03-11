package com.practicedemo.studyMp.components;

import android.graphics.Paint;

import com.practicedemo.studyMp.utils.MPPointF;
import com.practicedemo.studyMp.utils.Utils;

/**
 * Created by liuchao on 2018/3/11.
 */

public class Description extends ComponentBase {

    /**
     * 描述中使用的文字
     */
    private String text = "Description Label";

    /**
     * 描述文本的自定义位置
     */
    private MPPointF mPosition;

    /**
     * 说明文字的对齐位置
     */
    private Paint.Align mTextAlign = Paint.Align.RIGHT;


    public Description() {
        super();

        mTextSize = Utils.convertDpToPixel(8f);
    }

    /**
     * 设置要显示为说明的文本。
     * 切勿将此设置为null，因为这会在使用Android Canvas进行绘制时导致空指针异常。
     *
     * @param text
     */
    public void setText(String text) {
        this.text = text;
    }

    /**
     * 返回说明的文本
     *
     * @return
     */
    public String getText() {
        return this.text;
    }

    /**
     * 在屏幕上以像素为单位设置说明文字的自定义位置。
     *
     * @param x
     * @param y
     */
    public void setPosition(float x, float y) {
        if (mPosition == null) {
            mPosition = MPPointF.getInstance(x, y);
        } else {
            mPosition.x = x;
            mPosition.y = y;
        }
    }


    /**
     * 返回说明的自定义位置，如果没有设置，则返回null。
     *
     * @return
     */
    public MPPointF getPosition() {
        return mPosition;
    }

    /**
     * 设置说明文字的文字对齐。 默认右。
     *
     * @param align
     */
    public void setTextAlign(Paint.Align align) {
        this.mTextAlign = align;
    }

    /**
     * 返回说明文字的对齐方式
     *
     * @return
     */
    public Paint.Align getTextAlign() {
        return mTextAlign;
    }
}
