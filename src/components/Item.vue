<template>
  <li
    @mouseenter="mouseHandler(true)"
    @mouseleave="mouseHandler(false)"
    :style="{ backgroundColor: bgColor, color: myColor }"
  >
    <label for="">
      <input type="checkbox" v-model="isCompleted" />
      <span>{{ todo.title }}</span>
    </label>
    <button class="btn btn-danger" v-show="isShow" @click="delTodo">
      删除
    </button>
  </li>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { Todo } from '../types/todo'
export default defineComponent({
  name: 'Item',
  components: {},
  props: {
    todo: {
      type: Object as () => Todo, // 函数返回的是Todo类型 即限制todo是Todo类型的数据
      required: true,
    },
    deleteTodo: {
      type: Function,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    updateTodo: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    // 背景色
    const bgColor = ref('white')
    const myColor = ref('black')
    const isShow = ref(false)
    //鼠标进入和离开的事件回调函数
    const mouseHandler = (flag: Boolean) => {
      if (flag) {
        //  鼠标进入
        bgColor.value = 'pink'
        myColor.value = 'green'
        isShow.value = true
      } else {
        // 鼠标离开
        bgColor.value = 'white'
        myColor.value = 'black'
        isShow.value = false
      }
    }

    const delTodo = () => {
      //提示
      if (window.confirm('确定要删除吗')) {
        props.deleteTodo(props.index)
      }
    }

    //计算属性的方式---让当前的复选框选中/不选中
    const isCompleted = computed({
      get() {
        return props.todo.isCompleted
      },
      set(val) {
        console.log(val)
        //update实现方法一
        // props.updateTodo(props.todo,val)

        //实现方法二
        props.updateTodo(props.todo.id)

        //这样也行 但是不能这样用  因为这样不会引起父组件数据变化 用到该数据的其他子组件也不会刷新
        //props.todo.isCompleted = !props.todo.isCompleted
      },
    })
    return {
      mouseHandler,
      bgColor,
      myColor,
      isShow,
      delTodo,
      isCompleted,
    }
  },
})
</script>

<style scoped>
/* item */
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}
</style>
