package com.practicedemo.BarSrc;

import android.content.Context;
import android.graphics.Color;
import android.support.annotation.Nullable;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.AttributeSet;
import android.widget.LinearLayout;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by liuchao on 2017/12/9.
 */

public class BarView extends LinearLayout {

    private RecyclerView listView;
    private List<String> mDatas;
    private BarAdapter barAdapter;
    private Context context;
    private List<JsonSeries> seriesList;
    private float scale = -1;
    private JsonBarParams myBarParams;


    public BarView(Context context) {
        super(context);
        this.context = context;
        scale = context.getResources().getDisplayMetrics().density;
        setLayoutParams(new LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT));
        setBackgroundColor(Color.parseColor("#ffffff"));

//        initBarData("");

    }

    public BarView(Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);
    }

    public BarView(Context context, @Nullable AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
    }


    public void initBarData(ReadableMap option) {

        ReadableArray seriesA = option.getArray("series");

        seriesList = new ArrayList<>();
        mDatas = new ArrayList<String>();

        for (int i = 0; i < seriesA.size(); i++) {
            JsonSeries item = new JsonSeries();
            item.setReactMap(seriesA.getMap(i));
            seriesList.add(item);
        }


        myBarParams = new JsonBarParams();
        myBarParams.barCanvasHeight = dip2px((float) option.getDouble("barCanvasHeight"));
        myBarParams.viewWidth = dip2px((float) option.getDouble("viewWidth"));
        myBarParams.rectNum = (float) option.getDouble("rectNum");
        myBarParams.rectWidth = dip2px((float) option.getDouble("rectWidth"));
        myBarParams.valueInterval = (float) option.getDouble("valueInterval");
        myBarParams.maxNum = (float) option.getDouble("maxNum");
        myBarParams.interWidth = dip2px((float) option.getDouble("interWidth"));
        myBarParams.intervalNum = option.getInt("intervalNum");
        myBarParams.stack = option.getBoolean("stack");
        myBarParams.perLength =dip2px((float) option.getDouble("perLength"));
        myBarParams.perRectHeight = dip2px((float) option.getDouble("perRectHeight"));
        myBarParams.perInterLength = dip2px((float) option.getDouble("perInterLength"));

        ReadableArray yAxisData = option.getMap("yAxis").getArray("data");
        for (int i = 0; i < yAxisData.size(); i++) {
            mDatas.add(yAxisData.getString(i));
        }

        initView(context);
    }


    private void initView(Context context) {
        listView = new RecyclerView(context);
        RecyclerView.LayoutParams listViewParams = new RecyclerView.LayoutParams(RecyclerView.LayoutParams.MATCH_PARENT, RecyclerView.LayoutParams.MATCH_PARENT);
        listView.setLayoutParams(listViewParams);
        listView.setLayoutManager(new LinearLayoutManager(context));


        barAdapter = new BarAdapter(mDatas, context, seriesList, myBarParams);
        listView.setAdapter(barAdapter);
        this.addView(listView);
    }


    /**
     * 根据手机的分辨率从 dp 的单位 转成为 px(像素)
     */
    public int dip2px(float dpValue) {
        if (scale == -1) {
            return (int) dpValue;
        }
        return (int) (dpValue * scale + 0.5f);

    }

    /**
     * 根据手机的分辨率从 px(像素) 的单位 转成为 dp
     */
    public int px2dip(float pxValue) {
        if (scale == -1) {
            return (int) pxValue;
        }
        return (int) (pxValue / scale + 0.5f);
    }
}
