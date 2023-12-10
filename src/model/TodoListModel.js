import { EventEmitter } from "../EventEmitter.js";

export class TodoListModel extends EventEmitter {
    #items
    constructor(items = []){
        // 親クラスのコンストラクター関数を呼び出す
        // 今回EventEmitterにはコンストラクタの処理がないが子クラスでthisを使うにはsuper()の呼び出しが必須
        super();
        this.#items = items
    }
    // TodoItemの合計を返す
    getTotalCount(){
        return this.#items.length;
    }
    // 表示できるTodoItemを返す
    getTodoItems(){
        return this.#items;
    }
    // TodoListの状態が更新された時に呼び出されるリスナー関数を登録する関数
    onChange(listener){
        // listenerは関数
        this.addEventListener("change", listener);
    }
    // 状態が更新された時に呼ぶ。登録済みのリスナー関数を呼び出す
    emitChange(){
        this.emit("change");
    }
    // TodoItemを追加する
    addTodo(todoItem){
        this.#items.push(todoItem);
        this.emitChange();
    }
    // todoItemの更新処理をする関数
    updateTodo({id, completed}){
        const todoItem = this.#items.find(todo => todo.id === id)
        if(!todoItem){
            return;
        }
        todoItem.completed = completed;
        this.emitChange();
    }
    // 指定したtodoItemの削除をする関数
    deleteTodo({id}){
        this.#items = this.#items.filter(todo => {
            return todo.id !== id
        })
        this.emitChange();
    }
}