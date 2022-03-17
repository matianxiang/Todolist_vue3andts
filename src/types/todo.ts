/*
 * @Author: Moyo
 * @Date: 2022-03-17 09:16:09
 * @LastEditors: Moyo
 * @LastEditTime: 2022-03-17 09:19:33
 * @Description: 
 */
//定义一个接口，约束state的数据类型
export interface Todo {
    id: number;
    title: string;
    isCompleted: boolean;
  }