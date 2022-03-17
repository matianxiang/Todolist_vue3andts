<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <Header :addTodo="addTodo" />
      <!-- props函数式 父子组件通信 -->
      <List :todos="todos" :deleteTodo="deleteTodo" :updateTodo="updateTodo" />
      <Footer
        :todos="todos"
        :checkAll="checkAll"
        :clearAllCompletedTodos="clearAllCompletedTodos"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, watch } from 'vue'
// 引入子组件
import Header from './components/Header.vue'
import List from './components/List.vue'
import Footer from './components/Footer.vue'

//引入接口
import { Todo } from './types/todo'
import { saveTodos, readTodos } from './utils/localStorageUtils'
export default defineComponent({
  name: 'App',
  // 注册组件
  components: {
    Header,
    List,
    Footer,
  },
  // 数据应该使用数组来存储，数组中每个数据都是一个对象，对象中应该有三个属性(id,title,isCompleted)
  // 把数组暂定义道到App.vue组件中，因为其他子组件都需要调用这个数据

  setup() {
    //定义一个数组数据
    // const state = reactive<{ todos: Todo[] }>({
    //   //todos是 Todo类型的数组
    //   todos: [
    //     { id: 1, title: '奔驰', isCompleted: false },
    //     { id: 2, title: '宝马', isCompleted: true },
    //     { id: 3, title: '帕拉梅拉', isCompleted: false },
    //   ],
    // })

    const state = reactive<{ todos: Todo[] }>({
      //todos是 Todo类型的数组
      todos: [],
    })
    //界面加载完毕后过了一会再读取数据
    onMounted(()=>{
      setTimeout(()=>{
        state.todos = readTodos()
      },100)
    })

    //添加数据方法
    const addTodo = (todo: Todo) => {
      state.todos.unshift(todo)
    }

    //删除数据方法
    const deleteTodo = (index: number) => {
      state.todos.splice(index, 1)
    }

    // 修改todo的isCompleted属性的状态

    //实现方法一
    // const updateTodo=(todo:Todo,isCompleted:boolean)=>{
    //   todo.isCompleted = isCompleted
    //   console.log(todo)
    // }

    //实现方法二
    const updateTodo = (id: number) => {
      console.log('我执行了')
      console.log(id)
      state.todos.forEach((todo) => {
        console.log(todo.id)
        if (todo.id === id) todo.isCompleted = !todo.isCompleted
      })
    }

    //全选方法
    const checkAll = (isCompleted: boolean) => {
      //遍历数组
      state.todos.forEach((todo) => {
        todo.isCompleted = isCompleted
      })
    }

    //清理所有完成数据
    const clearAllCompletedTodos = () => {
      state.todos = state.todos.filter((todo) => !todo.isCompleted) //保留未完成的
    }

    //监视操作: 如果todos数组的数据变化了，直接存储到localStorage
    // watch(
    //   () => state.todos,
    //   (value) => {
    //     //保存到浏览器中
    //     localStorage.setItem('todos_key', JSON.stringify(value))
    //   },
    //   { deep: true }
    // )

    watch(
      () => state.todos,
      (value) => {
        console.log(value)
        //保存到浏览器中
        saveTodos(value)
      },
      { deep: true }
    )

    return {
      ...toRefs(state), //解构state中的数据 并转为响应式数据  引用state中的todos不需要state.todos引用 直接todos
      addTodo,
      deleteTodo,
      updateTodo,
      checkAll,
      clearAllCompletedTodos,
    }
  },
})
</script>

<style scoped>
/* app */
.todo-container {
  width: 600px;
  margin: 0 auto;
}

.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>>