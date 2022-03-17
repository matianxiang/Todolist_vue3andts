<template>
  <div class="todo-header">
    <input
      type="text"
      placeholder="请输入待完成任务，按回车键确认"
      @keyup.enter="add"
      v-model="title"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Header',
  components: {},
  props: {
    addTodo: {
      type: Function, //类型： 函数
      required: true, //必须要传
    },
  },

  setup(props) {
    //定义一个ref类型的数据
    const title = ref('') //字符串类型

    //回车的事件回调函数，来添加数据
    const add = () => {
      //获取文本框中输入的数据，判断不能为空
      const text = title.value
      if (!text.trim()) return //直接返回，不执行操作
      const todo = {
        id: Date.now(),
        title: text,
        isCompleted: false, //默认false
      }
      // 调用addTodo方法
      props.addTodo(todo)
      // 清空文本框
      title.value = ''
    }

    return {
      title,
      add,
    }
  },
})
</script>

<style scoped>
/* header */
.todo-header input {
  width: 560px;
  height: 28px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px 7px;
}

.todo-header input:focus {
  outline: none;
  border-color: rgba(82, 168, 236, 0.8);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(82, 168, 236, 0.8);
}
</style>
