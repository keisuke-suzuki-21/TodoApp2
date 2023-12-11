import { element } from "./html-util.js";

export class TodoItemView{
    createElement(todoItem, { onUpdateTodo, onDeleteTodo }){
        const todoItemElement = todoItem.completed
        ? element`<li><input type="checkbox" class="checkbox" checked>
                    <s>${todoItem.title}</s>
                    <button class="delete">x</button>
                </li>`
        : element`<li><input type="checkbox" class="checkbox">
                    ${todoItem.title}
                    <button class="delete">x</button>
                </li>`;
        // チェックボックスをクリックした時に発生するchangeイベントとその時に発火して欲しいコールバック関数の登録
        const inputCheckboxElement = todoItemElement.querySelector(".checkbox");
        inputCheckboxElement.addEventListener("change", () => {
            // コールバック関数に変更
            onUpdateTodo({
                id: todoItem.id,
                completed: !todoItem.completed
            });
        });
        // 削除ボタンをクリックしたときに発生するclickイベントとその時に発火してほしいコールバック関数の登録
        const deleteButtonElement = todoItemElement.querySelector(".delete");
        deleteButtonElement.addEventListener("click", () => {
            // コールバック関数に変更
            onDeleteTodo({
                id: todoItem.id
            });
        });
        // 作成したTodoアイテムのHTML要素を返す
        return todoItemElement;
    }
}