package com.practicedemo.BarSrc;

import android.content.Context;
import android.graphics.Color;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;

import com.practicedemo.R;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by liuchao on 2017/12/9.
 */

public class BarAdapter extends RecyclerView.Adapter<BarItemVIewHolder> {

    private List<String> mData;
    private Context context;
    private List<JsonSeries> seriesList;
    private float scale = -1;
    private JsonBarParams myBarParams;

    private List<String> ColorList;


    @Override
    public BarItemVIewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        BarItemVIewHolder holder = new BarItemVIewHolder(LayoutInflater.from(context).inflate(R.layout.bar_item_layout, parent, false));
        RecyclerView.LayoutParams itemHolderParam = (RecyclerView.LayoutParams) holder.allHolder.getLayoutParams();
//        itemHolderParam.width = (int) myBarParams.barCanvasHeight + dip2px(context, 50);
        itemHolderParam.height = (int) myBarParams.perLength;
        holder.allHolder.setLayoutParams(itemHolderParam);

        if (!myBarParams.stack) {
            holder.barHolder.setOrientation(LinearLayout.VERTICAL);
        }

        View.OnTouchListener barlistener = new View.OnTouchListener() {
            @Override
            public boolean onTouch(View v, MotionEvent event) {
                /**
                 * Projection 用于将屏幕坐标转换为地理位置坐标
                 */
                int x = (int) event.getX();
                int y = (int) event.getY();
                Log.e("clickojlkjoijjljoij",x+"___"+y);
                return false;
            }
        };

        holder.barHolder.setOnTouchListener(barlistener);
        return holder;
    }

    @Override
    public void onBindViewHolder(BarItemVIewHolder holder, int position) {
        holder.xAsixText.setText(mData.get(position));
        addLineView(holder.lineHolder);
        addBarView(holder.barHolder, position);
    }

    public BarAdapter(List<String> mData, Context context, List<JsonSeries> seriesList, JsonBarParams myBarParams) {
        this.mData = mData;
        this.context = context;
        this.seriesList = seriesList;
        scale = context.getResources().getDisplayMetrics().density;

        ColorList = new ArrayList<String>();

        ColorList.add("#45abff");
        ColorList.add("#6be6c1");
        ColorList.add("#ffa51f");
        ColorList.add("#ffd64e");
        ColorList.add("#3fd183");
        ColorList.add("#6ea7c7");
        ColorList.add("#5b7cf4");
        ColorList.add("#00bfd5");
        ColorList.add("#8bc7ff");
        ColorList.add("#f48784");
        ColorList.add("#d25537");

        this.myBarParams = myBarParams;

    }

    @Override
    public int getItemCount() {
        return mData.size();
    }


    /**
     * 添加度量线
     *
     * @param view
     */
    private void addLineView(LinearLayout view) {
        if (view.getChildCount() != (myBarParams.valueInterval + 1)) {
            LinearLayout.LayoutParams lineParams = new LinearLayout.LayoutParams(dip2px(context,1), (int) myBarParams.perLength);
            lineParams.setMargins((int) (myBarParams.perInterLength), 0, 0, 0);

            LinearLayout.LayoutParams initLineParams = new LinearLayout.LayoutParams(1, (int) myBarParams.perLength);
            initLineParams.setMargins(0, 0, 0, 0);

            for (int i = 0; i <= myBarParams.valueInterval; i++) {
                View lineItem = new View(context);
                if (i == 0) {
                    lineItem.setLayoutParams(initLineParams);
                } else {
                    lineItem.setLayoutParams(lineParams);
                }
                lineItem.setBackgroundColor(Color.parseColor("#EEEEEE"));
                view.addView(lineItem);
            }
            Log.e("jkiokjoijojoj", view.getChildCount() + "");
        }
    }


    /**
     * 添加bar的view
     *
     * @param view
     * @param index
     */
    private void addBarView(LinearLayout view, int index) {
        view.removeAllViews();
        for (int i = 0; i < seriesList.size(); i++) {
            JsonSeries item = seriesList.get(i);
            float dataItem = item.getDataItemByIndex(index);
            int svgLength = (int) (dataItem * myBarParams.perRectHeight);
            ViewGroup.LayoutParams barParams = new ViewGroup.LayoutParams(svgLength, (int) myBarParams.rectWidth);
            View barView = new View(context);
            barView.setBackgroundColor(Color.parseColor(ColorList.get(i % ColorList.size())));
            barView.setLayoutParams(barParams);
            view.addView(barView);
        }
    }


    /**
     * 根据手机的分辨率从 dp 的单位 转成为 px(像素)
     */
    public int dip2px(Context context, float dpValue) {
        if (scale == -1) {
            scale = context.getResources().getDisplayMetrics().density;
        }
        return (int) (dpValue * scale + 0.5f);

    }

    /**
     * 根据手机的分辨率从 px(像素) 的单位 转成为 dp
     */
    public int px2dip(Context context, float pxValue) {
        if (scale == -1) {
            scale = context.getResources().getDisplayMetrics().density;
        }
        return (int) (pxValue / scale + 0.5f);
    }
}
