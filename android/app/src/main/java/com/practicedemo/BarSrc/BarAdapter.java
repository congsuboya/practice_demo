package com.practicedemo.BarSrc;

import android.content.Context;
import android.graphics.Color;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
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
        itemHolderParam.height = (int) myBarParams.perLength;
        holder.allHolder.setLayoutParams(itemHolderParam);

        if (!myBarParams.stack) {
            holder.barHolder.setOrientation(LinearLayout.VERTICAL);
        }

        return holder;
    }

    @Override
    public void onBindViewHolder(final BarItemVIewHolder holder, int position) {
        holder.xAsixText.setText(mData.get(position));
        addLineView(holder.lineHolder);
        if (myBarParams.stack) {
            addStackBarView(holder.barHolder, position);
        } else {
            addBarView(holder.barHolder, position);
        }
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
            LinearLayout.LayoutParams lineParams = new LinearLayout.LayoutParams(dip2px(context, 1), (int) myBarParams.perLength);
            lineParams.setMargins((int) (myBarParams.perInterLength - dip2px(context, 1)), 0, 0, 0);

            LinearLayout.LayoutParams initLineParams = new LinearLayout.LayoutParams(dip2px(context, 1), (int) myBarParams.perLength);
            initLineParams.setMargins(0, 0, 0, 0);

            for (int i = 0; i <= (myBarParams.negaNumInterval + myBarParams.plusNumInterval); i++) {
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
        float marginLef;
        for (int i = 0; i < seriesList.size(); i++) {
            marginLef = myBarParams.negaNumInterval * myBarParams.perInterLength;
            JsonSeries item = seriesList.get(i);
            float dataItem = item.getDataItemByIndex(index);
            int svgLength = (int) Math.abs(dataItem * myBarParams.barCanvasHeight / myBarParams.maxNum);
            if (svgLength < 2 && svgLength > 0) {
                svgLength = 2;
            }
            if (dataItem < 0) {
                marginLef = marginLef - svgLength;
            }

            LinearLayout.LayoutParams barParams = new LinearLayout.LayoutParams(svgLength, (int) myBarParams.rectWidth);

            View barView = new View(context);
            barParams.setMargins((int) marginLef, 0, 0, 0);
            barView.setBackgroundColor(Color.parseColor(ColorList.get(i % ColorList.size())));
            barView.setLayoutParams(barParams);
            view.addView(barView);
        }
    }

    /**
     * 添加bar的view
     *
     * @param view
     * @param index
     */
    private void addStackBarView(LinearLayout view, int index) {
        view.removeAllViews();
        float marginLef = myBarParams.negaNumInterval * myBarParams.perInterLength;
        for (int i = 0; i < seriesList.size(); i++) {
            JsonSeries item = seriesList.get(i);
            float dataItem = item.getDataItemByIndex(index);
            float svgLength = Math.abs(dataItem * myBarParams.barCanvasHeight / myBarParams.maxNum);
            if (svgLength > 0 && svgLength < 2) {
                svgLength = 2;
            }
            if (dataItem < 0) {
                marginLef = marginLef - svgLength;
            }
            LinearLayout.LayoutParams barParams = new LinearLayout.LayoutParams((int) svgLength, (int) myBarParams.rectWidth);
            View barView = new View(context);
            barView.setBackgroundColor(Color.parseColor(ColorList.get(i % ColorList.size())));
            barView.setLayoutParams(barParams);
            if (dataItem < 0) {
                view.addView(barView, 0);
            } else {
                view.addView(barView);
            }
        }
        if (marginLef > 0) {
            LinearLayout.LayoutParams marginBarParams = new LinearLayout.LayoutParams((int) marginLef, (int) myBarParams.rectWidth);
            View marginLbarView = new View(context);
            marginLbarView.setLayoutParams(marginBarParams);
            view.addView(marginLbarView, 0);
        }
    }


    public interface OnItemClickLitener {
        void onItemClick(View view, int position);
    }

    private OnItemClickLitener mOnItemClickLitener;

    public void setOnItemClickLitener(OnItemClickLitener mOnItemClickLitener) {
        this.mOnItemClickLitener = mOnItemClickLitener;
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
