package com.practicedemo.studyMp.components;

import android.graphics.Color;
import android.graphics.Typeface;

import com.practicedemo.studyMp.utils.Utils;

/**
 * Created by liuchao on 2018/3/3.
 */

public abstract class ComponentBase {

    /**
     * 表示该轴/图例是否启用的标志
     */
    protected boolean mEnabled = true;

    /**
     * 此组件在x轴上的像素偏移量
     */
    protected float mXOffset = 5f;

    /**
     * 此组件在y轴上的像素偏移量
     */
    protected float mYOffset = 5f;

    /**
     * 标签的字体样式
     */
    protected Typeface mTypeface = null;


    /**
     * 标签的文本大小
     */
    protected float mTextSize = Utils.convertDpToPixel(10f);

    /**
     * 标签文本的字体颜色
     */
    protected int mTextColor = Color.BLACK;


    public ComponentBase() {
    }


    public float getXOffset() {
        return mXOffset;
    }

    public void setXOffset(float xOffset) {
        mXOffset = Utils.convertDpToPixel(xOffset);
    }


    public float getYOffset() {
        return mYOffset;
    }

    public void setYOffset(float yOffset) {
        mYOffset = Utils.convertDpToPixel(yOffset);
    }


    public Typeface getTypeface() {
        return mTypeface;
    }


    public void setTypeface(Typeface tf) {
        mTypeface = tf;
    }


    public void setTextSize(float size) {
        if (size > 24f)
            size = 24f;
        if (size < 6f)
            size = 6f;

        mTextSize = Utils.convertDpToPixel(size);
    }


    public float getTextSize() {
        return mTextSize;
    }

    public void setTextColor(int color) {
        mTextColor = color;
    }


    public int getTextColor() {
        return mTextColor;
    }


    public void settEnabled(boolean enabled) {
        mEnabled = enabled;
    }


    public boolean isEnabled() {
        return mEnabled;
    }

}
