class MyStack{

    constructor (){
        this.elems = [];
    }

    size(){
        return this.elems.length;
    }

    push(elem){
        this.elems.push(elem);
    }

    pop(elem){
        return this.elems.pop();
    }

    top(){
        return this.elems[this.elems.length-1];
    }

    
}