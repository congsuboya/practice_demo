package com.practicedemo.studyMp.utils;

import java.util.List;

/**
 * 用于回收扩展Poolable的对象实例的对象池。
 * <p>
 * 成本效益 ：
 *   *成本 - 池中只能包含扩展Poolable的对象。
 *   *好处 - 池可以非常快速地确定一个对象是否可以在没有迭代的情况下进行存储。
 *   *好处 - 池还可以知道Poolable的实例是否已经存储在不同的池实例中。
 *   *好处 - 池可以根据需要增长，如果它是空的
 *   *成本 - 但是，当池空时重新填充池可能会产生足够大的时间成本。 如果这是一个问题，请将补充百分比设置为较低的数字。
 * <p>
 * <p>
 * Created by liuchao on 2018/3/11.
 */

public class ObjectPool<T extends ObjectPool.Poolable> {


    private static int ids = 0;

    private int poolId;
    private int desiredCapacity; //对象池容量
    private Object[] objects;
    private int objectsPointer;//对象指针
    private T modelObject;
    private float replenishPercentage;//补充百分比

    /**
     * 返回给定池实例的ID。
     *
     * @return 一个属于这个池实例的整数ID。
     */
    public int getPoolId() {
        return poolId;
    }

    /**
     * 返回给定启动容量的ObjectPool实例，该实例可以循环给定Poolable对象的实例。
     *
     * @param withCapacity 一个正整数值。
     * @param object       池应该回收的对象的实例。
     * @return
     */
    public static synchronized ObjectPool create(int withCapacity, Poolable object) {
        ObjectPool result = new ObjectPool(withCapacity, object);
        result.poolId = ids;
        ids++;
        return result;
    }

    private ObjectPool(int withCapacity, T object) {
        if (withCapacity <= 0) {
            throw new IllegalArgumentException("对象池必须以大于0的容量实例化！");
        }
        this.desiredCapacity = withCapacity;
        this.objects = new Object[this.desiredCapacity];
        this.objectsPointer = 0;
        this.modelObject = object;
        this.replenishPercentage = 1.0f;
        this.refillPool();
    }


    /**
     * 设置要补空的池的百分比。 有效值在0.00f到1.00f之间
     *
     * @param percentage 代表要补充的池的百分比。
     */
    public void setReplenishPercentage(float percentage) {
        float p = percentage;
        if (p > 1) {
            p = 1;
        } else if (p < 0f) {
            p = 0f;
        }
        this.replenishPercentage = p;
    }

    public float getReplenishPercentage() {
        return replenishPercentage;
    }


    private void refillPool() {
        this.refillPool(this.replenishPercentage);
    }

    /**
     * @param percentage
     */
    private void refillPool(float percentage) {
        int portionOfCapacity = (int) (desiredCapacity * percentage);//容量百分比

        if (portionOfCapacity < 1) {
            portionOfCapacity = 1;
        } else if (portionOfCapacity > desiredCapacity) {
            portionOfCapacity = desiredCapacity;
        }

        for (int i = 0; i < portionOfCapacity; i++) {
            this.objects[i] = modelObject.instantiate();
        }
        objectsPointer = portionOfCapacity - 1;
    }

    /**
     * 返回Poolable的一个实例。
     * 如果使用空池调用get（），则池将被补充。
     * 如果池容量足够大，则可能会导致性能成本。
     *
     * @return
     */
    public synchronized T get() {
        if (this.objectsPointer == -1 && this.replenishPercentage > 0.0f) {
            this.refillPool();
        }

        T result = (T) objects[this.objectsPointer];
        result.currentOwnerId = Poolable.NO_OWNER;
        this.objectsPointer--;
        return result;
    }

    /**
     * 回收该池可以生成的Poolable实例。
     * 传递的T实例不应该已经存在于这个或任何其他ObjectPool实例中。
     *
     * @param object T类型的回收对象
     */
    public synchronized void recycle(T object) {
        if (object.currentOwnerId != Poolable.NO_OWNER) {
            if (object.currentOwnerId == this.poolId) {
                throw new IllegalArgumentException("传递的对象已经存储在这个池中！");
            } else {
                throw new IllegalArgumentException("要回收的对象已属于poolId" + object.currentOwnerId + ". 对象不能同时属于两个不同的池实例！");
            }
        }

        this.objectsPointer++;
        if (this.objectsPointer >= objects.length) {
            this.resizePool();
        }

        object.currentOwnerId = this.poolId;
        objects[this.objectsPointer] = object;

    }

    /**
     * 回收此池可以生成的Poolables列表。
     * 传递的T实例不应该已经存在于这个或任何其他ObjectPool实例中。
     *
     * @param objects
     */
    public synchronized void recycle(List<T> objects) {
        while (objects.size() + this.objectsPointer + 1 > this.desiredCapacity) {
            this.resizePool();
        }

        final int objectsListSize = objects.size();

        for (int i = 0; i < objectsListSize; i++) {
            T object = objects.get(i);
            if (object.currentOwnerId != Poolable.NO_OWNER) {
                if (object.currentOwnerId == this.poolId) {
                    throw new IllegalArgumentException("传递的对象已经存储在这个池中！");
                } else {
                    throw new IllegalArgumentException("要回收的对象已属于poolId" + object.currentOwnerId + ". 对象不能同时属于两个不同的池实例！");
                }
            }

            object.currentOwnerId = this.poolId;
            this.objects[this.objectsPointer + 1 + i] = object;
        }
        this.objectsPointer += objectsListSize;
    }

    private void resizePool() {
        final int oldCapacity = this.desiredCapacity;
        this.desiredCapacity *= 2;
        Object[] temp = new Object[this.desiredCapacity];
        for (int i = 0; i < oldCapacity; i++) {
            temp[i] = this.objects[i];
        }
        this.objects = temp;
    }


    /**
     * 返回此对象池的容量。
     * 注意：如果用户尝试添加比池容量允许的更多对象，则池将自动调整大小以包含其他对象，但这会导致性能成本。
     *
     * @return
     */
    public int getPoolCapacity() {
        return this.objects.length;
    }

    /**
     * 为了诊断目的，返回池中剩余的对象数。
     *
     * @return
     */
    public int getPoolCount() {
        return this.objectsPointer + 1;
    }


    public static abstract class Poolable {
        public static int NO_OWNER = -1;
        int currentOwnerId = NO_OWNER;

        protected abstract Poolable instantiate();
    }
}
