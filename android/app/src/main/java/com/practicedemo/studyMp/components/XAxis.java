package com.practicedemo.studyMp.components;

import com.practicedemo.studyMp.utils.Utils;

/**
 * 表示x轴标签设置的类。
 * 只能使用setter方法来修改它。
 * 不要直接访问公共变量。
 * 请注意，并非XLabels类提供的所有功能都适用于雷达图。
 * Created by liuchao on 2018/3/4.
 */

public class XAxis extends AxisBase {

    /**
     * x轴标签的宽度（以像素为单位） - 这由render中的computeSize（）方法自动计算
     */
    public int mLabelWidth = 1;

    /**
     * x轴标签的高度（以像素为单位） - 这由render中的computeSize（）方法自动计算
     */
    public int mLabelHeight = 1;

    /**
     * （旋转后的）x轴标签的宽度（以像素为单位）- 这由render中的computeSize（）方法自动计算
     */
    public int mLabelRotatedWidth = 1;

    /**
     * （旋转后的）x轴标签的高度（以像素为单位）- 这由render中的computeSize（）方法自动计算
     */
    public int mLabelRotatedHeight = 1;


    /**
     * 绘制X轴标签的角度（以度为单位）     
     */
    public float mLabelRotationAngle = 0f;

    /**
     * 如果设置为true，图表将避免图表中第一个和最后一个标签条目“剪辑”离开图表边缘   
     */
    private boolean mAvoidFirstLastClipping = false;


    /**
     * x标签相对于图表的位置    
     */
    private XAxisPosition mPosition = XAxisPosition.TOP;

    /**
     * 枚举x标签相对于图表的位置
     */
    public enum XAxisPosition {
        TOP, BOTTOM, BOTH_SIDED, TOP_INSIDE, BOTTOM_INSIDE
    }

    public XAxis() {
        super();
        mYOffset = Utils.convertDpToPixel(4.f); //-3;
    }

    public XAxisPosition getPosition() {
        return mPosition;
    }

    public void setPosition(XAxisPosition pos) {
        mPosition = pos;
    }

    public float getLabelRotationAngle() {
        return mLabelRotationAngle;
    }

    public void setLabelRotationAngle(float angle) {
        mLabelRotationAngle = angle;
    }

    public void setAvoidFirstLastClipping(boolean enabled) {
        mAvoidFirstLastClipping = enabled;
    }

    public boolean isAvoidFirstLastClippingEnabled() {
        return mAvoidFirstLastClipping;
    }

}
