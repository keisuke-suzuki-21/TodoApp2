import { element } from "./html-util.js";
import { TodoItemView } from "./TodoItemView.js";

export class TodoListView{
    createElement(todoItems, { onUpdateTodo, onDeleteTodo }){
        const todoListElement = element`<ul></ul>`;
        // 各TodoModel要素に対応したHTML要素を作成してリスト要素に追加する
        todoItems.forEach(todoItem => {
            const todoItemView = new TodoItemView();
            const todoItemElement = todoItemView.createElement(todoItem, {
                onDeleteTodo,
                onUpdateTodo
            });
            todoListElement.appendChild(todoItemElement)
        });
        return todoListElement;
    }
}