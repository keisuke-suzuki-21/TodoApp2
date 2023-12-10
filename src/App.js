import { TodoListModel } from "./model/TodoListModel.js";
import { TodoItemModel } from "./model/TodoItemModel.js";
import { element, render } from "./view/html-util.js";

export class App{
    // 1. todoListModelの初期化
    #todoListModel = new TodoListModel();

    mount(){
        const formElement = document.querySelector("#js-form");
        const inputElement = document.querySelector("#js-form-input");
        const containerElement = document.querySelector("#js-todo-list");
        const todoItemCountElement = document.querySelector("#js-todo-count");
        // 2. TodoListModelの状態が変更された表示を更新する
        this.#todoListModel.onChange(() => {
            const todoListElement = element`<ul></ul>`;
            const todoItems = this.#todoListModel.getTodoItems();
            todoItems.forEach((item) => {
                const todoItemElement = item.completed ? 
                    element`<li><input type="checkbox" class="checkbox" checked><s>${item.title}</s><button class="delete">x</button></li>`:
                    element`<li><input type="checkbox" class="checkbox">${item.title}<button class="delete">x</button></li>`;
                // チェックボックスがトグルした時のイベントにリスナー関数を登録する
                const inputCheckboxElement = todoItemElement.querySelector(".checkbox");
                inputCheckboxElement.addEventListener("change", () => {
                    // 指定したTodoアイテムの完了状態を反転させる
                    this.#todoListModel.updateTodo({
                        id: item.id,
                        completed: !item.completed
                    });
                });
                // 削除ボタンがクリックされたときのイベントにリスナー関数を登録する
                const deleteButtonElement = todoItemElement.querySelector(".delete")
                deleteButtonElement.addEventListener("click", () => {
                    this.#todoListModel.deleteTodo({
                        id: item.id
                    });
                });
                todoListElement.appendChild(todoItemElement);
            });
            render(todoListElement, containerElement);
            todoItemCountElement.textContent = `Todoアイテム数: ${this.#todoListModel.getTotalCount()}`;
        })
        // 3. フォームを送信したら新しいTodoItemModelを追加する
        formElement.addEventListener("submit", (event) => {
            event.preventDefault();
            this.#todoListModel.addTodo(new TodoItemModel({
                title: inputElement.value,
                completed: false
            }));
            inputElement.value = "";
        });
    }
}