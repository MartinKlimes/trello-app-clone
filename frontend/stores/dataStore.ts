import { defineStore } from "pinia";
import { Column, Task, ID } from "types";
import { nanoid } from "nanoid";

export const useDataStore = defineStore("dataStore", {
  state: () => ({
    data: [] as Column[],
    showOverlay: false,
  }),
  getters: {
    // doubleCount: (state) => state.count * 2,
  },
  actions: {
    async fetchData() {
      // const user = useStrapiUser()
      // const { find } = useStrapi(); 
      // const { data } = await find("users/me");
      const token = useStrapiToken()
      
      const cuser= await fetch(`https://trello-demo-7322d2287ed7.herokuapp.com/api/users/me?populate=deep,4`,{
      method:`GET`,
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    })
      cuser.json().then(res=>{ 
      
        this.data = res.posts
        // const posts = res.data.attributes.posts.data 
        // console.log(posts);
        // const newData = posts.map((post: any) => { 
        //   return {
        //     id: post.id,
        //     title: post.attributes.title,
        //     tasks: post.attributes.tasks.data.map((task: any) => { 
        //       return {
        //         title: task.attributes.title,
        //         createdAt: task.attributes.createdAt,
        //         id: task.id,
        //       }
        //     })
        //   }
        // })
      })
    },

    async deleteColumn(id: ID) {
      this.showOverlay = false
      this.clearColumn(id)
      this.data = this.data.filter((column) => column.id !== id);
      const { delete: _delete } = useStrapi()
      await _delete('posts', id)
    },
    async changeTitle(columnId: ID, title: string) {
      const column = this.findColumn(columnId);
      if (column) {
        column.title = title
        const { update } = useStrapi()
        await update('posts', column.id, { title: title})
      }
    },
    async addColumn() {
      const { create } = useStrapi()
      const user = useStrapiUser()
      await create('posts', { users_permissions_user: user.value?.id})
      this.fetchData()
      setTimeout(() => {
        (
          document.querySelector(
            ".columns:last-of-type .title-input"
          ) as HTMLInputElement
        ).focus()
      }, 100);
    },
    async addTask(columnId: ID, title: string) {
      const column = this.findColumn(columnId);
      if (column) {
        const task: Task = {
          id: nanoid(),
          title: title,
          createdAt: new Date(),
          labels: [],
        };
        column.tasks.push(task);
      } 
      const { create } = useStrapi()
      await create('tasks', { title: title, post: columnId})
      this.fetchData()
      },
    async deleteTask(columnId: ID, taskId: ID) {
      this.showOverlay = false
      const column = this.findColumn(columnId);
      if (column) {
        column.tasks = column.tasks.filter((task) => task.id !== taskId);
      }
      const { delete: _delete } = useStrapi()
      await _delete('tasks', taskId)
      // this.fetchData()
    
    },

    async changeTaskTitle(columnId: ID, taskId: ID, title: string | null) {
      const task = this.findTask(columnId, taskId)
      if (task) {
        task.title = title;
        const { update } = useStrapi()
        await update('tasks', taskId, { title: title})
      }
    },
    async addLabel(columnId: ID, taskId: ID, color: string) {
      const task = this.findTask(columnId, taskId)
      if (task) {
        const colorExists = task.labels.some((label) => label.name === color);
        if (!colorExists) {
          task.labels.push({ name: color });
          const { update } = useStrapi()
          const labelId = await this.getLabelId(color)
          await update('tasks',taskId,{labels: {connect: [{ id: labelId }]}})
          this.fetchData()
        } 
      }
    },
    async deleteLabel(columnId: ID, taskId: ID, color: string) { 
      const task = this.findTask(columnId, taskId)
      if (task) {
        task.labels = task.labels.filter((label) => label.name !== color);
        const { update } = useStrapi()
        const labelId = await this.getLabelId(color)
        await update('tasks',taskId,{labels: {disconnect: [{ id: labelId }]}})
      }
    },
    async clearColumn(columnId: ID) {
    const column = this.findColumn(columnId);
    const tasks = column?.tasks
    tasks.forEach((task) => { 
      this.deleteTask(columnId, task.id)
      })
    },
    // async duplicateColumn(columnId: ID) {
    //   const column = this.findColumn(columnId);
    //   const user = useStrapiUser()
    //   console.log(user.value.id)
    //   // const newColumn: Column = {
    //   //   id: columnId + 1,
    //   //   title: column.title,
    //   //   tasks: column.tasks,
    //   // };
    //   // this.data.push(newColumn);
    //   const { create } = useStrapi()
    //   await create('posts', { title: column.title, tasks: column.tasks, users_permissions_user: user.value.id})
    //   this.fetchData()
    // },
    async duplicateTask(columnId: ID, taskId: ID) {
      this.showOverlay = false
      const column = this.findColumn(columnId);
      const task = this.findTask(columnId, taskId);
      if (task ) {
        const { create } = useStrapi()
        await create('tasks', { title: task.title, post: columnId, labels: task.labels})
        this.fetchData()
      }
    },
    findTask(columnId: ID, taskId: ID) {
      const column = this.findColumn(columnId);
      if (column) {
        return column.tasks.find((task) => task.id === taskId);
    }
    },
    findColumn(columnId: ID) {  
      return this.data.find((column) => column.id === columnId);
    },
    async getLabelId(color: string) { 
      const { find } = useStrapi()
      const label = await find('labels', {name: color})
      return label.data.find((label) => label.attributes.name === color).id    
  },
  

}
})
