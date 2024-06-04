const app = {
    data() {
        return {
            //当前登录用户
            user: {},
            //头部组件高度
            head_height: 0,
            //列表间距
            list_top: 5,
            //界面标题
            title: '班级学生教室',
            //获取教师信息
            techer: {},
            //班级列表标题
            titles: [],
            //班级后面的操作菜单
            menus: [],
            //教室列表
            rooms: [],
            //班级列表
            classs: [],
            //进入分配界面后--选择班级学生列表
            students: [],
            //进入分配界面后--选择教室坐位列表
            seats: [],
            //进入分配界面后--选择班级学生在选择教室中座位分配数据
            seat_stu: [],
            //班级教室列表
            class_room: [],
            //#region 教室座位编辑器
            //#region 学生编辑器布局
            seat_layout: {
                //#region 标签
                _tag: {
                    margin_left: 10,
                    margin_top: 5,
                    width: 30,
                    height: 30,
                    radius: 15,
                    disabled: '#ff0000',
                    enable: '#006000',
                    line_height: 0,
                },
                //#endregion
                //#region 复选框
                _checkbox: {
                    margin_horizontal: 10,
                    margin_top: 6,
                    width: 18,
                    height: 18,
                },
                //#endregion
                //#region 学生学号
                _sno: {
                    margin_left: 0,
                    margin_right: 0,
                    margin_top: 0,
                    width: 0,
                    height: 0,
                },
                //#endregion
                //#region 学生姓名
                _name: {
                    margin_left: 3,
                    margin_right: 20,
                    margin_top: 15,
                    margin_bottom: 0,
                    width: 70,
                    height: 48,
                },
                //#endregion
                //#region 椅子
                _chair: {
                    margin_top: 5,
                    margin_horizontal: 10,
                    width: 40,
                    height: 40,
                    radius: 20,
                },
                //#endregion
                //#region 坐位
                _seat: {
                    width: 0,
                    height: 0,
                },
                //#endregion
                //#region 坐位分割
                _split: {
                    width: 1,
                    height: 0,
                    margin_top: 5,
                },
                //#endregion
                //#region 课桌
                _desk: {
                    width: 0,
                    height: 0,
                    clean_width: 0,
                    clean_height: 0,
                    padding_left: 5,
                    padding_top: 5,
                    padding_right: 5,
                    padding_bottom: 5,
                },
                //#endregion
                //#region 容器
                _container: {
                    width: 0,
                    height: 0,
                    margin_left: 0,
                },
                //#endregion
                //#region 容器盒子
                _box: {
                    width: 0,
                    height: 0,
                    margin_top: 5,
                    margin_bottom: 5,
                    margin_left: 5,
                    margin_right: 5,
                },
                //#endregion
                //#region 多余学生
                _excess: {
                    width: 0,
                    height: 0,
                    left: 0,
                    top: 0
                },
                //#endregion
                //#region 多余学生
                _excess_box: {
                    title_height: 28,
                    width: 0,
                    height: 0,
                    left: 0,
                    top: 0
                },
                //#endregion
                //小数修正值
                revision: 1,
                //课桌边框
                _border: 1,
                //每张课桌座位数量
                _desk_seat_qty: 2,
                //每排课桌数量
                _row_desk_qty: 0,
            },
            //#endregion
            //学生坐位编辑器
            seat_editor: {
                //是否先打开编辑器
                open: false,
                //学生坐位分配
                title: '',
                //班级对象
                obj_class: {},
                //教室对象
                obj_room: {},
                //教室座位列表
                room_seat: [],
                //班级学生列表
                class_student: [],
                //学生坐位
                student_seats: [],
                //学生分组
                student_groups: [],
                //分组背景颜色组
                group_color: [
                    '#ff0000',
                    '#0000ff',
                    '#ff00ff',
                    '#d2691e'
                ],
                //坐位行数
                room_rows: 0,
                //课桌座位数量
                desk_seats: 0,
                //全选
                select_seat_title: '全选',
                //全选图标
                select_seat_icon: 'icon-duoxuankuang1',
                //框选标志
                box_select: false,
                //框选组件
                box_select_rect: null,
                //框选组件ID
                box_select_rect_id: 'box_select_rect_id',
                //起点新坐标X
                box_select_rect_x: 0,
                //起点新坐标Y
                box_select_rect_y: 0,
                //坐位拖动标志
                drag_seat: false,
                //拖动源DOM
                drag_source: null,
                //小组名称
                group_title: '',
                //禁止关闭
                popover_close: false,
                //没有分配到座位的学生
                excess_student: [],
            },
            //学生坐位拖动菜单
            seat_drop_menu: {
                //源坐位索引
                source: -1,
                //目标坐位索引
                target: -1,
                //菜单元素
                menu: null,
                //菜单ID
                id_menu: 'id_seat_drop_menu',
            },
            //#endregion
        }
    },
    methods: {
        /**
         * 返回原平台
         * */
        return_system() {
            //let url=`${location.protocol}//${location.host}:${location.port}`;
            let url = `${location.protocol}//${location.host}`;
            //console.log(url);
            window.location.href = url;
        },

        /***
         * 执行班级教室方法
         * @param evt
         */
        execClassRoomMethod(evt) {
            let id_class = parseInt(evt.currentTarget.dataset.class);
            let id_room = parseInt(evt.currentTarget.dataset.room);
            let id_menu = parseInt(evt.currentTarget.dataset.menu);
            let menu = this.menus.find(m => m.id == id_menu);
            let method_name = menu.method;
            method_name = `this.${method_name}(${id_class}, ${id_room})`;
            eval(method_name);
        },

        /**
         * 班级学生分配教室坐位
         * @param id_class
         * @param id_room
         */
        studentToSeat(id_class, id_room) {
            //#region 读取班级 读取教师
            this.seat_editor.obj_class = this.classs.find(c => c.id == id_class);
            this.seat_editor.obj_room = this.rooms.find(r => r.id == id_room);
            //#endregion
            //#region 分配标题
            this.seat_editor.title = `${this.seat_editor.obj_class.name}(学生)--${this.seat_editor.obj_room.name}(坐位)`;
            //#endregion
            //#region 计算坐位行数
            this.seat_editor.room_rows = Math.floor(this.seat_editor.obj_room.seats / this.seat_editor.obj_room.cols);
            if (0 != (this.seat_editor.obj_room.seats % this.seat_editor.obj_room.cols)) {
                this.seat_editor.room_rows = this.seat_editor.room_rows + 1;
            }
            //console.log(this.seat_editor.room_rows);
            //#endregion
            //#region 计算布局
            //标签 + 复选框 宽度
            let line1_width = this.seat_layout._tag.margin_left * 2 + this.seat_layout._tag.width + this.seat_layout._checkbox.margin_horizontal * 2 + this.seat_layout._checkbox.width;
            //学号 宽度
            let line2_width = this.seat_layout._sno.margin_left + this.seat_layout._sno.width + this.seat_layout._sno.margin_right;
            //姓名 宽度
            let line3_width = this.seat_layout._name.margin_left + this.seat_layout._name.width + this.seat_layout._name.margin_right;
            //椅子 宽度
            let line4_width = this.seat_layout._chair.margin_horizontal * 2 + this.seat_layout._chair.width;
            //计算标签行高度
            this.seat_layout._tag.line_height = Math.max(this.seat_layout._tag.height, this.seat_layout._checkbox.height);
            //计算坐位宽度 * 坐位宽度在此计算 *
            this.seat_layout._seat.width = Math.max(line1_width, line2_width, line3_width, line4_width);
            //计算坐位高度
            //标签高度
            let _tag_height = this.seat_layout._tag.margin_top + this.seat_layout._tag.height;
            //复选框高度
            let _checkbox_height = this.seat_layout._checkbox.margin_top + this.seat_layout._checkbox.height;
            //计算坐位高度 * 坐位坐位在此计算.不包含椅子 *
            this.seat_layout._seat.height = Math.max(_tag_height, _checkbox_height) + this.seat_layout._sno.margin_top + this.seat_layout._sno.height + this.seat_layout._name.margin_top + this.seat_layout._name.height + this.seat_layout._name.margin_bottom;
            //坐位高度 * 坐位坐位在此计算.坐位全高 *
            this.seat_layout._seat.height = this.seat_layout._seat.height + this.seat_layout._chair.margin_top + this.seat_layout._chair.height + this.seat_layout._chair.margin_top;
            //计算分割线高度
            this.seat_layout._split.height = this.seat_layout._seat.height - this.seat_layout._split.margin_top * 2;
            //计算课桌宽度 * 计算出课桌宽度(每张桌子) *
            this.seat_layout._desk.clean_width = this.seat_layout._seat.width * 2 + this.seat_layout._split.width;
            this.seat_layout._desk.width = this.seat_layout._desk.padding_left + this.seat_layout._desk.clean_width + this.seat_layout._desk.padding_right;
            //计算课桌高度 * 计算出课桌高度 *
            this.seat_layout._desk.clean_height = this.seat_layout._seat.height;
            this.seat_layout._desk.height = this.seat_layout._desk.padding_top + this.seat_layout._desk.clean_height + this.seat_layout._desk.padding_bottom;
            //计算课桌多余学生容器
            this.seat_layout._excess.left = this.seat_layout._tag.margin_left * 2 + this.seat_layout._tag.width;
            this.seat_layout._excess.width = this.seat_layout._desk.width - this.seat_layout._excess.left * 2;
            this.seat_layout._excess.top = this.seat_layout._tag.margin_top;
            this.seat_layout._excess.height = this.seat_layout._tag.margin_top + this.seat_layout._tag.height + this.seat_layout._name.margin_top;
            //计算每行课桌数量
            this.seat_layout._row_desk_qty = Math.floor(this.seat_editor.obj_room.cols / this.seat_layout._desk_seat_qty);
            if (0 != this.seat_editor.obj_room.cols % this.seat_layout._desk_seat_qty) {
                this.seat_layout._row_desk_qty = this.seat_layout._row_desk_qty + 1;
            }
            //计算容器宽度
            this.seat_layout._container.width = (this.seat_layout._desk.width + this.seat_layout._border * 3) * this.seat_layout._row_desk_qty;
            //计算容器高度
            //#endregion
            //#region 已经保存的座位学生信息 教室课桌座位信息
            let student_seat = classRoomStudents(id_class, id_room);
            student_seat.then(ss => {
                this.seat_editor.student_seats = ss;
                //#region 读取教室课桌座位信息
                let seats = roomSeats(id_room);
                seats.then(st => {
                    if (!(st && st.length > 0)) {
                        this.$message({type: 'error', message: `教室：${this.seat_editor.obj_room.name}-->坐位没有初始化`});
                        return;
                    }
                    this.seat_editor.room_seat = st;
                    //#region 班级学生
                    let class_student = classStudents(id_class);
                    class_student.then(cs => {
                        this.seat_editor.class_student = cs;
                        this.init_room_desk_seat(st);
                    }).catch(ex => {
                        console.log('读取班级学生异常--', ex);
                        this.$message({type: 'error', message: `读取班级学生异常--${JSON.stringify(ex)}`});
                    }).finally();
                    //#endregion
                }).catch(ex => {
                    console.log('读取教室课桌座位异常--', ex);
                    this.$message({type: 'error', message: `读取教室课桌座位异常--${JSON.stringify(ex)}`});
                }).finally();
                //#endregion

                this.seat_editor.open = true;
            }).catch(ex => {
                console.log('读取已经保存的分配数据异常--', ex);
                this.$message({type: 'error', message: `读取已经保存的分配数据异常--${JSON.stringify(ex)}`});
            }).finally();
            //#endregion
        },

        //#region 分配操作弹出框

        /**
         * 坐位分配关闭前
         */
        close_seat_before() {
            console.log('准备关闭');
        },

        /**
         * 学生坐位分配框已经打开
         */
        student_seat_opened() {
            let editor_box = document.querySelector('#seat_editor_box');
            let editor_box_height = editor_box.offsetHeight;
            let editor_head = document.querySelector('.el-dialog__header');
            let editor_head_height = editor_head.offsetHeight;
            let editor_podium = document.querySelector('#seat_editor_podium');
            let editor_podium_height = editor_podium.offsetHeight;
            this.seat_layout._box.height = editor_box_height - editor_head_height - editor_podium_height - this.seat_layout._box.margin_top - this.seat_layout._box.margin_bottom;
            let editor_box_width = editor_box.offsetWidth;
            this.seat_layout._box.width = editor_box_width - this.seat_layout._box.margin_left - this.seat_layout._box.margin_right;
            //seat_layout._box.width seat_layout._desk.width
            if (this.seat_layout._box.width > this.seat_layout._container.width) {
                this.seat_layout._container.margin_left = Math.floor((this.seat_layout._box.width - this.seat_layout._container.width) / 2) + this.seat_layout.revision;
            }
            //console.log(this.seat_layout._box.width, '---',this.seat_layout._box.height);
            //剩余学生列表框
            let podium_title = document.querySelector('#seat_editor_podium_title');
            let body = document.querySelector('#app');
            this.seat_layout._excess_box.left = podium_title.offsetLeft + podium_title.offsetWidth + 5;
            this.seat_layout._excess_box.top = podium_title.offsetTop + editor_head.offsetTop + editor_head.offsetHeight;
            this.seat_layout._excess_box.width = body.offsetWidth - this.seat_layout._excess_box.left - 5;

        },

        /**
         * 打开学生坐位分配框
         */
        student_seat_open() {

        },

        /**
         * 初始化教室课桌
         * @param desks
         */
        init_room_desk_seat(desks) {
            //#region 课桌--坐位--学生信息
            for (let i = 0; i < desks.length; i++) {
                if (desks[i].seats && desks[i].seats.length > 0) {
                    for (let j = 0; j < desks[i].seats.length; j++) {
                        //是否显示复选框
                        desks[i].seats[j].showcheckbox = false;
                        //坐位是否选中
                        desks[i].seats[j].checkbox = false;
                        //坐位学生列表
                        desks[i].seats[j].students = [];
                        //序号
                        desks[i].seats[j].order = (i * desks[i].seats.length + j);
                        //坐位操作菜单是否打开
                        desks[i].seats[j].open = false;
                        //如果为吊顶摄像头 则IP地址设置为网络IP地址/预置位
                        if (1 == this.seat_editor.obj_room.id_camera) {
                            desks[i].seats[j].ip = desks[i].seats[j].name_camera + '/' + desks[i].seats[j].preset;
                        }
                    }
                }
                desks[i].excess = [];
            }
            //#endregion

            //#region 修正布局
            if (!desks || 0 == desks.length || !desks[0].seats || 0 == desks[0].seats.length) {
                this.$message({type: 'error', message: '教室课桌座位数据无效'});
                return;
            }
            this.seat_editor.desk_seats = desks[0].seats.length;
            this.seat_layout._container.height = (this.seat_layout._desk.height + this.seat_layout._border * 2) * Math.floor(this.seat_editor.room_rows / this.seat_editor.desk_seats);
            //#endregion

            //#region 读取以前保存的学生信息
            let seat_id = -1;
            let desk_seat = {};
            if (this.seat_editor.student_seats && this.seat_editor.student_seats.length > 0) {
                for (let i = 0; i < this.seat_editor.student_seats.length; i++) {
                    if (this.seat_editor.student_seats[i].seats && this.seat_editor.student_seats[i].seats.length > 0) {
                        for (let j = 0; j < this.seat_editor.student_seats[i].seats.length; j++) {
                            seat_id = this.seat_editor.student_seats[i].seats[j].id_seat;
                            desk_seat = this.desk_index_seat_index_from_id(seat_id);
                            if (-1 != desk_seat.desk && -1 != desk_seat.seat) {
                                this.seat_editor.room_seat[desk_seat.desk].seats[desk_seat.seat].id_group = this.seat_editor.student_seats[i].id_group;
                                this.seat_editor.room_seat[desk_seat.desk].seats[desk_seat.seat].name_group = this.seat_editor.student_seats[i].name_group;
                                this.seat_editor.room_seat[desk_seat.desk].seats[desk_seat.seat].border_color = this.seat_editor.group_color[(this.seat_editor.room_seat[desk_seat.desk].seats[desk_seat.seat].id_group - 1) % this.seat_editor.group_color.length];
                                if (this.seat_editor.student_seats[i].seats[j].students && this.seat_editor.student_seats[i].seats[j].students.length > 0) {
                                    this.seat_editor.room_seat[desk_seat.desk].seats[desk_seat.seat].students = this.seat_editor.student_seats[i].seats[j].students;
                                }
                            }
                        }
                    }
                }
            }
            //console.log(this.seat_editor.room_seat);
            //#endregion

            //#region 坐位上显示的学生学号、学生名称、课桌上多余的学生列表
            if (this.seat_editor.room_seat && this.seat_editor.room_seat.length > 0) {
                for (let i = 0; i < this.seat_editor.room_seat.length; i++) {
                    //课桌座位上多余的学生
                    let excess = [];
                    if (this.seat_editor.room_seat[i].seats && this.seat_editor.room_seat[i].seats.length > 0) {
                        this.seat_editor.room_seat[i].border_color = this.seat_editor.room_seat[i].seats[0].border_color;
                        for (let j = 0; j < this.seat_editor.room_seat[i].seats.length; j++) {
                            this.seat_editor.room_seat[i].seats[j].title = this.seat_editor.room_seat[i].seats[j].ip;
                            this.seat_editor.room_seat[i].seats[j].caption = '';
                            if (this.seat_editor.room_seat[i].seats[j].students && this.seat_editor.room_seat[i].seats[j].students.length > 0) {
                                this.seat_editor.room_seat[i].seats[j].title = this.seat_editor.room_seat[i].seats[j].students[0].sno;
                                this.seat_editor.room_seat[i].seats[j].caption = this.seat_editor.room_seat[i].seats[j].students[0].name;
                                /*
                                let exce = {
                                    seat: this.seat_editor.room_seat[i].seats[j].id,
                                    student: this.seat_editor.room_seat[i].seats[j].students[0],
                                }
                                excess.push(exce);
                                */
                            }
                            if (this.seat_editor.room_seat[i].seats[j].students && this.seat_editor.room_seat[i].seats[j].students.length > 1) {
                                for (let k = 1; k < this.seat_editor.room_seat[i].seats[j].students.length; k++) {
                                    /* v1
                                    let exce = {
                                        seat: this.seat_editor.room_seat[i].seats[j].id,
                                        student: this.seat_editor.room_seat[i].seats[j].students[k],
                                    }
                                    excess.push(exce);
                                    */
                                    excess.push(this.seat_editor.room_seat[i].seats[j].students[k]);
                                }
                            }
                            if (!this.seat_editor.room_seat[i].seats[j].caption || 0 == this.seat_editor.room_seat[i].seats[j].caption.length) {
                                this.seat_editor.room_seat[i].seats[j].caption = this.seat_editor.room_seat[i].seats[j].ip;
                            }
                        }
                    }
                    this.seat_editor.room_seat[i].excess = excess;
                }
            }
            //console.log('>>>', this.seat_editor.room_seat)
            //#endregion

            //TODO: 在分组发生变化时需要调用下面两个方法更新小组划线数据
            this.room_desk_seat_group();
            this.room_desk_group_border();
        },

        /**
         * 坐位ID获取课桌索引、坐位索引
         * @param seat_id
         */
        desk_index_seat_index_from_id(seat_id) {
            let desk_index = -1;
            let seat_index = -1;
            let result = {
                desk: desk_index,
                seat: seat_index
            };
            if (this.seat_editor.room_seat && this.seat_editor.room_seat.length > 0) {
                for (let i = 0; i < this.seat_editor.room_seat.length; i++) {
                    if (this.seat_editor.room_seat[i].seats && this.seat_editor.room_seat[i].seats.length > 0) {
                        for (let j = 0; j < this.seat_editor.room_seat[i].seats.length; j++) {
                            if (seat_id == this.seat_editor.room_seat[i].seats[j].id) {
                                result.desk = i;
                                result.seat = j;
                                return result;
                            }
                        }
                    }
                }
            }
            return result;
        },

        //#endregion

        //#region 处理课桌分组划线数据

        /**
         * 坐位分组
         */
        room_desk_seat_group() {
            this.seat_editor.student_groups = [];
            if (this.seat_editor.room_seat && this.seat_editor.room_seat.length > 0) {
                for (let i = 0; i < this.seat_editor.room_seat.length; i++) {
                    if (this.seat_editor.room_seat[i].seats && this.seat_editor.room_seat[i].seats.length > 0) {
                        for (let j = 0; j < this.seat_editor.room_seat[i].seats.length; j++) {
                            let groups = this.seat_editor.student_groups.filter(g => g.id == this.seat_editor.room_seat[i].seats[j].id_group);
                            if (!(groups && groups.length > 0)) {
                                let group = {
                                    id: this.seat_editor.room_seat[i].seats[j].id_group,
                                    title: this.seat_editor.room_seat[i].seats[j].name_group,
                                    color: this.seat_editor.room_seat[i].seats[j].border_color,
                                    select_icon: 'icon-duoxuankuang1',
                                    select_type: 'success',
                                };
                                this.seat_editor.student_groups.push(group);
                            }
                        }
                    }
                }
            }
        },

        /**
         * 课桌分组边框
         */
        room_desk_group_border() {
            if (this.seat_editor.student_groups && this.seat_editor.student_groups.length > 0) {
                for (let i = 0; i < this.seat_editor.student_groups.length; i++) {
                    let seats = this.room_group_seats(this.seat_editor.student_groups[i].id);
                    let row_col = this.room_group_seats_rows(seats);
                    this.room_desk_border_type(row_col);
                }
            }
        },

        /**
         * 根据组ID获取本组坐位
         * @param id_group
         */
        room_group_seats(id_group) {
            let seats = [];
            if (this.seat_editor.room_seat && this.seat_editor.room_seat.length > 0) {
                for (let i = 0; i < this.seat_editor.room_seat.length; i++) {
                    if (this.seat_editor.room_seat[i].seats && this.seat_editor.room_seat[i].seats.length > 0) {
                        for (let j = 0; j < this.seat_editor.room_seat[i].seats.length; j++) {
                            if (id_group == this.seat_editor.room_seat[i].seats[j].id_group) {
                                seats.push(this.seat_editor.room_seat[i].seats[j]);
                            }
                        }
                    }
                }
            }
            return seats;
        },

        /***
         * 将组中的座位分行分列
         * 构建一个 行列 二维数组
         * @param seats
         */
        room_group_seats_rows(seats) {
            let row_seat_list = [];
            let rows = [];
            //#region 抽取小组行
            if (seats && seats.length > 0) {
                for (let i = 0; i < seats.length; i++) {
                    let row = seats[i].row;
                    if (!rows.some(r => r === row)) {
                        rows.push(row);
                    }
                }
            }
            //#endregion
            //#region 根据小组行获取坐位
            if (rows && rows.length > 0) {
                //排序行
                rows.sort((a, b) => a - b);
                //#region 获取小组行中的座位
                for (let i = 0; i < rows.length; i++) {
                    let row_seats = [];
                    if (seat && seats.length > 0) {
                        for (let j = 0; j < seats.length; j++) {
                            if (rows[i] == seats[j].row) {
                                row_seats.push(seats[j]);
                            }
                        }
                    }
                    if (row_seats && row_seats.length > 0) {
                        //排序行中的列
                        row_seats.sort((a, b) => a.col - b.col);
                        row_seat_list.push(row_seats);
                    }
                }
                //#endregion
            }
            //#endregion
            return row_seat_list;
        },

        /**
         * 设置课桌边框
         * 并更新到room_seat
         * @param seats
         */
        room_desk_border_type(seats) {
            //#region 坐位转换为课桌
            let index_desk = 0;
            let desks = [];
            if (seats && seats.length > 0) {
                for (let i = 0; i < seats.length; i++) {
                    let rows = [];
                    if (seats[i] && seats[i].length > 0) {
                        for (let j = 0; j < seats[i].length; j++) {
                            if (0 == j % this.seat_layout._desk_seat_qty) {
                                index_desk = index_desk + 1;
                                let desk = {
                                    id: index_desk,
                                    id_group: seats[i][j].id_group,
                                    name_group: seats[i][j].name_group,
                                    border_color: seats[i][j].border_color,
                                    row: seats[i][j].row,
                                    col: seats[i][j].col,
                                }
                                /*
                                if (seats[i][j].row == 1 && seats[i][j].col == 3) {
                                    console.log(j, '-->', seats[i][j].border_color, desk)
                                }
                                */
                                rows.push(desk);
                            }
                        }
                    }
                    desks.push(rows);
                }
                //#endregion

            }
            //#endregion
            if (desks && desks.length > 0) {
                for (let i = 0; i < desks.length; i++) {
                    if (desks[i] && desks[i].length > 0) {
                        for (let j = 0; j < desks[i].length; j++) {
                            if (0 == i) {
                                desks[i][j].draw_top = 1;
                            }
                            if (desks.length - 1 == i) {
                                desks[i][j].draw_bottom = 1;
                            }
                            if (0 == j) {
                                desks[i][j].draw_left = 1;
                            }
                            if (desks[i].length - 1 == j) {
                                desks[i][j].draw_right = 1;
                            }
                        }
                    }
                }
            }

            if (this.seat_editor.room_seat && this.seat_editor.room_seat.length > 0) {
                //#region 课桌分组划线
                for (let i = 0; i < this.seat_editor.room_seat.length; i++) {
                    if (this.seat_editor.room_seat[i].seats && this.seat_editor.room_seat[i].seats.length > 0) {
                        let desk = this.row_col_desk_draw(this.seat_editor.room_seat[i].seats[0].row, this.seat_editor.room_seat[i].seats[0].col, desks);
                        if (desk) {
                            this.seat_editor.room_seat[i].border_color = desk.border_color;
                            this.seat_editor.room_seat[i].id_group = desk.id_group;
                            this.seat_editor.room_seat[i].draw_top = 0;
                            this.seat_editor.room_seat[i].draw_left = 0;
                            this.seat_editor.room_seat[i].draw_right = 0;
                            this.seat_editor.room_seat[i].draw_bottom = 0;
                            if (1 == desk.draw_top) {
                                this.seat_editor.room_seat[i].draw_top = 1;
                            }
                            if (1 == desk.draw_left) {
                                this.seat_editor.room_seat[i].draw_left = 1;
                            }
                            if (1 == desk.draw_right) {
                                this.seat_editor.room_seat[i].draw_right = 1;
                            }
                            if (1 == desk.draw_bottom) {
                                this.seat_editor.room_seat[i].draw_bottom = 1;
                            }
                        }
                    }
                }
                //#endregion
                //#region 修正课桌异组底部、上步划线
                //#region 一维数组拆分为二维数组
                let row_desk_qty = Math.floor(this.seat_editor.obj_room.cols / this.seat_editor.room_seat[0].seats.length);
                if (0 != (this.seat_editor.obj_room.cols % this.seat_editor.room_seat[0].seats.length)) {
                    row_desk_qty = row_desk_qty + 1;
                }
                let desk_rows = [];
                let desk_cols = [];
                let group_data = new Map();
                for (let i = 0; i < this.seat_editor.room_seat.length; i++) {
                    if (0 == i % row_desk_qty) {
                        desk_cols = [];
                    }
                    desk_cols.push(this.seat_editor.room_seat[i]);
                    if (row_desk_qty - 1 == i % row_desk_qty) {
                        desk_rows.push(desk_cols);
                    }
                    //#region 设置课桌在小组中的序号
                    if (this.seat_editor.room_seat[i].id_group) {
                        let order = 0;
                        if (!group_data.has(this.seat_editor.room_seat[i].id_group)) {
                            group_data.set(this.seat_editor.room_seat[i].id_group, order);
                        } else {
                            order = parseInt(group_data.get(this.seat_editor.room_seat[i].id_group)) + 1;
                            group_data.set(this.seat_editor.room_seat[i].id_group, 1);
                        }
                        this.seat_editor.room_seat[i].order = order;
                    }
                    //#endregion
                }
                //#endregion
                //#region 修正课桌底部、顶部
                for (let i = 0; i < desk_rows.length; i++) {
                    if (i > 0) {
                        for (let j = 0; j < desk_rows[i].length; j++) {
                            if (desk_rows[i][j].id_group != desk_rows[i - 1][j].id_group) {
                                desk_rows[i - 1][j].draw_bottom = 1;
                                desk_rows[i][j].draw_top = 1;
                            }
                        }
                    }
                }
                //#endregion
                //#endregion
            }

            //console.log(this.seat_editor.room_seat);
        },

        /**
         * 根据行列信息获取课桌划线情况
         * @param row
         * @param col
         * @param seats
         */
        row_col_desk_draw(row, col, seats) {
            if (seats && seats.length > 0) {
                for (let i = 0; i < seats.length; i++) {
                    if (seats[i] && seats[i].length > 0) {
                        for (let j = 0; j < seats[i].length; j++) {
                            if (row == seats[i][j].row && col == seats[i][j].col) {
                                return seats[i][j];
                            }
                        }
                    }
                }
            }
            return null;
        },

        //#endregion

        //#region 工具栏操作

        /**
         * 分配学生到教室课桌座位
         * @param evt
         */
        class_student_allocate_room_seat(evt) {
            //#region 判断班级学生 教室座位
            if (!(this.seat_editor.class_student && this.seat_editor.class_student.length > 0)) {
                this.$message({type: 'error', message: '班级学生无效'});
                return;
            }
            if (!(this.seat_editor.room_seat && this.seat_editor.room_seat.length > 0)) {
                this.$message({type: 'error', message: '教室坐位无效'});
                return;
            }
            //#endregion

            //#region 清除课桌座位学生 将坐位数据从二级提升到一级
            let roomSeats = [];
            for (let i = 0; i < this.seat_editor.room_seat.length; i++) {
                if (this.seat_editor.room_seat[i].seats && this.seat_editor.room_seat[i].seats.length > 0) {
                    for (let j = 0; j < this.seat_editor.room_seat[i].seats.length; j++) {
                        this.seat_editor.room_seat[i].seats[j].students = [];
                        roomSeats.push(this.seat_editor.room_seat[i].seats[j]);
                    }
                }
            }
            //#endregion

            //#region 分配学生到座位
            this.seat_editor.excess_student = [];
            for (let i = 0; i < this.seat_editor.class_student.length; i++) {
                let index = i % roomSeats.length;
                let order = roomSeats[index].students.length + 1;
                let s = {
                    order: order,
                    id: this.seat_editor.class_student[i].id,
                    sno: this.seat_editor.class_student[i].sno,
                    name: this.seat_editor.class_student[i].name,
                    intro: this.seat_editor.class_student[i].intro,
                    male: this.seat_editor.class_student[i].male,
                    name_male: 1 == this.seat_editor.class_student[i].male ? '男' : '女',
                    avatar: this.seat_editor.class_student[i].avatar,
                };
                //excess_student
                if (1 == order) {
                    roomSeats[index].students.push(s);
                } else {
                    this.seat_editor.excess_student.push(s);
                }
            }
            //#endregion

            //#region 将坐位分配到课桌
            for (let i = 0; i < this.seat_editor.room_seat.length; i++) {
                if (this.seat_editor.room_seat[i].seats && this.seat_editor.room_seat[i].seats.length > 0) {
                    for (let j = 0; j < this.seat_editor.room_seat[i].seats.length; j++) {
                        let id_seat = this.seat_editor.room_seat[i].seats[j].id;
                        if (id_seat && id_seat > 0) {
                            let obj_seat = roomSeats.find(d => d.id == id_seat);
                            if (obj_seat && obj_seat.id > 0) {
                                this.seat_editor.room_seat[i].seats[j].students = obj_seat.students;
                                if (this.seat_editor.room_seat[i].seats[j].students && this.seat_editor.room_seat[i].seats[j].students.length > 0) {
                                    this.seat_editor.room_seat[i].seats[j].title = this.seat_editor.room_seat[i].seats[j].students[0].sno;
                                    this.seat_editor.room_seat[i].seats[j].caption = this.seat_editor.room_seat[i].seats[j].students[0].name;
                                    if (this.seat_editor.room_seat[i].seats[j].caption && 0 == this.seat_editor.room_seat[i].seats[j].caption.trim().length) {
                                        this.seat_editor.room_seat[i].seats[j].caption = this.seat_editor.room_seat[i].seats[j].ip;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            //console.log('-->', this.seat_editor.room_seat);
            //console.log('-->', this.seat_editor.excess_student);
            //#endregion

            //console.log(this.seat_editor.room_seat);
        }
        ,

        /**
         * 小组操作切换
         */
        room_group_show_toggle() {
            this.seat_editor.popover_close = !this.seat_editor.popover_close;
        }
        ,

        /**
         * 保存班级学生到教室坐位
         */
        class_student_save_room_seat() {
            let seats = [];
            let index = new Map();
            for (let i = 0; i < this.seat_editor.room_seat.length; i++) {
                for (let j = 0; j < this.seat_editor.room_seat[i].seats.length; j++) {
                    let order = 0;
                    for (let k = 0; k < this.seat_editor.room_seat[i].seats[j].students.length; k++) {
                        order = order + 1;
                        let id_group = this.seat_editor.room_seat[i].seats[j].id_group;
                        let name_group = this.seat_editor.room_seat[i].seats[j].name_group;
                        if (!id_group || id_group <= 0 || !name_group || 0 == name_group.trim().length) {
                            this.$message({
                                type: 'error',
                                message: `第${this.seat_editor.room_seat[i].name}--${this.seat_editor.room_seat[i].seats[j].name}，没有指定分组`
                            });
                            return;
                        }
                        if (!index.has(id_group)) {
                            index.set(id_group, 0);
                        }
                        let _index = index.get(id_group) + 1;
                        index.set(id_group, _index);
                        let seat = {
                            id_class: this.seat_editor.obj_class.id,
                            id_room: this.seat_editor.obj_room.id,
                            id_student: this.seat_editor.room_seat[i].seats[j].students[k].id,
                            id_seat: this.seat_editor.room_seat[i].seats[j].id,
                            order: order,
                            id_group: id_group,
                            title_group: name_group,
                            index: _index,
                        }
                        seats.push(seat);
                    }
                }
            }
            console.log(seats);
            let result = roomSeatStudent(seats);
            result.then(rs => {
                this.$message({type: 'success', message: '分配班级学生坐位成功'});
            }).catch(ex => {
                console.log(ex);
            }).finally();
        }
        ,

        /**
         * 坐位分配关闭
         */
        close_seat() {
            this.$confirm('即将关闭学生分配教室坐位?', '提示', {
                confirmButtonText: '关闭',
                cancelButtonText: '取消',
                type: 'message'
            }).then(() => {
                this.seat_editor.open = false;
            }).catch(ex => {
                this.$message({
                    type: 'error',
                    message: '关闭异常'
                });
            });
        }
        ,

        /**
         * 全选/取消 坐位
         */
        select_all_seat_item() {
            if ('icon-duoxuankuang1' == this.seat_editor.select_seat_icon) {
                this.seat_editor.select_seat_icon = 'icon-mulu1';
                this.seat_editor.select_seat_title = '取消';
                for (let i = 0; i < this.seat_editor.room_seat.length; i++) {
                    if (this.seat_editor.room_seat[i].seats && this.seat_editor.room_seat[i].seats.length > 0) {
                        for (let j = 0; j < this.seat_editor.room_seat[i].seats.length; j++) {
                            this.seat_editor.room_seat[i].seats[j].showcheckbox = true;
                            this.seat_editor.room_seat[i].seats[j].checkbox = true;
                        }
                    }
                }
            } else {
                this.seat_editor.select_seat_icon = 'icon-duoxuankuang1';
                this.seat_editor.select_seat_title = '全选';
                for (let i = 0; i < this.seat_editor.room_seat.length; i++) {
                    if (this.seat_editor.room_seat[i].seats && this.seat_editor.room_seat[i].seats.length > 0) {
                        for (let j = 0; j < this.seat_editor.room_seat[i].seats.length; j++) {
                            this.seat_editor.room_seat[i].seats[j].showcheckbox = false;
                            this.seat_editor.room_seat[i].seats[j].checkbox = false;
                        }
                    }
                }
            }
        }
        ,
        //#endregion

        //#region 组操作

        /**
         * 新增小组
         */

        room_group_add() {
            let group_title = this.seat_editor.group_title.trim();
            if (!(group_title && group_title.length > 0)) {
                this.$message({type: 'error', message: '输入小组名称'});
                return;
            }
            //#region 批量新增
            if (isInteger(group_title)) {
                let group_qty = parseInt(group_title);
                this.seat_editor.student_groups = [];
                for (let i = 0; i < group_qty; i++) {
                    let id_group = i + 1;
                    let title_group = `第${id_group}组`;
                    let color = this.seat_editor.group_color[i % (this.seat_editor.group_color.length)];
                    let group = {
                        id: id_group,
                        title: title_group,
                        color: color,
                        select_icon: 'icon-duoxuankuang1',
                        select_type: 'success',
                    };
                    this.seat_editor.student_groups.push(group);
                }
                return;
            }
            //#endregion
            let id = 1;
            if (this.seat_editor.student_groups && this.seat_editor.student_groups.length > 0) {
                let max_group = this.seat_editor.student_groups.reduce((prev, curr) => {
                    return prev.id > curr.id ? prev : curr;
                });
                if (max_group && max_group.id > 0) {
                    id = max_group.id + 1;
                }
            }
            let eg = this.seat_editor.student_groups.find(g => g.title == group_title);
            if (eg && eg.id > 0) {
                this.$message({type: 'error', message: `小组：${group_title}，已经存在`});
                return;
            }
            let color = this.seat_editor.group_color[(id - 1) % (this.seat_editor.group_color.length)];
            let group = {
                id: id,
                title: group_title,
                color: color,
                select_icon: 'icon-duoxuankuang1',
                select_type: 'success',
            };
            this.seat_editor.student_groups.push(group);
        },

        /**
         * 删除小组
         * @param evt
         */
        room_group_delete(evt) {
            let index = parseInt(evt.currentTarget.dataset.index);
            let title = this.seat_editor.student_groups[index].title;
            this.$confirm(`即将删除小组--${title}?`, '提示', {
                confirmButtonText: '删除',
                cancelButtonText: '取消',
                type: 'message'
            }).then(() => {
                this.seat_editor.student_groups.splice(index, 1);
            }).catch(ex => {
                this.$message({
                    type: 'error',
                    message: '删除小组异常'
                });
            });
        },

        /**
         * 选择小组
         * @param evt
         */
        room_group_select(evt) {
            let index = parseInt(evt.currentTarget.dataset.index);
            let group = this.seat_editor.student_groups[index];
            let id_group = group.id;
            let changed = false;
            //console.log(group);
            //#region 将选中的课桌加入指定组.系统进行边界检测
            if (this.seat_editor.room_seat && this.seat_editor.room_seat.length > 0) {
                for (let i = 0; i < this.seat_editor.room_seat.length; i++) {
                    if (this.seat_editor.room_seat[i].seats && this.seat_editor.room_seat[i].seats.length > 0) {
                        for (let j = 0; j < this.seat_editor.room_seat[i].seats.length; j++) {
                            if (this.seat_editor.room_seat[i].seats[j].checkbox) {
                                this.seat_editor.room_seat[i].seats[j].id_group = group.id;
                                this.seat_editor.room_seat[i].seats[j].name_group = group.title;
                                this.seat_editor.room_seat[i].seats[j].border_color = group.color;
                                //console.log('-->', this.seat_editor.room_seat[i].seats[j]);
                                changed = true;
                            }
                        }
                    }
                }
            }
            //#endregion
            if (changed) {
                //this.room_desk_seat_group();
                this.room_desk_group_border();
            }
            if (this.seat_editor.room_seat && this.seat_editor.room_seat.length > 0) {
                for (let i = 0; i < this.seat_editor.room_seat.length; i++) {
                    if (this.seat_editor.room_seat[i].seats && this.seat_editor.room_seat[i].seats.length > 0) {
                        for (let j = 0; j < this.seat_editor.room_seat[i].seats.length; j++) {
                            if (id_group == this.seat_editor.room_seat[i].seats[j].id_group) {
                                this.seat_editor.room_seat[i].seats[j].checkbox = false;
                                this.seat_editor.room_seat[i].seats[j].showcheckbox = false;
                            }
                        }
                    }
                }
            }
        },

        /**
         * 选择小组座位
         * @param evt
         */
        room_group_select_seats(evt) {
            //console.log(this.seat_editor.room_seat);
            let gi = parseInt(evt.currentTarget.dataset.index);
            let id_group = this.seat_editor.student_groups[gi].id;
            if ('icon-duoxuankuang1' == this.seat_editor.student_groups[gi].select_icon) {
                this.seat_editor.student_groups[gi].select_icon = 'icon-mulu';
                this.seat_editor.student_groups[gi].select_type = 'danger';
                if (this.seat_editor.room_seat && this.seat_editor.room_seat.length > 0) {
                    for (let i = 0; i < this.seat_editor.room_seat.length; i++) {
                        if (this.seat_editor.room_seat[i].seats && this.seat_editor.room_seat[i].seats.length > 0) {
                            for (let j = 0; j < this.seat_editor.room_seat[i].seats.length; j++) {
                                if (id_group == this.seat_editor.room_seat[i].seats[j].id_group) {
                                    this.seat_editor.room_seat[i].seats[j].checkbox = true;
                                    this.seat_editor.room_seat[i].seats[j].showcheckbox = true;
                                }
                            }
                        }
                    }
                }
            } else {
                this.seat_editor.student_groups[gi].select_icon = 'icon-duoxuankuang1';
                this.seat_editor.student_groups[gi].select_type = 'success';
                if (this.seat_editor.room_seat && this.seat_editor.room_seat.length > 0) {
                    for (let i = 0; i < this.seat_editor.room_seat.length; i++) {
                        if (this.seat_editor.room_seat[i].seats && this.seat_editor.room_seat[i].seats.length > 0) {
                            for (let j = 0; j < this.seat_editor.room_seat[i].seats.length; j++) {
                                if (id_group == this.seat_editor.room_seat[i].seats[j].id_group) {
                                    this.seat_editor.room_seat[i].seats[j].checkbox = false;
                                    this.seat_editor.room_seat[i].seats[j].showcheckbox = false;
                                }
                            }
                        }
                    }
                }
            }
        },

        //#endregion

        //#region 课桌操作

        /**
         * 切换坐位状态
         * @param evt
         */
        toggle_seat_state(evt) {
            let di = parseInt(evt.currentTarget.dataset.di);
            let si = parseInt(evt.currentTarget.dataset.si);
            this.seat_editor.room_seat[di].seats[si].id_state = !this.seat_editor.room_seat[di].seats[si].id_state;
            console.log(this.seat_editor.room_seat);
        },

        /**
         * 选择/取消选择
         * @param evt
         */
        toggle_seat_select(evt) {
            let di = parseInt(evt.currentTarget.dataset.di);
            let si = parseInt(evt.currentTarget.dataset.si);
            this.seat_editor.room_seat[di].seats[si].checkbox = !this.seat_editor.room_seat[di].seats[si].checkbox;
            this.seat_editor.room_seat[di].seats[si].showcheckbox = !this.seat_editor.room_seat[di].seats[si].showcheckbox;
            if (0 == si % this.seat_layout._desk_seat_qty) {
                this.seat_editor.room_seat[di].seats[si + 1].checkbox = !this.seat_editor.room_seat[di].seats[si + 1].checkbox;
                this.seat_editor.room_seat[di].seats[si + 1].showcheckbox = !this.seat_editor.room_seat[di].seats[si + 1].showcheckbox;
            }
            if (1 == si % this.seat_layout._desk_seat_qty) {
                this.seat_editor.room_seat[di].seats[si - 1].checkbox = !this.seat_editor.room_seat[di].seats[si - 1].checkbox;
                this.seat_editor.room_seat[di].seats[si - 1].showcheckbox = !this.seat_editor.room_seat[di].seats[si - 1].showcheckbox;
            }
        },

        //#endregion

        //#region 框选课桌

        /**
         * 框选开始
         * @param evt
         */
        box_select_start(evt) {
            this.seat_editor.box_select = true;
            this.seat_editor.box_select_rect = document.createElement("div");
            this.seat_editor.box_select_rect.id = this.seat_editor.box_select_rect_id;
            this.seat_editor.box_select_rect.style.cssText = "position:absolute;width:0px;height:0px;font-size:0px;margin:0px;padding:0px;border:1px dashed #0099ff;background-color:#c3d5ed;z-index:10000;filter:alpha(opacity:60);opacity:0.6;";
            this.seat_editor.box_select_rect_x = evt.x || evt.clientX;
            this.seat_editor.box_select_rect_y = evt.y || evt.clientY;
            this.seat_editor.box_select_rect.style.left = this.seat_editor.box_select_rect_x + "px";
            this.seat_editor.box_select_rect.style.top = this.seat_editor.box_select_rect_y + "px";
            document.body.appendChild(this.seat_editor.box_select_rect);
        },

        /**
         * 框选选择
         * @param evt
         */
        box_select_size(evt) {
            if (!this.seat_editor.box_select) {
                return;
            }
            let x2 = evt.clientX;
            let y2 = evt.clientY;
            this.seat_editor.box_select_rect.style.left = Math.min(x2, this.seat_editor.box_select_rect_x) + "px";
            this.seat_editor.box_select_rect.style.top = Math.min(y2, this.seat_editor.box_select_rect_y) + "px";
            this.seat_editor.box_select_rect.style.width = Math.abs(x2 - this.seat_editor.box_select_rect_x - 2) + "px";
            this.seat_editor.box_select_rect.style.height = Math.abs(y2 - this.seat_editor.box_select_rect_y - 2) + "px";
        },

        /**
         * 框选结束
         * @param evt
         */
        box_select_end(evt) {
            this.seat_editor.box_select = false;

            //获取所有坐位
            let item_class = 'desk_item_seat';
            let seats = document.getElementsByClassName(item_class);
            //获取选择框大小
            let select_pos = this.seat_editor.box_select_rect.getBoundingClientRect();
            let box_x1 = select_pos.x;
            let box_y1 = select_pos.y;
            let box_x2 = select_pos.right;
            let box_y2 = select_pos.bottom;
            for (let i = 0; i < seats.length; i++) {
                let desk_index = seats[i].dataset.di;
                let seat_index = seats[i].dataset.si;
                let seat_pos = seats[i].getBoundingClientRect();
                let seat_x1 = seat_pos.x;
                let seat_y1 = seat_pos.y;
                let seat_x2 = seat_pos.right;
                let seat_y2 = seat_pos.bottom;
                if (((seat_x1 >= box_x1 && seat_x1 <= box_x2) && (seat_y1 >= box_y1 && seat_y1 <= box_y2))
                    || ((seat_x2 >= box_x1 && seat_x2 <= box_x2) && (seat_y1 >= box_y1 && seat_y1 <= box_y2))
                    || ((seat_x1 >= box_x1 && seat_x1 <= box_x2) && (seat_y2 >= box_y1 && seat_y2 <= box_y2))
                    || ((seat_x2 >= box_x1 && seat_x2 <= box_x2) && (seat_y2 >= box_y1 && seat_y2 <= box_y2))) {
                    //this.seat_editor.room_seat[i].showcheckbox = true;
                    //this.seat_editor.room_seat[i].checkbox = true;
                    //console.log(desk_index, '---', seat_index);
                    if (this.seat_editor.room_seat[desk_index].seats && this.seat_editor.room_seat[desk_index].seats.length > 0) {
                        for (let j = 0; j < this.seat_editor.room_seat[desk_index].seats.length; j++) {
                            this.seat_editor.room_seat[desk_index].seats[j].checkbox = true;
                            this.seat_editor.room_seat[desk_index].seats[j].showcheckbox = true;
                        }
                    }
                }
            }
            let box_select = document.getElementById(this.seat_editor.box_select_rect_id);
            box_select.remove();
        },

        //#endregion

        //#region 拖动处理

        /**
         * 根据学生对象，获取学生所在课桌--坐位--学生序号
         * @param student
         */
        desk_seat_student(student) {
            let result = null;
            for (let i = 0; i < this.seat_editor.room_seat.length; i++) {
                for (let j = 0; j < this.seat_editor.room_seat[i].seats.length; j++) {
                    for (let k = 0; k < this.seat_editor.room_seat[i].seats[j].students.length; k++) {
                        if (student.id == this.seat_editor.room_seat[i].seats[j].students[k].id) {
                            result = {
                                desk: i,
                                seat: j,
                                student: k
                            };
                            return result;
                        }
                    }
                }
            }
            return result;
        }
        ,

        /**
         * 允许拖动
         * @param evt
         */
        seat_drop(evt) {
            evt.preventDefault();
            //console.log('允许拖动');
        }
        ,

        /**
         * 开始拖动
         * @param evt
         */
        seat_drop_start(evt) {
            //console.log(evt);
            //console.log(evt.currentTarget);
            //console.log('开始拖动');
            this.seat_editor.drag_source = evt.currentTarget;
        }
        ,

        /***
         * 拖动结束
         * @param evt
         */
        seat_drop_end(evt) {
            evt.preventDefault();

            //#region 获取拖动类型
            let source_type = this.seat_editor.drag_source.getAttribute('data-type');
            if (!isInteger(source_type)) {
                this.$message({
                    type: 'error',
                    message: '源拖动方式类型无效'
                });
                return;
            }
            source_type = parseInt(source_type);
            let drag_target = evt.currentTarget;
            let target_type = drag_target.getAttribute('data-type');
            if (!isInteger(source_type)) {
                this.$message({
                    type: 'error',
                    message: '目标拖动方式类型无效'
                });
                return;
            }
            target_type = parseInt(target_type)
            //#endregion

            //#region 获取拖动课桌索引
            let source_desk_index = this.seat_editor.drag_source.getAttribute('data-desk');
            if (!isInteger(source_desk_index)) {
                this.$message({
                    type: 'error',
                    message: '拖动源课桌索引无效'
                });
                return;
            }
            source_desk_index = parseInt(source_desk_index);
            let target_desk_index = drag_target.getAttribute('data-desk');
            if (!isInteger(target_desk_index)) {
                this.$message({
                    type: 'error',
                    message: '拖动目标课桌索引无效'
                });
                return;
            }
            target_desk_index = parseInt(target_desk_index);
            //#endregion

            //#region 获取拖动坐位无效
            let source_seat_index = this.seat_editor.drag_source.getAttribute('data-seat');
            if (!isInteger(source_seat_index)) {
                this.$message({
                    type: 'error',
                    message: '拖动源坐位索引无效'
                });
                return;
            }
            source_seat_index = parseInt(source_seat_index);
            let target_seat_index = drag_target.getAttribute('data-seat');
            if (!isInteger(target_seat_index)) {
                this.$message({
                    type: 'error',
                    message: '拖动目标坐位索引无效'
                });
                return;
            }
            target_seat_index = parseInt(target_seat_index);
            //#endregion

            //#region 获取拖动学生索引
            let source_student_index = this.seat_editor.drag_source.getAttribute('data-student');
            if (!isInteger(source_student_index)) {
                this.$message({
                    type: 'error',
                    message: '拖动源学生索引无效'
                });
                return;
            }
            source_student_index = parseInt(source_student_index);
            let target_student_index = drag_target.getAttribute('data-student');
            if (!isInteger(target_student_index)) {
                this.$message({
                    type: 'error',
                    message: '拖动目标学生索引无效'
                });
                return;
            }
            target_student_index = parseInt(target_student_index);
            //#endregion

            //#region 禁止在学生之间拖动
            if (2 == source_type && 2 == target_type) {
                this.$message({
                    type: 'error',
                    message: '不要在剩余学生之间拖动'
                });
                return;
            }
            //#endregion

            //#region 禁止从坐位向剩余学生拖动
            if (1 == source_type && 2 == target_type) {
                this.$message({
                    type: 'error',
                    message: '不要从坐位向剩余学生区域拖动'
                });
                return;
            }
            //#endregion

            //#region 从剩余学生区域拖动到座位
            if (2 == source_type && 1 == target_type) {
                //获取学生
                let stu = this.seat_editor.excess_student[source_student_index];
                //防止学生到座位
                this.seat_editor.room_seat[target_desk_index].seats[target_seat_index].students.push(stu);
                //放置学生到课桌多余学生处
                this.seat_editor.room_seat[target_desk_index].excess.push(stu);
                //删除拖动的学生
                this.seat_editor.excess_student.splice(source_student_index, 1);
            }
            //#endregion

            //#region 从课桌剩余学生区域向全部剩余学生区域拖动
            if (3 == source_type && 2 == target_type) {
                let stu = this.seat_editor.room_seat[source_desk_index].excess[source_student_index];
                //把学生增加到多余学生区域
                this.seat_editor.excess_student.push(stu);

                //把学生从课桌座位移出
                this.seat_editor.room_seat[source_desk_index].excess.splice(source_student_index, 1);

                //把学生从课桌多余学生区域移出
                for (let i = 0; i < this.seat_editor.room_seat[source_desk_index].seats.length; i++) {
                    for (let j = 0; j < this.seat_editor.room_seat[source_desk_index].seats[i].students.length; j++) {
                        if (stu.id == this.seat_editor.room_seat[source_desk_index].seats[i].students[j].id) {
                            this.seat_editor.room_seat[source_desk_index].seats[i].students.splice(j, 1);
                            break;
                        }
                    }
                }
            }
            //#endregion

            //#region 从课桌座位拖动到另一个坐位
            if (1 == source_type && 1 == target_type) {
                let sstu = this.seat_editor.room_seat[source_desk_index].seats[source_seat_index].students[0];
                let tstu = this.seat_editor.room_seat[target_desk_index].seats[target_seat_index].students[0];
                this.seat_editor.room_seat[source_desk_index].seats[source_seat_index].students[0] = tstu;
                this.seat_editor.room_seat[source_desk_index].seats[source_seat_index].title = tstu.sno;
                this.seat_editor.room_seat[source_desk_index].seats[source_seat_index].caption = tstu.name;
                this.seat_editor.room_seat[target_desk_index].seats[target_seat_index].students[0] = sstu;
                this.seat_editor.room_seat[target_desk_index].seats[target_seat_index].title = sstu.sno;
                this.seat_editor.room_seat[target_desk_index].seats[target_seat_index].caption = sstu.name;
            }
            //#endregion

            //#region 从课桌多余学生拖动到课桌座位
            if (3 == source_type && 1 == target_type) {
                let sstu = this.seat_editor.room_seat[source_desk_index].excess[source_student_index];
                let tstu = this.seat_editor.room_seat[target_desk_index].seats[target_seat_index].students[0];
                //删除源
                let splace = this.desk_seat_student(sstu);
                this.seat_editor.room_seat[splace.desk].seats[splace.seat].students.splice(splace.student, 1);
                //删除目标
                let tplace = this.desk_seat_student(tstu);
                this.seat_editor.room_seat[tplace.desk].seats[tplace.seat].students.splice(tplace.student, 1);
                //将源放入目标--置顶
                this.seat_editor.room_seat[tplace.desk].seats[tplace.seat].students.splice(0, 0, sstu);
                //将目标放入源
                this.seat_editor.room_seat[splace.desk].seats[splace.seat].students.push(tstu);
                //更新界面--源
                this.seat_editor.room_seat[source_desk_index].excess[source_student_index] = tstu;
                //更新界面--目标
                this.seat_editor.room_seat[tplace.desk].seats[tplace.seat].title = sstu.sno;
                this.seat_editor.room_seat[tplace.desk].seats[tplace.seat].caption = sstu.name;
            }
            //#endregion

            //#region 从课桌座位拖动到课桌多余学生
            if (1 == source_type && 3 == target_type) {
                let sstu = this.seat_editor.room_seat[source_desk_index].seats[source_seat_index].students[0];
                let tstu = this.seat_editor.room_seat[target_desk_index].excess[target_student_index];
                //删除源
                let splace = this.desk_seat_student(sstu);
                this.seat_editor.room_seat[splace.desk].seats[splace.seat].students.splice(splace.student, 1);
                //删除目标
                let tplace = this.desk_seat_student(tstu);
                this.seat_editor.room_seat[tplace.desk].seats[tplace.seat].students.splice(tplace.student, 1);
                //将源放入目标
                this.seat_editor.room_seat[tplace.desk].seats[tplace.seat].students.push(sstu);
                this.seat_editor.room_seat[target_desk_index].excess[target_student_index] = sstu;
                //将目标放入源-置顶
                this.seat_editor.room_seat[splace.desk].seats[splace.seat].students.splice(0, 0, tstu);
                this.seat_editor.room_seat[splace.desk].seats[splace.seat].title = tstu.sno;
                this.seat_editor.room_seat[splace.desk].seats[splace.seat].caption = tstu.name;
            }
            //#endregion

            //#region 从课桌多余学生区域拖动到其它课桌多余学生区域
            if (3 == source_type && 3 == target_type) {
                let sstu = this.seat_editor.room_seat[source_desk_index].excess[source_student_index];
                let tstu = this.seat_editor.room_seat[target_desk_index].excess[target_student_index];
                //console.log(sstu, tstu);
                let splace = this.desk_seat_student(sstu);
                this.seat_editor.room_seat[splace.desk].seats[splace.seat].students.splice(splace.student, 1);
                let tplace = this.desk_seat_student(tstu);
                this.seat_editor.room_seat[tplace.desk].seats[tplace.seat].students.splice(tplace.student, 1);
                this.seat_editor.room_seat[tplace.desk].seats[tplace.seat].students.push(sstu);
                this.seat_editor.room_seat[splace.desk].seats[splace.seat].students.push(tstu);
                this.seat_editor.room_seat[source_desk_index].excess[source_student_index] = tstu;
                this.seat_editor.room_seat[target_desk_index].excess[target_student_index] = sstu;
            }
            //#endregion
            //console.log(`s--type:${source_type}--student:${source_student_index}--seat:${source_seat_index}--desk:${source_desk_index}`);
            //console.log(`t--type:${target_type}--student:${target_student_index}--seat:${target_seat_index}--desk:${target_desk_index}`);
            //console.log(this.seat_editor.room_seat);
        }
        ,

        //#endregion
    },
    components: {
        'editor': Editor,
        'organization': organization,
        'seat': seat
    },
    created() {
        //#region 处理当前用户
        let login_user = localStorage.getItem('user') || {};
        this.user = JSON.parse(login_user);
        //#endregion
        //#region 读取教师所在学校教室列表 教授的班级列表
        let city = 0;
        let zone = 0;
        let school = this.user.idSchool;
        let name = '';
        let items = roomItemList(city, zone, school, name);
        items.then(rooms => {
                this.rooms = rooms;
                let classs = teacherClasss(this.user.id);
                classs.then(c => {
                    this.classs = c;
                    this.class_room = [];
                    for (let i = 0; i < this.classs.length; i++) {
                        for (let j = 0; j < this.rooms.length; j++) {
                            let cr = {
                                id_class: this.classs[i].id,
                                name_class: this.classs[i].name,
                                students: this.classs[i].students,
                                id_room: this.rooms[j].id,
                                name_room: this.rooms[j].name,
                                seats: this.rooms[j].seats,
                                cols: this.rooms[j].cols,
                                camera: this.rooms[j].camera
                            }
                            this.class_room.push(cr);
                        }
                    }
                }).catch(ex => {
                    console.log(ex);
                }).finally();
            }
        ).catch(ex => {
            console.log(ex);
        }).finally();
        //#endregion
        //#region 读取班级列表标题
        let class_list = titleList(4);
        class_list.then(cl => {
            this.titles = cl.rows[0].cols;
            for (let i = 0; i < this.titles.length; i++) {
                switch (this.titles[i].align) {
                    case 1:
                        this.titles[i].align_text = 'left';
                        break;
                    case 2:
                        this.titles[i].align_text = 'center';
                        break;
                    case 3:
                        this.titles[i].align_text = 'right';
                        break;
                }
            }
        }).catch(ex => {
            console.log(ex);
        }).finally();
        //#endregion
        //#region 读取班级条目操作菜单
        let menus = classItemMenus();
        menus.then(m => {
            this.menus = m;
        }).catch(ex => {
            console.log(ex);
        }).finally();
        //#endregion
        //#region 获取教师信息
        let techer = teacherMessage();
        techer.then(t => {
            this.techer = t;
        }).catch(ex => {
            console.log(ex);
        }).finally();
        //#endregion
    },
    mounted() {
        //#region 计算顶部组件高度
        this.$nextTick(() => {
            let app_title = document.querySelector('#app_title');
            let app_title_height = app_title.offsetHeight;
            //console.log('标题：', app_title_height);
            let app_teacher = document.querySelector('#app_teacher');
            let app_teacher_height = app_teacher.offsetHeight;
            //console.log('教师：', app_teacher_height);
            let app_list = document.querySelector('#app_list_title');
            let app_list_height = app_list.offsetHeight;
            app_list_height = 40;
            //console.log('标题：', app_list_height);
            let head_height = app_title_height + app_teacher_height + app_list_height + this.list_top * 2;
            //console.log(head_height);
            this.head_height = head_height;
        })
        //#endregion
        //#region 导入方法
        window.seat_drop_swap = this.seat_drop_swap;
        window.seat_drop_move_source_student = this.seat_drop_move_source_student;
        window.seat_drop_swap_student = this.seat_drop_swap_student;
        window.seat_drop_cancel = this.seat_drop_cancel;
        //#endregion
    },
};

let instance = Vue.createApp(app);
instance.use(ElementPlus);
instance.mount('#app');

//#region API调用函数

/**
 * 获取教室条目列表数据
 * @param city
 * @param zone
 * @param school
 * @param name
 * @returns {Promise<*|string>}
 */
async function roomItemList(city, zone, school, name) {
    let result = await getRoomList(city, zone, school, name);
    if (0 != result.result) {
        return;
    }
    let data = result.msg;
    return data;
}

/**
 * 获取教师班级列表
 * @param id
 * @returns {Promise<*|string>}
 */
async function teacherClasss(id) {
    let result = await getTeacherClasss(id);
    if (0 != result.result) {
        return;
    }
    let data = result.msg;
    return data;
}

/**
 * 获取班级列表标题
 * @param id
 * @returns {Promise<*|string>}
 */
async function titleList(id) {
    let result = await getList(id);
    if (0 != result.result) {
        return;
    }
    let data = result.msg;
    return data;
}

/**
 * 获取班级条目操作菜单
 * @returns {Promise<*|string>}
 */
async function classItemMenus() {
    let result = await getClassItemMenu();
    if (0 != result.result) {
        return;
    }
    let data = result.msg;
    return data;
}

/**
 * 获取教师信息
 * @returns {Promise<*|string>}
 */
async function teacherMessage() {
    let result = await getTeacherMessage();
    if (0 != result.result) {
        return;
    }
    let data = result.msg;
    return data;
}

/**
 * 获取班级教室信息
 * @param id_class
 * @param id_room
 * @returns {Promise<*|string>}
 */
async function classRoomStudents(id_class, id_room) {
    let result = await getClassRoomStudents(id_class, id_room);
    if (0 != result.result) {
        return;
    }
    let data = result.msg;
    return data;
}

/**
 * 读取教室坐位列表
 * @param id
 * @returns {Promise<*|string>}
 */
async function roomSeats(id) {
    let result = await getRoomDeskSeats(id);
    if (0 != result.result) {
        return;
    }
    let data = result.msg;
    return data;
}

/**
 * 读取班级学生列表
 * @param id
 * @returns {Promise<*|string>}
 */
async function classStudents(id) {
    let result = await getClassStudents(id);
    if (0 != result.result) {
        return;
    }
    let data = result.msg;
    return data;
}

/**
 * 保存坐位上学生
 * @param seats
 * @returns {Promise<*|string>}
 */
async function roomSeatStudent(seats) {
    let result = await saveRoomSeatStudent(seats);
    if (0 != result.result) {
        return;
    }
    let data = result.msg;
    return data;
}

//#endregion