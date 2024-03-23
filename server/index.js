

const io = require("socket.io")(8900, {
    cors:{
        origin:"http://localhost:3000"
    }
})    
 

io.on("connection", (socket) => {


    socket.on("disconnect", () => {
        console.log(socket.id);
    });

    socket.on("Connect", () => {
        console.log(socket.id);
    });
})  



class TrieNode {
    constructor() {
        this.children = new Map();
        this.isLeaf = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
        this.maxPrefix = "";
    }

    insert(str) {
        let node = this.root;
        for (let i = 0; i < str.length; i++) {
            const char = str[i];
            if (!node.children.has(char)) {
                node.children.set(char, new TrieNode());
            }
            node = node.children.get(char);
        }
        node.isLeaf = true;
    }

    search(str) {
        let node = this.root;
        for (let i = 0; i < str.length; i++) {
            if (!node.children.has(str[i])) {
                return false;
            }
            node = node.children.get(str[i]);
        }
        return node.isLeaf === true;
    }
}