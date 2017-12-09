package com.practicedemo;

import android.app.Activity;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;


import java.util.ArrayList;
import java.util.List;

/**
 * Created by chaoye on 2017/12/8.
 */

public class TestHomeActivity extends Activity {

    private RecyclerView myRecyclerView;
    private List<String> mDatas;
    private HomeAdapter mAdapter;

    private Long maxNum, series, valueInterval, intervalNum, viewWidth, viewHeight, svgHeight, svgWidth, perLength,
            barCanvasHeight, perRectHeight, rectWidth, rectNum, interWidth,
            offsetLength;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.test_home_layout);
        initData();

        myRecyclerView = (RecyclerView) findViewById(R.id.test_recycleView);

        myRecyclerView.setLayoutManager(new LinearLayoutManager(this));
        myRecyclerView.setAdapter(mAdapter = new HomeAdapter());

    }


//          xAxis: {
//    type: 'category',
//    // type: 'value',
//    data: ['Mon', 'Tue', 'Wed', 'Thusssss', 'Fri', 'Sat', 'Sun', 'wqe', 'sdr', 'opu'],
//    axisTick: {
//        alignWithLabel: true
//    }
//},
//        yAxis: {
//        // type: 'category',
//        type: 'value',
//        data: ['Mon', 'Tue', 'Wed', 'Thusssss', 'Fri', 'Sat', 'Sun', 'wqe', 'sdr', 'opu'],
//        axisTick: {
//        alignWithLabel: true
//        }
//        },
//        series: [
//        {
//        name: '直接访问',
//        type: 'bar',
//        barWidth: '60%',
//        data: [10, 5, 2, 3, 10, 7, 6, 5, 2, 3,]
//        },
//        {
//        name: '非直接访问',
//        type: 'bar',
//        barWidth: '60%',
//        data: [3, 4, 1, 4, 2, 8, 3, 3, 10, 7]
//        }
//        ],
//        stack: true


    protected void initData()
    {
        mDatas = new ArrayList<String>();
        for (int i = 'A'; i < 'z'; i++)
        {
            mDatas.add("" + (char) i);
        }
    }


    class HomeAdapter extends RecyclerView.Adapter<HomeAdapter.MyViewHolder>
    {

        @Override
        public MyViewHolder onCreateViewHolder(ViewGroup parent, int viewType)
        {
            MyViewHolder holder = new MyViewHolder(LayoutInflater.from(
                    TestHomeActivity.this).inflate(R.layout.item_home, parent,
                    false));
            return holder;
        }

        @Override
        public void onBindViewHolder(MyViewHolder holder, int position)
        {
            holder.tv.setText(mDatas.get(position));
        }

        @Override
        public int getItemCount()
        {
            return mDatas.size();
        }

        class MyViewHolder extends RecyclerView.ViewHolder
        {

            TextView tv;

            public MyViewHolder(View view)
            {
                super(view);
                tv = (TextView) view.findViewById(R.id.id_num);
            }
        }
    }
}
