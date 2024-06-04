const app = {
    data() {
        return {
            user: {},//当前登录用户
            org: [],//组织机构原始数据
            org_result: {},//组织机构选择结果
            title: '教室管理',//页面标题
            room_type: [],//教室类型
            room_type_title: '选择教室类型',//教室类型选择标题
            room_type_result: '',//教室类型选择结果
            room_name: '',//搜索教室名称
            room_name_title: '教室名称',//搜索教室名称提示
            room_list: {},//教室列表对象
            room_list_item_menus: [],//教室条目操作菜单
            room_list_row_checkbox: false,//全选
            room_list_title: [],//教室列表标题
            room_list_item: [],//教室列表数据
            head_height: 0,//页面头部高度
            room_editor: {
                open: false,//是否先打开编辑器
                id_room: 0,//教室ID
                title: '',//编辑器标题
                city: '',//所在城市
                zone: '',//所在区县
                school: '',//所在学校
                type_title: [],//教室类型
                type_result: '',//教室类型
                name_room: '',//教室名称
                location_room: '',//教室位置
                seats_room: 0,//坐位数量
                cols_room: 0,//坐位列数
                head_room: 'https://yiqi.nnyun.net/images/shuhua/room.jpg',//教室头像URL
                head_file: null,//教室头像文件
                desc_room: '',//教室描述
            },//教室编辑器
            camera_editor: {
                open: false,//是否先打开编辑器
                id_room: 0,//教室ID
                title: '',//编辑器标题
                city: '',//所在城市
                zone: '',//所在区县
                school: '',//所在学校
                type: '',//教室类型
                start: '',//开始IP地址
                titles: [],//摄像机列表标题
                list: [],//摄像机列表
                menus: [],//条目菜单
                qty: 0,//自动分配摄像机数量
                select_all: false,//全选
                state: [],//摄像机状态数据
                state_title: '选择状态',//摄像机状态提示,
                user_name: 'admin',//默认用户
                user_pass: '123456',//默认密码
            },//教室摄像机编辑器
            group_editor: {
                open: false,//是否先打开编辑器
                id_room: 0,//教室ID
                title: '',//编辑器标题
                city: '',//所在城市
                zone: '',//所在区县
                school: '',//所在学校
                type: '',//教室类型
                titles: [],//列表标题
                menus: [],//条目菜单
                list: [],//小组列表
                cameras: [],//可用摄像机
                cameras_all: [],//教室摄像机
                groups: 0,//小组数量
                group_camera: 0,//小组摄像机数量
                select_all: false,//选择所有
                group_camera_list: [],//教室中没有使用的摄像机
                group_camera_title: '',//选择小组摄像机标题
            },//教室小组编辑器
            admin_seat_top_editor: {
                open: false,//是否先打开编辑器
                id_room: 0,//教室ID
                room: {},//教室信息
                list: [],//坐位列表
                seat_group: 0,//每组坐位数量
                seat_camera: 0,//每摄像机坐位数量
                chair_width: 30,//坐位椅子宽度
                chair_height: 25,//坐位椅子高度
                seat_split: 5,//坐位之间的间距
                seat_width: 106,//坐位宽度
                seat_heught: 35,//坐位高度
                seat_show_split: 5,//坐位宽度
                seat_show_width: 0,//坐位宽度
                seat_show_heught: 0,//坐位高度
                seat_box_width: 0,//坐位盒子宽度
                seat_box_height: 0,//坐位盒子高度
                rostrum_width: 0,//讲台宽度
                rostrum_height: 35,//讲台高度
                rostrum_split: 25,//讲台坐位间距
                seat_container_top: 10,//容器顶边距
                seat_container_width: 0,//教室容器宽度
                seat_container_height: 0,//教室容器高度
                seat_container_bottom: 10,//容器底边距
                seat_rows: 0,//坐位行数
                seat_cols: 0,//坐位列数
                box_select: false,//是否框选
                seat_top_rect: null,//定义移动元素div
                seat_top_rect_id: 'seat_top_rect_id',//定义移动元素id
                seat_top_rect_left: 0,//顶点x
                seat_top_rect_top: 0,//顶点y
                seat_top_rect_width: 0,//宽度
                seat_top_rect_height: 0,//高度
                select_seat_all: '全选',//全选/取消
                select_seat_all_icon: 'icon-duoxuankuang1',//图标
                room_group: [],//教室小组
                camera_presets: 8,//每个摄像头预置位
                room_camera: [],//教室摄像头列表
            },//管理员吊顶坐位编辑器
            admin_seat_sit_editor: {
                open: false,//是否先打开编辑器
                id_room: 0,//教室ID
                room: {},//教室信息
                list: [],//坐位列表
                select_seat_all: '全选',//全选/取消
                select_seat_all_icon: 'icon-duoxuankuang1',//图标
                start: '192.168.10.200',//默认开始IP地址
                seat_rows: 0,//坐位行数
                seat_cols: 0,//坐位列数
                chair_width: 30,//坐位椅子宽度
                chair_height: 25,//坐位椅子高度
                chair_margin_left: 0,//椅子左边距
                seat_width: 126,//坐位宽度
                seat_height: 35,//坐位高度
                component_padding: 5,//padding值
                inner_margin: 5,//内部边距
                seat_box_width: 0,//坐位盒子宽度
                seat_box_height: 0,//坐位盒子高度
                container_width: 0,//容器宽度
                container_height: 0,//容器高低
                rostrum_width: 0,//讲台宽度
                rostrum_height: 35,//讲台高度
                rostrum_split: 15,//讲台与坐位间隔
                rostrum_top: 15,//讲台顶部间隔
                seat_top: 15,//讲台与坐位间隔
            },//管理员坐位编辑器
            tinymce: {
                plugins: 'lists link image paste help wordcount',
                language_url: '/assets/js/tinymce/langs/zh-Hans.js',
                language: 'zh-Hans',
                height: 240
            },//tinymce编辑器配置
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
        /**
         * 组织机构组件选择结果
         * @param data
         */
        organization_value(data) {
            this.org_result = data;
            //console.log('准备读取教室列表数据');
            this.getRoomItemList();
        },

        /**
         * 获取教室列表数据
         */
        getRoomItemList() {
            let city = this.org_result.city
            let zone = this.org_result.zone;
            let school = this.org_result.school;
            let name = this.room_name.trim();
            let type = isNumeric(this.room_type_result) ? parseInt(this.room_type_result) : 0;
            let items = roomItemList(city, zone, school, name, type);
            items.then(item => {
                // console.log('读取结果：', item);
                if (item && item.length > 0) {
                    for (let i = 0; i < item.length; i++) {
                        item[i].checkbox = false;
                        if (1 == item[i].id_camera) {
                            item[i].menu = this.room_list_item_menus;
                        } else {
                            item[i].menu = this.room_list_item_menus.filter(m => m.value === '2');
                        }
                    }
                }
                this.room_list_item = item;
            }).catch(e => {
                console.log(e);
            }).finally()
        },

        /**
         * 全选
         */
        selectAll() {
            if (this.room_list_item && this.room_list_item.length > 0) {
                for (let i = 0; i < this.room_list_item.length; i++) {
                    this.room_list_item[i].checkbox = this.room_list_row_checkbox;
                }
            }
        },

        /**
         * 返回主程序
         */
        returnMain() {
            window.history.back();
        },

        //#region 教室条目操作

        /**
         * 摄像机管理
         */
        managementCamera(id) {
            this.camera_editor.id_room = id;
            //console.log('>>>', this.camera_editor.id_room);
            let msg = '';
            let list = roomCameras(id);
            list.then(cs => {
                if (cs && cs.length > 0) {
                    for (let i = 0; i < cs.length; i++) {
                        cs[i].edit = true;//是否非处理编辑状态
                        cs[i].checkbox = false;//复选框
                        cs[i].user_encrypt = encryptName(cs[i].user);
                        cs[i].password_encrypt = encryptName(cs[i].password);
                    }
                }
                this.camera_editor.list = cs;
                this.camera_editor.open = true;
            }).catch(ex => {
                console.log(ex);
                msg = JSON.stringify(ex);
                this.$message({
                    type: 'error',
                    message: msg
                });
            }).finally();
        },

        /**
         * 小组管理
         * @param id
         */
        managementTeamGroup(id) {
            this.group_editor.id_room = id;
            let msg = '';
            let list = roomGroups(id);
            list.then(gs => {
                if (gs && gs.length > 0) {
                    for (let i = 0; i < gs.length; i++) {
                        gs[i].edit = false;//是否非处理编辑状态
                        gs[i].checkbox = false;//复选框
                        gs[i].available = [];//可选摄像机
                        gs[i].list = [];//选中的相机
                    }
                }
                this.group_editor.list = gs;
                //console.log('>>>' + this.group_editor.id_room);
                let cameras = roomCameras(id);
                cameras.then(cs => {
                    this.group_editor.cameras_all = cs;
                    if (!(cs && cs.length > 0)) {
                        this.$message({type: 'error', message: '请先定义教室摄像机'});
                        return;
                    }
                    //将没有分配到组的摄像机存放到可用摄像机组
                    for (let i = 0; i < this.group_editor.cameras_all.length; i++) {
                        //console.log('--->', this.group_editor.cameras_all[i].ip);
                        if (!this.camera_exist_group(this.group_editor.cameras_all[i].ip)) {
                            this.group_editor.cameras.push(this.group_editor.cameras_all[i]);
                        }
                    }
                    this.group_camera_list();
                    this.group_editor.open = true;
                }).catch(ex => {
                    console.log(ex);
                    msg = JSON.stringify(ex);
                    this.$message({type: 'error', message: msg});
                }).finally();

            }).catch(ex => {
                console.log(ex);
                msg = JSON.stringify(ex);
                this.$message({type: 'error', message: msg});
            }).finally();
        },

        /**
         * 坐位管理
         * @param id
         */
        managementSeat(id) {
            this.admin_seat_top_editor.id_room = id;
            let room = roomDetail(this.admin_seat_top_editor.id_room);
            room.then(r => {
                //console.log(r);
                //教师
                if (100 == this.user.level) {

                } else {
                    //管理员.吊顶
                    if (1 == r.id_camera) {
                        let list = roomGroups(id);
                        list.then(gs => {
                            this.admin_seat_top_editor.room_group = gs;
                            this.admin_seat_top_editor.room = r;
                            this.admin_seat_top_editor.open = true;
                        }).catch(ex => {
                            console.log(ex);
                            msg = JSON.stringify(ex);
                            this.$message({type: 'error', message: msg});
                        }).finally();
                    }
                    //管理员.坐位
                    if (2 == r.id_camera) {
                        this.admin_seat_sit_editor.id_room = id;
                        this.admin_seat_sit_editor.room = r;
                        this.admin_seat_sit_editor.open = true;
                    }
                }
            }).catch(ex => {
                console.log(ex);
                this.$message({
                    type: 'error',
                    message: `教室ID--${id_room}，异常：${JSON.stringify(ex)}`
                });
            }).finally();
        },

        /**
         * 修改教室
         * @param id
         */
        roomEdit(id) {
            let room = roomDetail(id);
            room.then(r => {
                if (r && r.id > 0) {
                    let describe = r.describe;
                    if (describe && describe.length > 0) {
                        describe = htmlDecodeByRegExp(describe);
                    } else {
                        describe = '';
                    }
                    this.room_editor.id_room = r.id;
                    this.room_editor.title = `修改教室--${r.name}`;
                    this.room_editor.city = r.name_city;
                    this.room_editor.zone = r.name_zone;
                    this.room_editor.school = r.name_school;
                    this.room_editor.type_result = r.id_camera;
                    this.room_editor.name_room = r.name;
                    this.room_editor.location_room = r.position;
                    this.room_editor.seats_room = r.seats;
                    this.room_editor.cols_room = r.cols;
                    this.room_editor.head_room = r.image;
                    this.room_editor.desc_room = describe;
                    this.room_editor.open = true;
                }
            }).catch(e => {
                console.log(e);
            }).finally()
        },

        /**
         * 删除教室
         * @param id
         */
        roomDelete(id) {
            // console.log('删除教室--' + id);
            let title = this.room_list_item.find(r => r.id == id).name;
            let school = this.org_result.school;
            let ids = [];
            ids.push(id);
            let that = this;
            this.$confirm(`确认要删除选择的教室：${title}?`, '提示', {
                confirmButtonText: '删除',
                cancelButtonText: '取消',
                type: 'message'
            }).then(() => {
                let rooms = {
                    idSchool: school,
                    rooms: ids
                };
                let thats = that;
                let result = delRoom(rooms);
                result.then(data => {
                    thats.getRoomItemList();
                }).catch(e => {
                    this.$message({
                        type: 'error',
                        message: e.msg
                    });
                    console.log(e);
                });
            }).catch(ex => {
                console.log(ex);
            });
        },

        /**
         * 教室条目操作
         * @param evt
         */
        execMethod(evt) {
            // console.log(evt.currentTarget.dataset.id);
            let id_room = parseInt(evt.currentTarget.dataset.id);
            let id_menu = parseInt(evt.currentTarget.dataset.menu);
            let menu = this.room_list_item_menus.find(m => m.id == id_menu);
            let method_name = menu.method;
            method_name = `this.${method_name}(${id_room})`;
            // console.log(id_room, id_menu, method_name);
            eval(method_name);
        },

        //#endregion

        //#region 教室编辑器

        /**
         * 新增教室
         */
        addRoom() {
            this.room_editor.title = '新增教室';
            this.room_editor.open = true;
        },

        /**
         * 删除教室
         */
        deleteRooms() {
            // console.log('删除教室');
            let school = this.org_result.school;
            let ids = [];
            let rooms = '';
            if (this.room_list_item && this.room_list_item.length > 0) {
                for (let i = 0; i < this.room_list_item.length; i++) {
                    if (this.room_list_item[i].checkbox) {
                        ids.push(this.room_list_item[i].id);
                        rooms = rooms + this.room_list_item[i].name + '，';
                    }
                }
            }
            if (!ids || ids.length == 0) {
                this.$message({
                    type: 'error',
                    message: `需要选择要删除的教室`
                });
                return;
            }
            if (rooms && rooms.trim().length > 0) {
                rooms = rooms.substr(0, rooms.trim().length - 1);
            }
            let that = this;
            this.$confirm(`确认要删除选择的教室：${rooms}?`, '提示', {
                confirmButtonText: '删除',
                cancelButtonText: '取消',
                type: 'message'
            }).then(() => {
                let rooms = {
                    idSchool: school,
                    rooms: ids
                };
                let thats = that;
                let result = delRoom(rooms);
                result.then(data => {
                    thats.getRoomItemList();
                }).catch(e => {
                    this.$message({
                        type: 'error',
                        message: e.msg
                    });
                    console.log(e);
                });
            }).catch(ex => {
                console.log(ex);
            });
            // delRoom
        },

        /**
         * 编辑器打开
         */
        editor_room_open() {
            this.room_editor.type_title = this.room_type;

            //#region 验证组织机构
            let id_city = this.org_result.city;
            if (!id_city || id_city <= 0) {
                this.$message({
                    type: 'error',
                    message: '请选择城市!'
                });
                this.room_editor.open = false;
            }

            let id_zone = this.org_result.zone;
            if (!id_zone || id_zone <= 0) {
                this.$message({
                    type: 'error',
                    message: '请选择区县!'
                });
                this.room_editor.open = false;
            }

            let id_school = this.org_result.school;
            if (!id_school || id_school <= 0) {
                this.$message({
                    type: 'error',
                    message: '请选择学校!'
                });
                this.room_editor.open = false;
            }
            //#endregion

            //#region 获取机构数据
            let obj_city = this.org.find(c => c.value == id_city);
            this.room_editor.city = obj_city.label;
            let list_zone = obj_city.child;
            let obj_zone = list_zone.find(z => z.value == id_zone);
            this.room_editor.zone = obj_zone.label;
            let list_school = obj_zone.child;
            let obj_school = list_school.find(s => s.value == id_school);
            this.room_editor.school = obj_school.label;
            //#endregion

            console.log('初始化完成... ...');
        },

        /**
         * 关闭编辑器前
         */
        close_editor() {
            console.log('准备关闭');
        },

        /**
         * 关闭教室编辑器
         */
        close_room_editor() {
            this.$confirm('即将关闭教室编辑器?', '提示', {
                confirmButtonText: '关闭',
                cancelButtonText: '取消',
                type: 'message'
            }).then(() => {
                //console.log(this.room_editor.name_room);
                this.room_editor.open = false;
            }).catch(ex => {
                /*
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
                */
            });
        },

        //#region 保存、修改教室
        /**
         * 选择图片
         */
        select_room_head() {
            const room_head_select = document.createElement("input");
            room_head_select.id = "select_head_images";
            room_head_select.setAttribute('type', 'file');
            room_head_select.setAttribute('accept', 'image/*');
            room_head_select.style.setProperty('display', 'none', 'important');
            document.body.appendChild(room_head_select);
            const that = this;
            room_head_select.onchange = function (e) {
                let file_name = e.target.files[0];
                that.room_editor.head_file = file_name;
                let url = window.URL.createObjectURL(file_name);
                that.room_editor.head_room = url;
                //let hs = document.getElementById('select_head_images');
                document.body.removeChild(room_head_select);
                //document.body.removeChild(hs);
            }
            room_head_select.click();
        },

        /**
         * 保存教室
         */
        save_room_verify() {
            //验证其它参数
            let v = this.save_room_data_verify();
            if (!v.result) {
                this.$message({
                    type: 'error',
                    message: v.msg
                });
                return
            }
            //检测是否需要上传图片
            let url = this.room_editor.head_room;
            if (isBlob(url)) {
                console.log('upload... ...')
                //需要上传
                this.upload_room_head(this.room_editor.head_file);
            } else {
                //直接执行保存
                this.save_room_action();
            }
        },

        /**
         * 验证教室参数
         */
        save_room_data_verify() {
            let type = this.room_editor.type_result;
            if (!isInteger(type)) {
                return {result: false, msg: '需要选择教室类型'}
            }
            ;
            let name = this.room_editor.name_room;
            if (name.length <= 0) {
                return {result: false, msg: '录入教室名称'}
            }
            let seats = this.room_editor.seats_room;
            if (!isInteger(seats) || seats <= 0) {
                return {result: false, msg: '录入教室坐位数量'}
            }
            let cols = this.room_editor.cols_room;
            if (!isInteger(cols) || cols <= 0) {
                return {result: false, msg: '录入教室坐位列数'}
            }
            return {result: true, msg: ''}
        },

        //#region 上传教室头像
        /**
         * 上传文件到阿里云
         * @param file
         */
        upload_room_head(file) {
            let oss = aliyunOSS();
            let that = this;
            oss.then(o => {
                let file = that.room_editor.head_file;
                uploadFileToAliyun(o, file, that.upload_room_head_progress, that.upload_room_head_success, that.upload_room_head_fail);
            }).catch(ex => {

            }).finally();
        },

        /**
         * 上传进度
         * @param loaded
         * @param total
         */
        upload_room_head_progress(loaded, total) {
            //console.log(loaded, total);
        },

        /**
         * 上传成功
         * @param url
         */
        upload_room_head_success(url) {
            console.log('上传成功... ...');
            this.room_editor.head_room = url;
            this.save_room_action();
        },

        /**
         * 上传失败
         * @param msg
         */
        upload_room_head_fail(msg) {
            this.$message({
                type: 'error',
                message: msg
            });
        },
        //#endregion

        /**
         * 保存教室
         */
        save_room_action() {
            let id = this.room_editor.id_room;
            let name = this.room_editor.name_room;
            let seats = parseInt(this.room_editor.seats_room);
            let cols = parseInt(this.room_editor.cols_room);
            let type = 1;
            let camera = parseInt(this.room_editor.type_result);
            let position = this.room_editor.location_room;
            let image = this.room_editor.head_room;
            let idSchool = this.org_result.school;
            let describe = this.room_editor.desc_room;
            if (describe && describe.length > 0) {
                describe = htmlEncodeByRegExp(describe);
            }
            let room = {
                id: id,
                name: name,
                seats: seats,
                cols: cols,
                type: type,
                camera: camera,
                position: position,
                image: image,
                idSchool: idSchool,
                describe: describe
            };
            let room_id = saveRoom(room);
            let msg = '';
            room_id.then(id => {
                msg = `保存-->${room.name}，成功`
                this.$message({
                    type: 'success',
                    message: msg
                });
                this.room_editor.id_room = id.id; //保存成功后的数据
                this.room_editor.open = false; //关闭编辑器
                this.getRoomItemList(); //刷新数据
            }).catch(ex => {
                msg = `保存教室失败,${JSON.stringify(ex)}`;
                this.$message({
                    type: 'error',
                    message: msg
                });
            }).finally();
        },
        //#endregion
        //#endregion

        //#region 摄像机编辑器
        /**
         * 编辑器打开
         */
        editor_camera_open() {
            let id_room = this.camera_editor.id_room;
            //console.log('call-->', id_room)
            let room = roomDetail(id_room);
            room.then(r => {
                this.camera_editor.title = `${r.name}--摄像机管理`;
                this.camera_editor.city = r.name_city;
                this.camera_editor.zone = r.name_zone;
                this.camera_editor.school = r.name_school;
                this.camera_editor.type = r.camera;
            }).catch(ex => {
                console.log(ex);
                this.$message({
                    type: 'error',
                    message: `教室ID--${id_room}，异常：${JSON.stringify(ex)}`
                });
            }).finally();
        },

        /**
         * 保存相机
         */
        save_room_camera_verify() {
            if (!this.camera_editor.list || 0 == this.camera_editor.list.length) {
                this.$message({type: 'error', message: '请先增加摄像机'});
                return;
            }
            let ips = groupBy(this.camera_editor.list, 'ip');
            for (let ip in ips) {
                if (ips[ip].length > 1) {
                    for (let i = 0; i < this.camera_editor.list.length; i++) {
                        if (ip == this.camera_editor.list[i].ip) {
                            this.camera_editor.list[i].repeat = 1;
                        }
                    }
                    this.$message({type: 'error', message: `IP地址：${ip}--重复`});
                    return;
                }
            }
            this.batchSaveRoomCamera();
        },

        /**
         * 关闭摄像机编辑器
         */
        close_room_camera_editor() {
            this.$confirm('即将关闭教室摄像机编辑器?', '提示', {
                confirmButtonText: '关闭',
                cancelButtonText: '取消',
                type: 'message'
            }).then(() => {
                this.camera_editor.open = false;
            }).catch(ex => {
            });
        },

        /**
         * 选择所有摄像机
         */
        select_all_room_camera() {
            for (let i = 0; i < this.camera_editor.list.length; i++) {
                this.camera_editor.list[i].checkbox = this.camera_editor.select_all;
            }
        },

        /**
         * 编辑完成
         */
        room_camera_edit_finish(evt) {
            let id_camera = parseInt(evt.currentTarget.dataset.id);
            let index_camera = parseInt(evt.currentTarget.dataset.index);
            this.camera_editor.list[index_camera].user_encrypt = encryptName(this.camera_editor.list[index_camera].user);
            this.camera_editor.list[index_camera].password_encrypt = encryptName(this.camera_editor.list[index_camera].password);
            this.camera_editor.list[index_camera].edit = true;
            //this.camera_editor.list[index_camera].state = 1;
            this.camera_editor.list[index_camera].repeat = 0;
        },

        /**
         * 编辑摄像机
         * @param index
         */
        roomCameraEdit(index) {
            this.camera_editor.list[index].edit = false;
        },

        /**
         * 删除摄像机
         * @param index
         */
        roomCameraDelete(index) {
            let camera = this.camera_editor.list[index];
            this.$confirm(`确认要删除摄像机-->${camera.ip}?`, '提示', {
                confirmButtonText: '删除',
                cancelButtonText: '取消',
                type: 'message'
            }).then(() => {
                this.camera_editor.list.splice(0, 1);
            }).catch(ex => {
            });
        },

        /**
         * 删除所有所有选中的摄像机
         */
        roomAllCameraDelete() {
            let camera = this.camera_editor.list.filter(c => c.checkbox);
            if (!camera || 0 == camera.length) {
                this.$message({type: 'error', message: '选择要删除的摄像机'});
                return;
            }
            this.$confirm(`确认要删除选择的摄像机?`, '提示', {
                confirmButtonText: '删除',
                cancelButtonText: '取消',
                type: 'message'
            }).then(() => {
                let list = [];
                for (let i = 0; i < this.camera_editor.list.length; i++) {
                    let ips = camera.filter(c => c.ip === this.camera_editor.list[i].ip);
                    if (!(ips && ips.length > 0)) {
                        list.push(this.camera_editor.list[i]);
                    }
                }
                this.camera_editor.list = list;
            }).catch(ex => {
            });
        },

        /**
         * 新增摄像机
         */
        roomCameraAdd() {
            let id_room = this.camera_editor.id_room;
            let camera = {
                id: 0,
                title: '',
                ip: '',
                user: this.camera_editor.user_name,
                password: this.camera_editor.user_pass,
                type: 2,
                state: 1,
                position: '',
                angle: 0,
                idRoom: id_room,
                edit: false,
                checkbox: false,
                user_encrypt: encryptName(this.camera_editor.user_name),
                password_encrypt: encryptName(this.camera_editor.user_pass),
                describe: ''
            };
            this.camera_editor.list.splice(0, 0, camera);
        },

        /**
         * 批量新增摄像机
         */
        batchAddRoomCamera() {
            let start = this.camera_editor.start.trim();
            let qty = this.camera_editor.qty;
            if (!isIPv4(start)) {
                this.$message({type: 'error', message: `开始IP地址-->${start}，无效`});
                return;
            }
            if (qty <= 0) {
                this.$message({type: 'error', message: `教室摄像机数量，无效`});
                return;
            }
            let max = this.camera_editor.list.length;
            if (qty <= max) {
                this.$message({type: 'error', message: `教室摄像机数量:${qty}，已经增加完毕`});
                return;
            }
            let id_room = this.camera_editor.id_room;
            let ips = start.split('.');
            let ip = parseInt(ips[3]);
            let count = qty - max;
            let list = [];
            //console.log(ip, count);
            for (let i = 0; i < count; i++) {
                let nip = `${ips[0]}.${ips[1]}.${ips[2]}.${ip}`;
                let camera = {
                    id: 0,
                    title: '',
                    ip: nip,
                    user: this.camera_editor.user_name,
                    password: this.camera_editor.user_pass,
                    type: 2,
                    state: 1,
                    position: '',
                    angle: 0,
                    idRoom: id_room,
                    edit: true,
                    checkbox: false,
                    user_encrypt: encryptName(this.camera_editor.user_name),
                    password_encrypt: encryptName(this.camera_editor.user_pass),
                    describe: ''
                };
                ip++;
                list.splice(0, 0, camera);
            }
            this.camera_editor.list.splice(0, 0, ...list);
        },

        /**
         * 批量保存教室摄像机
         */
        batchSaveRoomCamera() {
            let id_room = this.camera_editor.id_room;
            let list = [];
            for (let i = 0; i < this.camera_editor.list.length; i++) {
                let item = {
                    id: this.camera_editor.list[i].id,
                    title: this.camera_editor.list[i].title,
                    ip: this.camera_editor.list[i].ip,
                    user: this.camera_editor.list[i].user,
                    password: this.camera_editor.list[i].password,
                    type: this.camera_editor.list[i].type,
                    state: this.camera_editor.list[i].state,
                    position: this.camera_editor.list[i].position,
                    angle: this.camera_editor.list[i].angle,
                    idRoom: id_room,
                    describe: '',
                };
                list.push(item);
            }
            let data = {
                idRoom: id_room,
                cameras: list
            };
            let result = saveCamera(data);
            result.then(r => {
                console.log(r);
                this.camera_editor.open = false;
                this.$message({type: 'success', message: `保存教室摄像机成功`});
            }).catch(e => {
                console.log(e);
                this.$message({type: 'error', message: `保存教室摄像机异常--${JSON.stringify(e)}`});
            }).finally();
        },

        /**
         * 执行摄像机条目菜单
         */
        execCameraMethod(evt) {
            let id_camera = parseInt(evt.currentTarget.dataset.id);
            let menu_camera = parseInt(evt.currentTarget.dataset.menu);
            let index_camera = parseInt(evt.currentTarget.dataset.index);
            let menu = this.camera_editor.menus.find(m => m.id == menu_camera);
            let method_name = menu.method;
            method_name = `this.${method_name}(${index_camera})`;
            eval(method_name);
        },
        //#endregion

        //#region 小组编辑器
        /**
         * 小组编辑器
         */
        editor_group_open() {
            /*
            console.log('标题', this.group_editor.titles);
            console.log('菜单', this.group_editor.menus);
            console.log('小组', this.group_editor.list);
            console.log('全部', this.group_editor.cameras_all);
            console.log('可用', this.group_editor.cameras);
            */
            let id_room = this.group_editor.id_room;
            //console.log('room-id-->', id_room);
            let room = roomDetail(id_room);
            room.then(r => {
                this.group_editor.title = `${r.name}--摄像机管理`;
                this.group_editor.city = r.name_city;
                this.group_editor.zone = r.name_zone;
                this.group_editor.school = r.name_school;
                this.group_editor.type = r.camera;
            }).catch(ex => {
                //console.log(ex);
                this.$message({
                    type: 'error',
                    message: `教室ID--${id_room}，异常：${JSON.stringify(ex)}`
                });
            }).finally();
        },

        /**
         * 关闭小组编辑器
         */
        close_room_group_editor() {
            this.$confirm('即将关闭教室小组编辑器?', '提示', {
                confirmButtonText: '关闭',
                cancelButtonText: '取消',
                type: 'message'
            }).then(() => {
                this.group_editor.open = false;
            }).catch(ex => {
            });
        },

        /**
         * 选择所有小组
         */
        select_all_room_group() {
            if (this.group_editor.list && this.group_editor.list.length > 0) {
                for (let i = 0; i < this.group_editor.list.length; i++) {
                    this.group_editor.list[i].checkbox = this.group_editor.select_all;
                }
            }
        },

        /**
         * 处理小组条目菜单
         * @param evt
         */
        execGroupMethod(evt) {
            let id_group = parseInt(evt.currentTarget.dataset.id);
            let menu_group = parseInt(evt.currentTarget.dataset.menu);
            let index_group = parseInt(evt.currentTarget.dataset.index);
            let menu = this.group_editor.menus.find(m => m.id == menu_group);
            let method_name = menu.method;
            method_name = `this.${method_name}(${index_group})`;
            eval(method_name);
        },

        /**
         * 小组编辑成功
         */
        room_group_edit_finish(evt) {
            let id_group = parseInt(evt.currentTarget.dataset.id);
            let index_group = parseInt(evt.currentTarget.dataset.index);
            //console.log(id_group, index_group);
            this.group_editor.list[index_group].edit = false;
        },

        /**
         * 修改小组摄像机
         * @param evt
         */
        editGroupCamera(evt) {

        },

        /**
         * 编辑教室小组
         */
        roomGroupEdit(index) {
            this.group_editor.list[index].edit = true;
        },

        /**
         * 新增小组
         */
        roomGroupAdd() {
            console.log(this.group_editor.list);
            let idRoom = this.group_editor.id_room;
            let group = {
                id: 0,
                name: '',
                edit: true,
                checkbox: false,
                available: [],
                list: [],
                ips: '',
                cameras: [],
                idRoom: idRoom,
                describe: '',
                type: 2
            };
            if (this.group_editor.list && this.group_editor.list.length > 0) {
                let exp = this.group_editor.list[0];
                group.type = exp.type;
                group.describe = exp.describe;
            }
            if (this.group_editor.list) {
                this.group_editor.list.splice(0, 0, group);
            }
        },

        /**
         * 批量增加小组
         */
        batchAddRoomGroup() {
            let groups = this.group_editor.groups;
            let cameras = this.group_editor.group_camera;
            if (groups <= 0) {
                this.$message({type: 'error', message: `小组数量，无效`});
                return;
            }
            cameras = cameras < 0 ? 0 : cameras;
            let id_room = this.group_editor.id_room;
            let list = [];
            for (let i = 0; i < groups; i++) {
                let group_cameras = [];
                let ips = '';
                for (let j = 0; j < cameras; j++) {
                    let index = i * cameras + j;
                    if (this.group_editor.cameras_all && this.group_editor.cameras_all.length > 0 && index < this.group_editor.cameras_all.length) {
                        let id_group = 0;
                        let id_camera = this.group_editor.cameras_all[index].id;
                        let order = i + 1;
                        let group_camera = {
                            id_group: id_group,
                            id_camera: id_camera,
                            order: order,
                            camera: this.group_editor.cameras_all[index],
                        };
                        group_cameras.push(group_camera);
                        if (0 == j) {
                            ips = ips + this.group_editor.cameras_all[index].ip;
                        } else {
                            ips = ips + ',' + this.group_editor.cameras_all[index].ip;
                        }
                    }
                }
                let name = `第${i + 1}组`;
                let group = {
                    id: 0,
                    name: name,
                    edit: false,
                    checkbox: false,
                    available: [],
                    list: [],
                    ips: ips,
                    cameras: group_cameras,
                    idRoom: id_room,
                    describe: '',
                    type: 2
                };
                list.push(group);
            }
            this.group_editor.list.splice(0, 0, ...list);
            //console.log(this.group_editor.list);
        },

        /**
         * 删除小组
         * @param index
         */
        roomGroupDelete(index) {
            let camera = this.group_editor.list[index];
            this.$confirm(`确认要删除小组-->${camera.name}?`, '提示', {
                confirmButtonText: '删除',
                cancelButtonText: '取消',
                type: 'message'
            }).then(() => {
                let cms = camera.cameras;
                if (cms && cms.length > 0) {
                    for (let i = 0; i < cms.length; i++) {
                        this.group_editor.cameras.push(cms[i].camera);
                    }
                }
                //console.log('>>>', this.group_editor.cameras);
                this.group_editor.list.splice(index, 1);
            }).catch(ex => {
            });
        },

        /**
         * 删除所有所有选中的小组
         */
        roomAllGroupDelete() {
            let group = this.group_editor.list.filter(g => g.checkbox);
            if (!group || 0 == group.length) {
                this.$message({type: 'error', message: '选择要删除的小组'});
                return;
            }
            this.$confirm(`确认要删除选择的小组?`, '提示', {
                confirmButtonText: '删除',
                cancelButtonText: '取消',
                type: 'message'
            }).then(() => {
                let list = [];
                for (let i = 0; i < this.group_editor.list.length; i++) {
                    let name = this.group_editor.list[i].name;
                    let names = group.filter(g => g.name == name);
                    if (!(names && names.length > 0)) {
                        list.push(this.group_editor.list[i]);
                    } else {

                        let cms = this.group_editor.list[i].cameras;
                        if (cms && cms.length > 0) {
                            for (let i = 0; i < cms.length; i++) {
                                this.group_editor.cameras.push(cms[i].camera);
                            }
                        }

                    }
                }
                this.group_editor.list = list;
            }).catch(ex => {
            });
        },

        /**
         * 小组摄像机选择数据初始化
         * @param evt
         */
        groupCameraSelectData(index, evt) {
            let group = this.group_editor.list[index];
            let title = `选择--${group.name}--摄像机`;
            this.group_editor.group_camera_title = title;
            let available = [];
            if (group.cameras && group.cameras.length > 0) {
                for (let i = 0; i < group.cameras.length; i++) {
                    let cm = {
                        id: group.cameras[i].camera.id,
                        ip: group.cameras[i].camera.ip,
                        state: group.cameras[i].camera.state,
                        title: 1 == group.cameras[i].camera.state ? '正常' : '禁用',
                        select: true
                    }
                    available.push(cm);
                }
            }
            if (this.group_editor.cameras && this.group_editor.cameras.length > 0) {
                for (let i = 0; i < this.group_editor.cameras.length; i++) {
                    let cm = {
                        id: this.group_editor.cameras[i].id,
                        ip: this.group_editor.cameras[i].ip,
                        state: this.group_editor.cameras[i].state,
                        title: 1 == this.group_editor.cameras[i].state ? '正常' : '禁用',
                        select: false
                    }
                    available.push(cm);
                }
            }
            this.group_editor.list[index].available = available;
        },

        /**
         * 小组摄像机选择完成
         * @param index
         * @param evt
         */
        groupCameraSelectFinish(index, evt) {
            console.log('选择结果：', this.group_editor.list[index].list);
            console.log('小组摄像机', this.group_editor.list[index].cameras);
            console.log('教室摄像机', this.group_editor.cameras_all);
            console.log('可以摄像机', this.group_editor.cameras);
            let release = [];//从小组摄像机列表释放的摄像机
            //将小组原来的摄像机列表中没有被选中的摄像机放到释放列表
            if (this.group_editor.list[index].cameras && this.group_editor.list[index].cameras.length > 0) {
                for (let i = 0; i < this.group_editor.list[index].cameras.length; i++) {
                    let ip = this.group_editor.list[index].cameras[i].camera.ip;
                    //console.log(ip);
                    let ips = this.group_editor.list[index].list.filter(s => s.ip === ip);
                    if (!(ips && ips.length > 0)) {
                        let camera = this.group_editor.cameras_all.find(r => r.ip === ip);
                        release.push(camera);
                    }
                }
            }
            //将可用摄像机列表中没有被选中的摄像机放到释放列表
            if (this.group_editor.cameras && this.group_editor.cameras.length > 0) {
                for (let i = 0; i < this.group_editor.cameras.length; i++) {
                    let ip = this.group_editor.cameras[i].ip;
                    let ips = this.group_editor.list[index].list.filter(s => s.ip === ip);
                    if (!(ips && ips.length > 0)) {
                        let camera = this.group_editor.cameras_all.find(r => r.ip === ip);
                        release.push(camera);
                    }
                }
            }

            //更新选择的摄像机到小组摄像机列表
            let group_camera = [];
            let ips = '';
            if (this.group_editor.list[index].list && this.group_editor.list[index].list.length > 0) {
                let group = this.group_editor.list[index];
                let order = 0;
                for (let i = 0; i < this.group_editor.list[index].list.length; i++) {
                    let ip = this.group_editor.list[index].list[i].ip;
                    if (0 == i) {
                        ips = ips + ip;
                    } else {
                        ips = ips + ',' + ip;
                    }
                    let original = this.group_editor.cameras_all.find(o => o.ip === ip);
                    order++;
                    let camera = {
                        id_group: group.id,
                        id_camera: original.id,
                        order: order,
                        camera: original,
                    };
                    group_camera.push(camera);
                }
            }
            this.group_editor.list[index].cameras = group_camera;

            //更新摄像机到可用摄像机列表
            let available = [];
            if (release && release.length > 0) {
                for (let i = 0; i < release.length; i++) {
                    let camera = {
                        id: release[i].id,
                        ip: release[i].ip,
                        state: release[i].state,
                        title: release[i].state ? '正常' : '禁用',
                        select: true
                    }
                    available.push(camera);
                }
            }
            this.group_editor.cameras = available;

            //准备更新选择结果UI
            this.group_editor.list[index].ips = ips;

            console.log('新的可用摄像机', release);
        },

        /**
         * 选中行
         * @param index
         * @param evt
         */
        groupCameraSelectRow(index, evt) {
            //console.log(this.group_editor.list[index].available);
            this.$nextTick(() => {
                if (this.group_editor.list[index].available && this.group_editor.list[index].available.length > 0) {
                    for (let i = 0; i < this.group_editor.list[index].available.length; i++) {
                        if (this.group_editor.list[index].available[i].select) {
                            let id_row = `ips_${index}`;
                            this.$refs[id_row][0].toggleRowSelection(this.group_editor.list[index].available[i], true);
                        }
                    }
                }
            });
        },

        /**
         * 处理选择结果
         * @param index
         * @param val
         */
        groupCameraSelectChange(index, val) {
            //console.log(index, '---', val);
            this.group_editor.list[index].list = val;
        },

        /**
         * 判断摄像机IP是否已经分配到小组
         * @param ip
         */
        camera_exist_group(ip) {
            if (this.group_editor.list && this.group_editor.list.length > 0) {
                for (let i = 0; i < this.group_editor.list.length; i++) {
                    //console.log(ip, '----', this.group_editor.list[i].cameras);
                    if (this.group_editor.list[i].cameras && this.group_editor.list[i].cameras.length > 0) {
                        /*
                        for (let j = 0; j < this.group_editor.list[i].cameras.length; j++) {
                            if (ip == this.group_editor.list[i].cameras[j].camera.ip) {
                                return true;
                            }
                        }
                        */
                        let list = this.group_editor.list[i].cameras.filter(c => c.camera.ip == ip);
                        if (list && list.length > 0) {
                            return true;
                        }
                    }
                }
            }
            return false;
        },

        /**
         * 摄像机转换
         */
        group_camera_list() {
            if (this.group_editor.list && this.group_editor.list.length > 0) {
                for (let i = 0; i < this.group_editor.list.length; i++) {
                    let cameras = '';
                    if (this.group_editor.list[i].cameras && this.group_editor.list[i].cameras.length > 0) {
                        for (let j = 0; j < this.group_editor.list[i].cameras.length; j++) {
                            if (0 == j) {
                                cameras = cameras + this.group_editor.list[i].cameras[j].camera.ip;
                            } else {
                                cameras = cameras + ',' + this.group_editor.list[i].cameras[j].camera.ip;
                            }
                        }
                    }
                    this.group_editor.list[i].ips = cameras;
                }
            }
        },

        /**
         * 批量保存小组
         */
        batchSaveRoomGroup() {
            let id_room = this.group_editor.id_room;
            let list = [];
            for (let i = 0; i < this.group_editor.list.length; i++) {
                let item = {
                    id: this.group_editor.list[i].id,
                    name: this.group_editor.list[i].name,
                    type: this.group_editor.list[i].type,
                    idRoom: this.group_editor.list[i].idRoom,
                    describe: this.group_editor.list[i].describe,
                };
                let cameras = [];
                if (this.group_editor.list[i].ips && this.group_editor.list[i].ips.trim().length > 0) {
                    let camera_list = this.group_editor.list[i].ips.split(',');
                    if (camera_list && camera_list.length > 0) {
                        for (let j = 0; j < camera_list.length; j++) {
                            let ip = camera_list[j].trim();
                            let camera = this.group_editor.cameras_all.find(cm => cm.ip.trim() === ip);
                            if (camera && camera.id && camera.id > 0) {
                                let item_order = j + 1;
                                let item_camera = {
                                    id_group: this.group_editor.list[i].id,
                                    id_camera: camera.id,
                                    order: item_order,
                                    camera: camera
                                };
                                cameras.push(item_camera);
                            }
                        }
                    }
                }
                item.cameras = cameras;
                list.push(item);
            }
            let data = {
                idRoom: id_room,
                groups: list
            };
            console.log(data);
            let result = saveGroup(data);
            result.then(r => {
                console.log(r);
                this.camera_editor.open = false;
                this.$message({type: 'success', message: `保存教室小组成功`});
            }).catch(e => {
                console.log(e);
                this.$message({type: 'error', message: `保存教室小组异常--${JSON.stringify(e)}`});
            }).finally();
        },

        //#endregion

        //#region 吊顶坐位编辑器
        /**
         * 打开坐位管理
         */
        editor_admin_seat_top_open() {
            let cameras = roomCameras(this.admin_seat_top_editor.id_room);
            cameras.then(m => {
                //console.log('ips-->', m);
                this.admin_seat_top_editor.room_camera = m;
                let seats = roomSeats(this.admin_seat_top_editor.id_room);
                seats.then(s => {
                    this.admin_seat_top_editor.list = s;
                    let c = this.admin_seat_top_editor.list.length;
                    if (this.admin_seat_top_editor.list.length < this.admin_seat_top_editor.room.seats) {
                        let qty = this.admin_seat_top_editor.room.seats - this.admin_seat_top_editor.list.length;
                        for (let i = 0; i < qty; i++) {
                            let name = i + 1 + c;
                            let seat = {
                                id: 0,
                                name: name.toString(),
                                type: 1,
                                id_state: 1,
                                state: '正常',
                                id_group: 0,
                                name_group: '',
                                index: 0,
                                id_camera: 0,
                                name_camera: '',
                                preset: 1,
                            };
                            this.admin_seat_top_editor.list.push(seat);
                        }
                    }
                    let row = 0;
                    let col = 0;
                    for (let i = 0; i < this.admin_seat_top_editor.list.length; i++) {
                        if (0 == i % this.admin_seat_top_editor.room.cols) {
                            row = row + 1;
                            col = 0;
                        }
                        col = col + 1;
                        this.admin_seat_top_editor.list[i].row = row;
                        this.admin_seat_top_editor.list[i].col = col;
                        this.admin_seat_top_editor.list[i].checkbox = false;
                        this.admin_seat_top_editor.list[i].showcheckbox = false;
                        this.admin_seat_top_editor.list[i].tabs_active_name = 'camera';
                        this.admin_seat_top_editor.list[i].selected = false;
                    }
                    this.admin_seat_top_editor.seat_show_width = this.admin_seat_top_editor.seat_width - this.admin_seat_top_editor.seat_show_split * 2;
                    this.admin_seat_top_editor.seat_show_height = this.admin_seat_top_editor.seat_heught - this.admin_seat_top_editor.seat_show_split * 2;
                    this.admin_seat_top_editor.seat_cols = this.admin_seat_top_editor.room.cols;
                    this.admin_seat_top_editor.seat_box_width = this.admin_seat_top_editor.chair_width > this.admin_seat_top_editor.seat_width ? this.admin_seat_top_editor.chair_width : this.admin_seat_top_editor.seat_width;
                    this.admin_seat_top_editor.seat_box_height = this.admin_seat_top_editor.chair_height + this.admin_seat_top_editor.seat_split + this.admin_seat_top_editor.seat_heught;
                    this.admin_seat_top_editor.seat_container_width = this.admin_seat_top_editor.seat_box_width * this.admin_seat_top_editor.seat_cols;
                    let rows = Math.floor(this.admin_seat_top_editor.room.seats / this.admin_seat_top_editor.seat_cols);
                    if (0 != this.admin_seat_top_editor.room.seats % this.admin_seat_top_editor.seat_cols) {
                        rows = rows + 1;
                    }
                    this.admin_seat_top_editor.seat_rows = rows;
                    this.admin_seat_top_editor.rostrum_width = Math.floor(this.admin_seat_top_editor.seat_container_width * 0.6);
                    this.admin_seat_top_editor.seat_container_height = this.admin_seat_top_editor.seat_container_top + this.admin_seat_top_editor.rostrum_height + this.admin_seat_top_editor.rostrum_split + (this.admin_seat_top_editor.seat_box_height * this.admin_seat_top_editor.seat_rows) + this.admin_seat_top_editor.seat_container_bottom;
                    this.admin_seat_top_editor.chair_margin_left = Math.floor((this.admin_seat_top_editor.seat_box_width - this.admin_seat_top_editor.chair_width) / 2)
                }).catch(ex => {
                    console.log('读取教室坐位-->', ex);
                }).finally();
            }).catch(ex => {
                console.log('读取教室摄像机-->', ex);
            }).finally();
        },

        /**
         * 复选框选择
         * @param evt
         */
        admin_seat_top_item(evt) {
            let index = parseInt(evt.currentTarget.dataset.index);
            //console.log(this.admin_seat_top_editor.list);
            //console.log(index);
        },

        /**
         * 显示/隐藏 复选款
         * @param evt
         */
        admin_seat_top_item_toggle(evt) {
            let index = parseInt(evt.currentTarget.dataset.index);
            this.admin_seat_top_editor.list[index].showcheckbox = !this.admin_seat_top_editor.list[index].showcheckbox;
        },

        /**
         * 关闭坐位管理
         */
        close_admin_seat_top_editor() {
            this.$confirm('即将关闭教室教师编辑器?', '提示', {
                confirmButtonText: '关闭',
                cancelButtonText: '取消',
                type: 'message'
            }).then(() => {
                this.admin_seat_top_editor.open = false;
            }).catch(ex => {
            });
        },

        /**
         * 容器鼠标按下
         */
        admin_seat_top_mouse_down(evt) {
            this.admin_seat_top_editor.box_select = true;
            this.admin_seat_top_editor.seat_top_rect = document.createElement("div");
            this.admin_seat_top_editor.seat_top_rect.id = this.admin_seat_top_editor.seat_top_rect_id;
            this.admin_seat_top_editor.seat_top_rect.style.cssText = "position:absolute;width:0px;height:0px;font-size:0px;margin:0px;padding:0px;border:1px dashed #0099ff;background-color:#c3d5ed;z-index:10000;filter:alpha(opacity:60);opacity:0.6;";
            this.admin_seat_top_editor.seat_top_rect_left = evt.x || evt.clientX;
            this.admin_seat_top_editor.seat_top_rect_top = evt.y || evt.clientY;
            this.admin_seat_top_editor.seat_top_rect.style.left = this.admin_seat_top_editor.seat_top_rect_left + "px";
            this.admin_seat_top_editor.seat_top_rect.style.top = this.admin_seat_top_editor.seat_top_rect_top + "px";
            document.body.appendChild(this.admin_seat_top_editor.seat_top_rect);
        },

        /**
         * 容器鼠标移动
         */
        admin_seat_top_mouse_move(evt) {
            if (!this.admin_seat_top_editor.box_select) {
                return;
            }
            let mouseX2 = evt.clientX;
            let mouseY2 = evt.clientY;
            this.admin_seat_top_editor.seat_top_rect.style.left = Math.min(mouseX2, this.admin_seat_top_editor.seat_top_rect_left) + "px";
            this.admin_seat_top_editor.seat_top_rect.style.top = Math.min(mouseY2, this.admin_seat_top_editor.seat_top_rect_top) + "px";
            this.admin_seat_top_editor.seat_top_rect.style.width = Math.abs(mouseX2 - this.admin_seat_top_editor.seat_top_rect_left - 2) + "px";
            this.admin_seat_top_editor.seat_top_rect.style.height = Math.abs(mouseY2 - this.admin_seat_top_editor.seat_top_rect_top - 2) + "px";
        },

        /**
         * 鼠标释放
         * @param evt
         */
        admin_seat_top_mouse_up(evt) {
            this.admin_seat_top_editor.box_select = false;
            let item_class = 'seat_item_box';
            let seats = document.getElementsByClassName(item_class);
            let select_pos = this.admin_seat_top_editor.seat_top_rect.getBoundingClientRect();
            let box_x1 = select_pos.x;
            let box_y1 = select_pos.y;
            let box_x2 = select_pos.right;
            let box_y2 = select_pos.bottom;
            for (let i = 0; i < seats.length; i++) {
                let select_index = seats[i].dataset.index;
                let seat_pos = seats[i].getBoundingClientRect();
                let seat_x1 = seat_pos.x;
                let seat_y1 = seat_pos.y;
                let seat_x2 = seat_pos.right;
                let seat_y2 = seat_pos.bottom;
                if (((seat_x1 >= box_x1 && seat_x1 <= box_x2) && (seat_y1 >= box_y1 && seat_y1 <= box_y2))
                    || ((seat_x2 >= box_x1 && seat_x2 <= box_x2) && (seat_y1 >= box_y1 && seat_y1 <= box_y2))
                    || ((seat_x1 >= box_x1 && seat_x1 <= box_x2) && (seat_y2 >= box_y1 && seat_y2 <= box_y2))
                    || ((seat_x2 >= box_x1 && seat_x2 <= box_x2) && (seat_y2 >= box_y1 && seat_y2 <= box_y2))) {
                    this.admin_seat_top_editor.list[i].showcheckbox = true;
                    this.admin_seat_top_editor.list[i].checkbox = true;
                }
            }
            let box_select = document.getElementById(this.admin_seat_top_editor.seat_top_rect_id);
            box_select.remove();
        },

        /**
         * 选择/取消选择
         */
        select_all_list_seat() {
            /**
             * 全选
             * */
            if ('icon-duoxuankuang1' == this.admin_seat_top_editor.select_seat_all_icon) {
                this.admin_seat_top_editor.select_seat_all_icon = 'icon-mulu1';
                this.admin_seat_top_editor.select_seat_all = '取消';
                for (let i = 0; i < this.admin_seat_top_editor.list.length; i++) {
                    this.admin_seat_top_editor.list[i].checkbox = true;
                    this.admin_seat_top_editor.list[i].showcheckbox = true;
                }
            } else {
                this.admin_seat_top_editor.select_seat_all_icon = 'icon-duoxuankuang1';
                this.admin_seat_top_editor.select_seat_all = '全选';
                for (let i = 0; i < this.admin_seat_top_editor.list.length; i++) {
                    this.admin_seat_top_editor.list[i].checkbox = false;
                    this.admin_seat_top_editor.list[i].showcheckbox = false;
                }
            }
        },

        /**
         * 坐位设置框显示
         * @param index
         */
        admin_seat_top_set_show(index) {
            //let index = parseInt(evt.currentTarget.dataset.index);
            this.admin_seat_top_editor.list[index].selected = true;
        },

        /**
         * 坐位设置框隐藏
         * @param index
         */
        admin_seat_top_set_hide(index) {
            //let index = parseInt(evt.currentTarget.dataset.index);
            this.admin_seat_top_editor.list[index].selected = false;
        },

        /**
         * 坐位选择摄像机
         * @param cmi
         * @param prti
         * @param evt
         */
        admin_seat_top_select_camera_result(index, cmi, prti, evt) {
            let camera = this.admin_seat_top_editor.room_camera[cmi];
            if (this.admin_seat_top_editor.list && this.admin_seat_top_editor.list.length > 0) {
                for (let i = 0; i < this.admin_seat_top_editor.list.length; i++) {
                    if (i == index) {
                        continue;
                    }
                    if (camera.ip == this.admin_seat_top_editor.list[i].name_camera && prti == this.admin_seat_top_editor.list[i].preset) {
                        let msg = `摄像机(${camera.ip}/${prti})，已经由(${i + 1}使用)`;
                        this.$message({type: 'error', message: msg});
                        return;
                    }
                }
            }
            this.admin_seat_top_editor.list[index].id_camera = camera.id;
            this.admin_seat_top_editor.list[index].name_camera = camera.ip;
            this.admin_seat_top_editor.list[index].preset = prti;
            //console.log(camera, prti);

        },

        /**
         * 选择坐位摄像机
         * @param evt
         */
        admin_seat_top_select_camera(evt) {
            let index = parseInt(evt.currentTarget.dataset.index);
            let group = parseInt(evt.currentTarget.dataset.group);
            let camera = parseInt(evt.currentTarget.dataset.camera);
            //console.log(index, group, camera);
            let group_item = this.admin_seat_top_editor.room_group[group];
            let camera_item = group_item.cameras[camera];
            //console.log(group_item);
            this.admin_seat_top_editor.list[index].id_group = group_item.id;
            this.admin_seat_top_editor.list[index].name_group = group_item.name;
            this.admin_seat_top_editor.list[index].id_camera = camera_item.camera.id;
            this.admin_seat_top_editor.list[index].name_camera = camera_item.camera.ip;
        },

        /**
         * 设置坐位状态
         * @param evt
         */
        admin_seat_top_set_state(evt) {
            let index = parseInt(evt.currentTarget.dataset.index);
            this.admin_seat_top_editor.list[index].id_state = 1 == this.admin_seat_top_editor.list[index].id_state ? 2 : 1;
            this.admin_seat_top_editor.list[index].state = 1 == this.admin_seat_top_editor.list[index].id_state ? '禁用' : '正常';
        },

        /**
         * 设置预置位
         * @param index
         * @param evt
         */
        admin_seat_top_set_preset(index, evt) {
            console.log(index, evt);
            let ip = this.admin_seat_top_editor.list[index].name_camera;
            if (!isIPv4(ip)) {
                this.$message({type: 'error', message: '坐位摄像机IP无效'});
                this.admin_seat_top_editor.list[index].preset = 0;
                return;
            }
            if (!isInteger(evt)) {
                this.$message({type: 'error', message: '输入有效的摄像机(' + ip + ')预置位'});
                this.admin_seat_top_editor.list[index].preset = 0;
                return
            }
            for (let i = 0; i < this.admin_seat_top_editor.list.length; i++) {
                if (i == index) {
                    continue;
                }
                if (ip != this.admin_seat_top_editor.list[i].name_camera) {
                    continue;
                }
                if (ip == this.admin_seat_top_editor.list[i].name_camera && parseInt(evt) == this.admin_seat_top_editor.list[i].preset) {
                    this.$message({type: 'error', message: `摄像机(${ip})--预置位(${evt})--已经分配给坐位(${(i + 1)})`});
                    this.admin_seat_top_editor.list[index].preset = 0;
                    return
                }
            }
        },

        /**
         * 保存教室坐位
         */
        batchSaveAdminTopRoomSeat() {
            let seat = {
                idRoom: this.admin_seat_top_editor.id_room,
                seats: []
            };
            if (!(this.admin_seat_top_editor.list && this.admin_seat_top_editor.list.length > 0)) {
                this.$message({type: 'error', message: '没有找到教室坐位'});
                return;
            }
            //console.log(this.admin_seat_top_editor.list);
            for (let i = 0; i < this.admin_seat_top_editor.list.length; i++) {
                let id = parseInt(this.admin_seat_top_editor.list[i].id);
                let name = this.admin_seat_top_editor.list[i].name;
                let row = parseInt(this.admin_seat_top_editor.list[i].row);
                let col = parseInt(this.admin_seat_top_editor.list[i].col);
                let type = parseInt(this.admin_seat_top_editor.list[i].type);
                let ip = this.admin_seat_top_editor.list[i].name_camera.trim();
                let state = parseInt(this.admin_seat_top_editor.list[i].id_state);
                if (!(ip && ip.length > 0) && 1 == state) {
                    this.$message({type: 'error', message: `请为坐位(${i + 1})指定摄像机IP地址`});
                    return;
                }
                let id_group = parseInt(this.admin_seat_top_editor.list[i].id_group);
                let index = parseInt(this.admin_seat_top_editor.list[i].index);
                let id_camera = parseInt(this.admin_seat_top_editor.list[i].id_camera);
                let preset = parseInt(this.admin_seat_top_editor.list[i].preset);
                let s = {
                    id: id,
                    name: name,
                    row: row,
                    col: col,
                    type: type,
                    ip: ip,
                    state: state,
                    id_group: id_group,
                    index: index,
                    id_camera: id_camera,
                    preset: preset
                }
                seat.seats.push(s);
            }
            //console.log(seat);
            //return;
            let result = saveSeat(seat);
            result.then(r => {
                console.log(r);
                this.admin_seat_top_editor.open = false;
                this.$message({type: 'success', message: `保存教室坐位成功`});
            }).catch(e => {
                console.log(e);
                this.$message({type: 'error', message: `保存教室坐位异常--${JSON.stringify(e)}`});
            }).finally();
        },

        /**
         * 批量处理教室坐位
         */
        batchAddRoomSeat() {
            let msg = '';
            /*
            if (!(this.admin_seat_top_editor.seat_camera && isInteger(this.admin_seat_top_editor.seat_camera) && this.admin_seat_top_editor.seat_camera > 0)) {
                msg = '录入正确的每个摄像头负责的坐位数量';
                this.$message({type: 'error', message: msg});
                return
            }
            */
            if (!(this.admin_seat_top_editor.camera_presets && isInteger(this.admin_seat_top_editor.camera_presets) && this.admin_seat_top_editor.camera_presets > 0)) {
                msg = '录入摄像头正确的预置位数量';
                this.$message({type: 'error', message: msg});
                return
            }
            if (!(this.admin_seat_top_editor.list && this.admin_seat_top_editor.list.length > 0)) {
                msg = '教室坐位无效';
                this.$message({type: 'error', message: msg});
                return
            }
            if (!(this.admin_seat_top_editor.room_camera && this.admin_seat_top_editor.room_camera.length > 0)) {
                msg = '教室摄像机无效';
                this.$message({type: 'error', message: msg});
                return
            }
            let cameras = this.admin_seat_top_editor.room_camera.length;
            //let camera_seats = this.admin_seat_top_editor.seat_camera;
            let presets = this.admin_seat_top_editor.camera_presets;
            let seats = this.admin_seat_top_editor.list.length;
            let index = 0;
            for (let i = 0; i < seats; i++) {
                this.admin_seat_top_editor.list[i].id_camera = 0;
                this.admin_seat_top_editor.list[i].name_camera = '';
                this.admin_seat_top_editor.list[i].preset = 0;
            }
            let p = 0;
            for (let i = 0; i < cameras; i++) {
                for (let j = 0; j < presets; j++) {
                    if (index >= seats) {
                        return;
                    }
                    if (1 == this.admin_seat_top_editor.list[index].id_state) {
                        if (0 == p % presets) {
                            p = 0;
                        }
                        this.admin_seat_top_editor.list[index].id_camera = this.admin_seat_top_editor.room_camera[i].id;
                        this.admin_seat_top_editor.list[index].name_camera = this.admin_seat_top_editor.room_camera[i].ip;
                        this.admin_seat_top_editor.list[index].preset = p;
                        p++;
                    }
                    index += 1;
                }
            }
            /*
            for (let i = 0; i < cameras; i++) {
                for (let j = 0; j < camera_seats; j++) {
                    for (let k = 0; k < presets; k++) {
                        if (index >= seats) {
                            return;
                        }
                        this.admin_seat_top_editor.list[index].id_camera = this.admin_seat_top_editor.room_camera[i].id;
                        this.admin_seat_top_editor.list[index].name_camera = this.admin_seat_top_editor.room_camera[i].ip;
                        this.admin_seat_top_editor.list[index].preset = k;
                        index += 1;

                    }
                }
            }
            */
            /*
            for (let i = 0; i < camera_seats; i++) {
                for (let j = 0; j < presets; j++) {
                    let index = i * j + j;
                    if (index < seats) {
                        console.log(i, '--', this.admin_seat_top_editor.seat_camera[i]);
                        this.admin_seat_top_editor.list[index].id_camera = this.admin_seat_top_editor.seat_camera[i].id;
                        this.admin_seat_top_editor.list[index].name_camera = this.admin_seat_top_editor.seat_camera[i].ip;
                        this.admin_seat_top_editor.list[index].preset = j;
                    }
                }
            }
            */
        },

        /**
         * 禁用选择的教室坐位
         */
        admin_seat_top_select_disabled() {
            for (let i = 0; i < this.admin_seat_top_editor.list.length; i++) {
                if (this.admin_seat_top_editor.list[i].checkbox) {
                    this.admin_seat_top_editor.list[i].id_state = 2;
                }
            }
        },

        /**
         * 启用选择的教室坐位
         */
        admin_seat_top_select_enabled() {
            for (let i = 0; i < this.admin_seat_top_editor.list.length; i++) {
                if (this.admin_seat_top_editor.list[i].checkbox) {
                    this.admin_seat_top_editor.list[i].id_state = 1;
                }
            }
        },
        //#endregion

        //#region 坐位摄像机编辑器
        editor_admin_seat_sit_open() {
            let seats = roomSeats(this.admin_seat_sit_editor.id_room);
            seats.then(s => {
                this.admin_seat_sit_editor.list = s;
                let c = this.admin_seat_sit_editor.list.length;
                if (this.admin_seat_sit_editor.list.length < this.admin_seat_sit_editor.room.seats) {
                    let qty = this.admin_seat_sit_editor.room.seats - this.admin_seat_sit_editor.list.length;
                    for (let i = 0; i < qty; i++) {
                        let name = i + 1 + c;
                        let seat = {
                            id: 0,
                            name: name.toString(),
                            type: 1,
                            id_state: 1,
                            state: '正常',
                            index: 0,
                            ip: '',
                            preset: 1,
                        };
                        this.admin_seat_sit_editor.list.push(seat);
                    }
                }
                this.admin_seat_sit_editor.seat_cols = this.admin_seat_sit_editor.room.cols;
                let rows = Math.floor(this.admin_seat_sit_editor.room.seats / this.admin_seat_sit_editor.seat_cols);
                if (0 != this.admin_seat_sit_editor.room.seats % this.admin_seat_sit_editor.seat_cols) {
                    rows = rows + 1;
                }
                this.admin_seat_sit_editor.seat_rows = rows;
                this.admin_seat_sit_editor.seat_box_width = this.admin_seat_sit_editor.component_padding * 2 + this.admin_seat_sit_editor.seat_width;
                this.admin_seat_sit_editor.seat_box_height = this.admin_seat_sit_editor.component_padding * 2 + this.admin_seat_sit_editor.seat_height + this.admin_seat_sit_editor.inner_margin + this.admin_seat_sit_editor.chair_height;
                this.admin_seat_sit_editor.container_width = this.admin_seat_sit_editor.seat_box_width * this.admin_seat_sit_editor.seat_cols;
                this.admin_seat_sit_editor.rostrum_width = Math.floor(this.admin_seat_sit_editor.container_width * 0.6);
                this.admin_seat_sit_editor.container_height = this.admin_seat_sit_editor.seat_box_height * this.admin_seat_sit_editor.seat_rows + this.admin_seat_sit_editor.rostrum_height + this.admin_seat_sit_editor.rostrum_split + this.admin_seat_sit_editor.rostrum_top + this.admin_seat_sit_editor.seat_top;
                this.admin_seat_sit_editor.chair_margin_left = Math.floor((this.admin_seat_sit_editor.seat_box_width - this.admin_seat_sit_editor.chair_width) / 2)
                let row = 0;
                let col = 0;
                for (let i = 0; i < this.admin_seat_sit_editor.list.length; i++) {
                    if (0 == i % this.admin_seat_sit_editor.room.cols) {
                        row = row + 1;
                        col = 0;
                    }
                    col = col + 1;
                    this.admin_seat_sit_editor.list[i].row = row;
                    this.admin_seat_sit_editor.list[i].col = col;
                    this.admin_seat_sit_editor.list[i].checkbox = false;
                    this.admin_seat_sit_editor.list[i].showcheckbox = false;
                    this.admin_seat_sit_editor.list[i].selected = false;
                }
                //console.log('data-->', this.admin_seat_sit_editor.list);
            }).catch(ex => {
                console.log('读取教室坐位-->', ex);
            }).finally();
        },

        /**
         * 选择切换
         * @param evt
         */
        admin_seat_sit_item_toggle(evt) {
            let index = parseInt(evt.currentTarget.dataset.index);
            this.admin_seat_sit_editor.list[index].showcheckbox = !this.admin_seat_sit_editor.list[index].showcheckbox;
        },

        /**
         * 复选框选择
         * @param evt
         */
        admin_seat_sit_item(evt) {
            let index = parseInt(evt.currentTarget.dataset.index);
        },

        /**
         * 选择/取消选择
         */
        admin_seat_sit_select_all() {
            /**
             * 全选
             * */
            if ('icon-duoxuankuang1' == this.admin_seat_sit_editor.select_seat_all_icon) {
                this.admin_seat_sit_editor.select_seat_all_icon = 'icon-mulu1';
                this.admin_seat_sit_editor.select_seat_all = '取消';
                for (let i = 0; i < this.admin_seat_sit_editor.list.length; i++) {
                    this.admin_seat_sit_editor.list[i].checkbox = true;
                    this.admin_seat_sit_editor.list[i].showcheckbox = true;
                }
            } else {
                this.admin_seat_sit_editor.select_seat_all_icon = 'icon-duoxuankuang1';
                this.admin_seat_sit_editor.select_seat_all = '全选';
                for (let i = 0; i < this.admin_seat_sit_editor.list.length; i++) {
                    this.admin_seat_sit_editor.list[i].checkbox = false;
                    this.admin_seat_sit_editor.list[i].showcheckbox = false;
                }
            }
        },

        /**
         * 关闭坐位管理
         */
        close_admin_seat_sit_editor() {
            this.$confirm('即将关闭教室坐位编辑器?', '提示', {
                confirmButtonText: '关闭',
                cancelButtonText: '取消',
                type: 'message'
            }).then(() => {
                this.admin_seat_sit_editor.open = false;
            }).catch(ex => {
            });
        },

        /**
         * 批量分配IP
         */
        admin_seat_sit_batch_allocate_ip() {
            let start = this.admin_seat_sit_editor.start.trim();
            let qty = this.admin_seat_sit_editor.list.length;
            if (!isIPv4(start)) {
                this.$message({type: 'error', message: `开始IP地址-->${start}，无效`});
                return;
            }
            if (qty <= 0) {
                this.$message({type: 'error', message: `教室坐位数量，无效`});
                return;
            }
            let ips = start.split('.');
            let ip = parseInt(ips[3]);
            if (ip + qty > 255) {
                this.$message({type: 'error', message: `开始IP地址过大`});
                return;
            }
            for (let i = 0; i < qty; i++) {
                this.admin_seat_sit_editor.list[i].ip = '';
                if (1 == this.admin_seat_sit_editor.list[i].id_state) {
                    let sip = `${ips[0]}.${ips[1]}.${ips[2]}.${ip}`;
                    this.admin_seat_sit_editor.list[i].ip = sip;
                    ip++;
                }
            }
        },

        /**
         * 保存坐位
         */
        admin_seat_sit_save() {
            let seat = {
                idRoom: this.admin_seat_sit_editor.id_room,
                seats: []
            };
            if (!(this.admin_seat_sit_editor.list && this.admin_seat_sit_editor.list.length > 0)) {
                this.$message({type: 'error', message: '没有找到教室坐位'});
                return;
            }
            //console.log(this.admin_seat_sit_editor.list);
            for (let i = 0; i < this.admin_seat_sit_editor.list.length; i++) {
                let id = parseInt(this.admin_seat_sit_editor.list[i].id);
                let name = this.admin_seat_sit_editor.list[i].name;
                let row = parseInt(this.admin_seat_sit_editor.list[i].row);
                let col = parseInt(this.admin_seat_sit_editor.list[i].col);
                let type = parseInt(this.admin_seat_sit_editor.list[i].type);
                let ip = this.admin_seat_sit_editor.list[i].ip.trim();
                if (!(ip && ip.length > 0) && 1 == this.admin_seat_sit_editor.list[i].id_state) {
                    this.$message({type: 'error', message: `请为坐位(${i + 1})指定IP地址`});
                    return;
                }
                let state = parseInt(this.admin_seat_sit_editor.list[i].id_state);
                let id_group = 0;
                let index = 0;
                let id_camera = 0;
                let preset = 0;
                let s = {
                    id: id,
                    name: name,
                    row: row,
                    col: col,
                    type: type,
                    ip: ip,
                    state: state,
                    id_group: id_group,
                    index: index,
                    id_camera: id_camera,
                    preset: preset
                }
                seat.seats.push(s);
            }
            let result = saveSeat(seat);
            result.then(r => {
                console.log(r);
                this.admin_seat_sit_editor.open = false;
                this.$message({type: 'success', message: `保存教室坐位成功`});
            }).catch(e => {
                console.log(e);
                this.$message({type: 'error', message: `保存教室坐位异常--${JSON.stringify(e)}`});
            }).finally();
        },

        /**
         * 禁用选择的教室坐位
         */
        admin_seat_sit_select_disabled() {
            for (let i = 0; i < this.admin_seat_sit_editor.list.length; i++) {
                if (this.admin_seat_sit_editor.list[i].checkbox) {
                    this.admin_seat_sit_editor.list[i].id_state = 2;
                }
            }
        },

        /**
         * 启用选择的教室坐位
         */
        admin_seat_sit_select_enabled() {
            for (let i = 0; i < this.admin_seat_sit_editor.list.length; i++) {
                if (this.admin_seat_sit_editor.list[i].checkbox) {
                    this.admin_seat_sit_editor.list[i].id_state = 1;
                }
            }
        },
        //#endregion
    },
    components: {
        'editor': Editor,
        'organization': organization,
        'seat': seat
    },
    created() {
        //解析登录用户
        let login_user = localStorage.getItem('user') || {};
        this.user = JSON.parse(login_user);
        //读取组织机构数据
        let pm = dashboardParameter();
        pm.then(d => {
            let org = d.organize;
            let organization = processOrganization(org, this.user);
            this.org = organization;
        }).catch(e => {
            console.log(e);
        }).finally();
        //读取教室类型
        let type = roomType();
        type.then(t => {
            this.room_type = t;
        }).catch(e => {

        }).finally();
        //读取教室条目操作菜单
        let menus = roomItemMenu();
        menus.then(m => {
            this.room_list_item_menus = m;
            //console.log(this.room_list_item_menus);
        }).catch(e => {

        }).finally()
        //读取教室列表标题数据
        let room_list = roomList(1);
        room_list.then(l => {
            this.room_list = l;
            this.room_list_title = this.room_list.rows[0].cols;
            for (let i = 0; i < this.room_list_title.length; i++) {
                switch (this.room_list_title[i].align) {
                    case 1:
                        this.room_list_title[i].align_text = 'left';
                        break;
                    case 2:
                        this.room_list_title[i].align_text = 'center';
                        break;
                    case 3:
                        this.room_list_title[i].align_text = 'right';
                        break;
                }
            }
        }).catch(e => {

        }).finally()
        //读取教室摄像机管理标题
        let room_camera_list = roomList(2);
        room_camera_list.then(l => {
            //console.log(l);
            this.camera_editor.titles = l.rows[0].cols;
            //console.log(this.camera_editor.titles);
            for (let i = 0; i < this.camera_editor.titles.length; i++) {
                switch (this.camera_editor.titles[i].align) {
                    case 1:
                        this.camera_editor.titles[i].align_text = 'left';
                        break;
                    case 2:
                        this.camera_editor.titles[i].align_text = 'center';
                        break;
                    case 3:
                        this.camera_editor.titles[i].align_text = 'right';
                        break;
                }
            }
        }).catch(e => {
            console.log('读取教室摄像机管理--列表标题异常-->', e);
        }).finally();
        //读取教室摄像机条目菜单
        let cms = cameraItemMenu();
        cms.then(m => {
            this.camera_editor.menus = m;
        }).catch(e => {
            console.log('读取教室摄像机条目菜单异常-->', e);
        }).finally();
        //初始化摄像机状态
        this.camera_editor.state.push({value: 1, label: '正常'});
        this.camera_editor.state.push({value: 2, label: '禁用'});
        //读取教室小组管理标题
        let room_group_list = roomList(3);
        room_group_list.then(l => {
            this.group_editor.titles = l.rows[0].cols;
            for (let i = 0; i < this.group_editor.titles.length; i++) {
                switch (this.group_editor.titles[i].align) {
                    case 1:
                        this.group_editor.titles[i].align_text = 'left';
                        break;
                    case 2:
                        this.group_editor.titles[i].align_text = 'center';
                        break;
                    case 3:
                        this.group_editor.titles[i].align_text = 'right';
                        break;
                }
            }
        }).catch(e => {
            console.log('读取教室小组管理--列表标题异常-->', e);
        }).finally();
        //读取教室小组条目菜单
        let gms = groupItemMenu();
        gms.then(m => {
            this.group_editor.menus = m;
        }).catch(e => {
            console.log('读取教室小组条目菜单异常-->', e);
        }).finally();
        //暴露方法
        window.save_room = this.save_room;
    },
    mounted() {
        //计算组件高度
        this.$nextTick(() => {
            let app_title = document.querySelector('#app_title');
            let app_title_height = app_title.offsetHeight;
            let room_param = document.querySelector('#room_param');
            let room_param_height = room_param.offsetHeight;
            let room_title = document.querySelector('#room_title');
            let room_title_height = room_title.offsetHeight;
            let head_height = app_title_height + room_param_height + room_title_height + 30;
            this.head_height = head_height;
            //console.log(head_height);
        })
    }
};
let instance = Vue.createApp(app);
instance.use(ElementPlus);
instance.mount('#app');

//#region API调用

/**
 * 获取组织机构列表
 * @returns {Promise<*|string>}
 */
async function dashboardParameter() {
    let result = await getDashboardParameter();
    if (0 != result.result) {
        return;
    }
    let data = result.msg;
    return data;
}

/**
 * 获取房间类型列表
 * @returns {Promise<*|string>}
 */
async function roomType() {
    let result = await getRoomType();
    if (0 != result.result) {
        return;
    }
    let data = result.msg;
    return data;
}

/**
 * 获取房间条目操作菜单
 * @returns {Promise<*|string>}
 */
async function roomItemMenu() {
    let result = await getRoomItemMenu();
    if (0 != result.result) {
        return;
    }
    let data = result.msg;
    return data;
}

/**
 * 获取教室列表对象信息
 * @param id
 * @returns {Promise<*|string>}
 */
async function roomList(id) {
    let result = await getList(id);
    if (0 != result.result) {
        return;
    }
    let data = result.msg;
    return data;
}

/**
 * 获取教室条目列表数据
 * @param city
 * @param zone
 * @param school
 * @param name
 * @param type
 * @returns {Promise<*|string>}
 */
async function roomItemList(city, zone, school, name, type) {
    let result = await getRoomList(city, zone, school, name, type);
    if (0 != result.result) {
        return;
    }
    let data = result.msg;
    return data;
}

/**
 * 删除教室
 * @param rooms
 * @return {Promise<*>}
 */
async function delRoom(rooms) {
    let result = await deleteRooms(rooms);
    if (0 != result.result) {
        return;
    }
    let data = result.msg;
    return data;
}


/**
 * 获取阿里云OSS
 * @returns {Promise<*|string>}
 */
async function aliyunOSS() {
    let result = await getAliyunOSS();
    if (0 != result.result) {
        return;
    }
    let data = result.msg;
    return data;
}

/**
 * 保存教室
 * @param room
 * @returns {Promise<*|string>}
 */
async function saveRoom(room) {
    let result = await roomSave(room);
    if (0 != result.result) {
        return;
    }
    let data = result.msg;
    return data;
}

/**
 * 获取教室信息
 * @param id
 * @returns {Promise<*|string>}
 */
async function roomDetail(id) {
    let result = await getRoomDetail(id);
    if (0 != result.result) {
        return;
    }
    let data = result.msg;
    return data;
}

/**
 * 获取教室摄像机列表
 * @param id
 * @returns {Promise<*|string>}
 */
async function roomCameras(id) {
    let result = await getRoomCameras(id);
    if (0 != result.result) {
        return;
    }
    let data = result.msg;
    return data;
}

/**
 * 获取教室摄像机条目菜单
 * @returns {Promise<*|string>}
 */
async function cameraItemMenu() {
    let result = await getCameraItemMenu();
    if (0 != result.result) {
        return;
    }
    let data = result.msg;
    return data;
}

/**
 * 保存教室摄像机
 * @param room
 * @returns {Promise<*|string>}
 */
async function saveCamera(camera) {
    let result = await roomCameraSave(camera);
    if (0 != result.result) {
        return;
    }
    let data = result.msg;
    return data;
}

/**
 * 获取教室小组条目菜单
 * @returns {Promise<*|string>}
 */
async function groupItemMenu() {
    let result = await getGroupItemMenu();
    if (0 != result.result) {
        return;
    }
    let data = result.msg;
    return data;
}

/**
 * 读取教室小组列表
 * @param id
 * @returns {Promise<*|string>}
 */
async function roomGroups(id) {
    let result = await getRoomGroups(id);
    if (0 != result.result) {
        return;
    }
    let data = result.msg;
    return data;
}

/**
 * 保存教室小组
 * @param group
 * @returns {Promise<*|string>}
 */
async function saveGroup(group) {
    let result = await roomGroupSave(group);
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
    let result = await getRoomSeats(id);
    if (0 != result.result) {
        return;
    }
    let data = result.msg;
    return data;
}

/**
 * 保存教室坐位
 * @param seat
 * @returns {Promise<*|string>}
 */
async function saveSeat(seat) {
    let result = await saveRoomSeat(seat);
    if (0 != result.result) {
        return;
    }
    let data = result.msg;
    return data;
}

//#endregion
//save_room();
