let id = 0;

export class TodoItemModel{
    // todoItemのID
    id;
    // todoItemのタイトル
    title;
    // todoItemの状態管理をするフラグ
    completed;

    constructor({title,completed}){
        this.id = id++;
        this.title = title;
        this.completed = completed;
    }
}