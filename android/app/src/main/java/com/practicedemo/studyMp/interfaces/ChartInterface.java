package com.practicedemo.studyMp.interfaces;

/**
 * Created by chaoye on 2018/1/31.
 */

public interface ChartInterface {


    /**
     *
     * 获得x轴数据的最小值
     *
     * @return
     */
    float getXChartMin();

    /**
     *
     * 获得x轴数据的最大值
     *
     * @return
     */
    float getXChartMax();

    /**
     *
     * 获得x轴的数据范围
     *
     * @return
     */
    float getXRange();

    /**
     *
     * 获得y轴数据的最下值
     *
     * @return
     */
    float getYChartMin();


    /**
     *
     * 获得y轴数据的最大值
     *
     * @return
     */
    float getYChartMax();


    /**
     *
     * 获得点击的最大数值  TODO
     *
     * @return
     */
    float getMaxHighlightDistance();


    /**
     *
     * 获得宽度
     *
     * @return
     */
    int getWidth();


    /**
     *
     * 获得高度
     *
     * @return
     */
    int getHeight();


}
