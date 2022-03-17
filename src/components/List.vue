<!--
 * @Author: Moyo
 * @Date: 2022-03-16 21:47:30
 * @LastEditors: Moyo
 * @LastEditTime: 2022-03-17 15:52:15
 * @Description: 
-->
<template>
  <ul class="todo-main">
    <Item
      v-for="(todo, index) in todos"
      :key="todo.id"
      :todo="todo"
      :deleteTodo="deleteTodo"
      :updateTodo="updateTodo"
      :index="index"
    />
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// 引入子组件  注意这里路径问题
import Item from "../components/Item.vue";

export default defineComponent({
  name: "List",
  //注册组件
  components: {
    Item,
  },
  props: ["todos", "deleteTodo", "updateTodo"],
});
</script>

<style scoped>
/* main */
.todo-main {
  margin-left: 0px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 0px;
}

.todo-empty {
  height: 40px;
  line-height: 40px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding-left: 5px;
  margin-top: 10px;
}
</style>
