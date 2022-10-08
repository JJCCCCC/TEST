let obj = {
     historyFood:[],
     quchong:function (a) {
        return [...Array.from(new Set(a))];
    },
    accounts:[],
}

export default obj