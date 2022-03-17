/*
 * @Author: Moyo
 * @Date: 2022-03-17 15:18:28
 * @LastEditors: Moyo
 * @LastEditTime: 2022-03-17 15:36:35
 * @Description: 
 */
import {Todo} from '../types/todo'
//保存数据到浏览器缓存中
export function saveTodos(todos: Todo[]){
      localStorage.setItem('todos_key',JSON.stringify(todos))
}
//从浏览器的缓存中读取数据
export function readTodos():Todo[]{
    return JSON.parse(localStorage.getItem('todos_key')||'[]')  //没有则读取空数组 防止报错
}

