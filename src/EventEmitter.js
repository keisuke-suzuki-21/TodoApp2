export class EventEmitter {
    // 登録する[イベント名、set(リスナー関数)]を管理するmap
    // Setは重複を防ぐ配列
    #listeners = new Map();
    // プライベートフィールドである#listenersにまだ登録されていないtypeイベントがあった場合リスナー関数を登録する関数
    addEventListener(type, listener){
        if(!this.#listeners.has(type)){
            this.#listeners.set(type, new Set());
        }
        const listenerSet = this.#listeners.get(type);
        listenerSet.add(listener);
    }
    // 指定したtypeイベントに登録されているリスナー関数を全て呼び出す
    emit(type){
        const listenerSet = this.#listeners.get(type)
        if(!listenerSet){
            return;
        }
        listenerSet.forEach(listener => {
            listener.call(this);
        });
    }
    // 指定したtypeイベントに対応するSetを取り出し、該当のリスナー関数を削除する
    removeEventListener(type, listener){
        const listenerSet = this.#listeners.get(type)
        if(!listenerSet){
            return;
        }
        listenerSet.forEach(oweListener => {
            if(oweListener === listener){
                listenerSet.delete(listener)
            }
        })
    }


}
