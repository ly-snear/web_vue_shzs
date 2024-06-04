const seat = {
    props: {
        //坐位数据 id_seat, id_student, id_group, seat, student, group, serial, row, col, ip, state, checkbox
        datum: {
            type: Object,
            require: true
        },
        width: {
            type: Number,
        },
        height: {
            type: Number,
        }
    },
    data() {
        return {};
    },
    setup() {
        console.log('准备完成初始化....');
    },
    methods: {},
    created: {},
    emits: [],
    watch: {},
    template: `
    `
}