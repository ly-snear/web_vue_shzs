const app = {
    data() {
        return {
            //标题信息
            title: '学校课程表管理',
            //当前登录用户
            user: {},
            //当前用户扩展信息
            user_ext: {},
            //可选班级列表
            list_class: [],
            //可选科目列表
            list_course: [],
            //可选教室列表
            list_room: [],
            //可选教师列表
            list_teacher: [],
            //可选星期
            list_week: [],
            //课程节次
            list_lesson: [],
            //分页数据
            page_course: [],
            //分页数据
            page_data: {
                pages: 2,
                total: 3
            },
            //课程条目菜单
            course_menu: [],
            //课程列表标题
            list_title: [],
            //选择班级提示
            title_class: '选择班级',
            //选择科目提示
            title_course: '选择科目',
            //选择教室提示
            title_room: '选择教室',
            //选择教师提示
            title_teacher: '选择任课教师',
            //选择开始星期日提示
            title_min_week: '开始星期日',
            //选择结束星期日提示
            title_max_week: '结束星期日',
            //选择课程节次
            title_lesson: '课程节次',
            //上课时间
            title_start_time: '上课时间',
            //下课时间
            title_end_time: '下课时间',
            //选择开始时间
            title_start_min: '上课开始时间',
            //选择开始时间
            title_start_max: '上课结束时间',
            //选择开始时间
            title_end_min: '下课开始时间',
            //选择开始时间
            title_end_max: '下课结束时间',
            //选择科目
            title_course: '选择科目',
            //选择的班级
            value_class: '',
            //选择的科目
            value_course: '',
            //选择的教室
            value_room: '',
            //选择的教师
            value_teacher: '',
            //选择的开始星期日
            value_min_week: '',
            //选择的结束星期日
            value_max_week: '',
            //选择的课程节次
            value_lesson: '',
            //上课开始时间
            value_start_min: '',
            //上课结束时间
            value_start_max: '',
            //下课开始时间
            value_end_min: '',
            //下课结束时间
            value_end_max: '',
            //选择的科目
            value_course: '',
            //分页尺寸
            size: 30,
            //分页索引
            page: 1,
            //总的页码
            pages: 0,
            //选择所有标志
            select_all_checkbox: false,
            //除开列表容器外所有控件的高度
            except_height: 0,
            //编辑前课程表--班级
            id_class_old: 0,
            //编辑前课程表--星期
            week_old: 0,
            //编辑前课程表--课次
            lesson_old: 0,
            //课程表编辑器数据
            edit_course: {},
        }
    },
    methods: {
        /**
         * 读取分页数据
         */
        coursePageData() {
            //region 选择的班级
            let id_class = this.value_class;
            if (!isInteger(id_class)) {
                id_class = '0';
            }
            id_class = parseInt(id_class);
            //endregion
            //region 选择的开始星期
            let week_min = this.value_min_week;
            if (!isInteger(week_min)) {
                week_min = '0';
            }
            week_min = parseInt(week_min);
            //endregion
            //region 选择的开始星期
            let week_max = this.value_max_week;
            if (!isInteger(week_max)) {
                week_max = '0';
            }
            week_max = parseInt(week_max);
            //endregion
            //region 选择的课程
            let lesson = this.value_lesson;
            if (!isInteger(lesson)) {
                lesson = '0';
            }
            lesson = parseInt(lesson);
            //endregion
            //region 上课时间.开始
            let start_min = this.value_start_min;
            //endregion
            //region 上课时间.结束
            let start_max = this.value_start_max;
            //endregion
            //region 下课时间.开始
            let end_min = this.value_end_min;
            //endregion
            //region 下课时间.结束
            let end_max = this.value_end_max;
            //endregion
            //region 选择的科目
            let course = this.value_course;
            if (!isInteger(course)) {
                course = '0';
            }
            course = parseInt(course);
            if (0 == course) {
                course = '';
            } else {
                course = this.list_course[course - 1].label;
            }
            //endregion
            //region 选择的课程
            let id_room = this.value_room;
            if (!isInteger(id_room)) {
                id_room = '0';
            }
            id_room = parseInt(id_room);
            //endregion
            //region 选择的课程
            let id_teacher = this.value_teacher;
            if (!isInteger(id_teacher)) {
                id_teacher = '0';
            }
            id_teacher = parseInt(id_teacher);
            //endregion
            let size = this.size;
            let page = this.page;

            let data = coursePageList(id_class, week_min, week_max, lesson, start_min, start_max, end_min, end_max, course, id_room, id_teacher, size, page)
            data.then(dt => {
                if (!dt) {
                    this.$message({type: 'error', message: `数据无效`});
                    return;
                }
                if (!dt.page) {
                    this.$message({type: 'error', message: `分页数据无效`});
                    return;
                }
                this.page_data = dt.page;
                if (dt.data) {
                    this.page_course = dt.data;
                    for (let i = 0; i < this.page_course.length; i++) {
                        this.page_course[i].checkbox = false;
                    }
                }
                //console.log(this.page_data, '-->', this.page_course);
            }).catch(ex => {
                this.$message({type: 'error', message: `异常：${JSON.stringify(ex)}`});
                console.log(ex);
            }).finally();
        },

        /**
         * 搜索课程表
         * @param evt
         */
        searchCourse(evt) {
            this.coursePageData();
        },

        /**
         * 执行条目方法
         * @param evt
         */
        execMethod(evt) {
            let id_class = parseInt(evt.currentTarget.dataset.idclass);
            let week = parseInt(evt.currentTarget.dataset.week);
            let lesson = parseInt(evt.currentTarget.dataset.lesson);
            let id_menu = parseInt(evt.currentTarget.dataset.menu);
            let menu = this.course_menu.find(m => m.id == id_menu);
            let method_name = menu.method;
            //console.log(id_class, '--', week, '--', lesson, '--', id_menu, '--', menu, '--', method_name);
            method_name = `this.${method_name}(${id_class}, ${week}, ${lesson})`;
            eval(method_name);
        },

        /**
         * 修改课程表
         * @param id_class
         * @param week
         * @param lesson
         */
        userEditCourse(id_class, week, lesson) {
            let course = courseGet(id_class, week, lesson);
            course.then(cr => {
                this.id_class_old = cr.id_class;
                this.week_old = cr.week;
                this.lesson_old = cr.lesson;
                this.editCourse(cr);
                console.log(cr);
            }).catch(ex => {
                console.log(ex);
            }).finally();
        },

        /**
         * 删除课程表
         * @param id_class
         * @param week
         * @param lesson
         */
        userDeleteCourse(id_class, week, lesson) {
            let name_class = this.list_class.find(c => c.value == id_class).label;
            let name_week = this.list_week.find(w => w.value == week).label;
            let name_lesson = this.list_lesson.find(l => l.value == lesson).label;
            this.$confirm(`即将删除课程表-->${name_class}--${name_week}--${name_lesson}?`, '提示', {
                confirmButtonText: '删除',
                cancelButtonText: '取消',
                type: 'message'
            }).then(() => {
                let delete_result = courseDelete(id_class, week, lesson);
                delete_result.then(t => {
                    this.$message({type: 'success', message: `删除课程成功`});
                    this.coursePageData();
                }).catch(ex => {
                    this.$message({type: 'error', message: `删除失败-->${JSON.stringify(ex)}`});
                    console.log(ex);
                }).finally();
            }).catch(ex => {
                /*
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
                */
            });
        },

        /**
         * 批量删除课程表
         * @param evt
         */
        deleteCourses(evt) {
            let dcs = [];
            for (let i = 0; i < this.page_course.length; i++) {
                if (this.page_course[i].checkbox) {
                    let dc = {
                        id_class: this.page_course[i].id_class,
                        week: this.page_course[i].week,
                        lesson: this.page_course[i].lesson
                    };
                    dcs.push(dc);
                }
            }
            if (!dcs || dcs.length <= 0) {
                this.$message({type: 'error', message: `请选择要删除的课程表`});
                return;
            }
            this.$confirm(`即将删除选择的${dcs.length}个课程表?`, '提示', {
                confirmButtonText: '删除',
                cancelButtonText: '取消',
                type: 'message'
            }).then(() => {
                let delete_result = coursesDelete(dcs);
                delete_result.then(t => {
                    this.$message({type: 'success', message: `删除课程成功`});
                    this.coursePageData();
                }).catch(ex => {
                    this.$message({type: 'error', message: `删除失败-->${JSON.stringify(ex)}`});
                    console.log(ex);
                }).finally();
            }).catch(ex => {
                /*
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
                */
            });
        },

        /**
         * 点击页码
         * @param page
         */
        page_goto(page) {
            this.page = page;
            this.coursePageData();
        },

        /**
         * 全选
         */
        selectAll() {
            if (this.page_course && this.page_course.length > 0) {
                for (let i = 0; i < this.page_course.length; i++) {
                    this.page_course[i].checkbox = this.select_all_checkbox;
                }
            }
        },

        /**
         * 新增课程表
         */
        addCourse() {
            let course = {
                id_class: '',
                name_class: '',
                week: '',
                lesson: '',
                start: '',
                end: '',
                course: '',
                id_room: '',
                name_room: '',
                id_teacher: '',
                name_teacher: ''
            };
            this.editCourse(course);
        },

        /**
         * 编辑课程表
         * @param course
         */
        editCourse(course) {
            course.open = true;
            course.title = '新增课程表';
            if (course.id_class && course.id_class > 0) {
                course.title = `编辑：${course.name_class}--${this.list_week[course.week - 1].label}--${this.list_lesson[course.lesson - 1].label}`;
            }
            course.id_course = '';
            if (course.course && course.course.length > 0) {
                //course.id_course = this.list_course.find(c => c.label == course.course).value;
                let obj_course = this.list_course.find(c => c.label == course.course);
                if (obj_course && obj_course.value) {
                    course.id_course = obj_course.value;
                }
                if (!course.id_course) {
                    course.id_course = '';
                }
            }
            this.edit_course = course;

        },

        /**
         * 关闭编辑器之前
         */
        edit_course_close_before() {
            console.log('准备关闭');
        },

        /**
         * 编辑器已经打开完成
         */
        edit_course_opened() {

        },

        /**
         * 编辑器打开
         */
        edit_course_open() {

        },

        /**
         * 保存课程表
         */
        edit_course_save() {
            let param = {};
            //region 课程表班级
            let id_class = this.edit_course.id_class;
            if (!isInteger(id_class)) {
                this.$message({type: 'error', message: `请选择课程表班级`});
                return;
            }
            id_class = parseInt(id_class);
            if (id_class <= 0) {
                this.$message({type: 'error', message: `->请选择课程表班级`});
                return;
            }
            param.id_class = id_class;
            //endregion
            //region 上课星期日
            let week = this.edit_course.week;
            if (!isInteger(week)) {
                this.$message({type: 'error', message: `请选择课程表上课星期`});
                return;
            }
            week = parseInt(week);
            if (week <= 0) {
                this.$message({type: 'error', message: `->请选择课程表上课星期`});
                return;
            }
            param.week = week;
            //endregion
            //region 上课节次
            let lesson = this.edit_course.lesson;
            if (!isInteger(lesson)) {
                this.$message({type: 'error', message: `请选择课程表上课课次`});
                return;
            }
            lesson = parseInt(lesson);
            if (lesson <= 0) {
                this.$message({type: 'error', message: `->请选择课程表上课课次`});
                return;
            }
            param.lesson = lesson;
            //endregion
            //region 上课时间
            let start = this.edit_course.start;
            if (!start || start.length <= 0) {
                this.$message({type: 'error', message: `请选择课程表上课时间`});
                return;
            }
            param.start = start;
            //endregion
            //region 下课时间
            let end = this.edit_course.end;
            if (!end || end.length <= 0) {
                this.$message({type: 'error', message: `请选择课程表下课时间`});
                return;
            }
            param.end = end;
            //endregion
            //region 课程科目
            let id_course = this.edit_course.id_course;
            if (!isInteger(id_course)) {
                this.$message({type: 'error', message: `请选择课程表上课课程`});
                return;
            }
            id_course = parseInt(id_course);
            if (id_course <= 0) {
                this.$message({type: 'error', message: `->请选择课程表上课课程`});
                return;
            }
            let course = this.list_course[id_course - 1].label;
            if (!course || course.length <= 0) {
                this.$message({type: 'error', message: `=>请选择课程表上课课程`});
                return;
            }
            param.course = course;
            //endregion
            //region 上课教室
            let id_room = this.edit_course.id_room;
            if (!isInteger(id_room)) {
                this.$message({type: 'error', message: `请选择课程表上课教室`});
                return;
            }
            id_room = parseInt(id_room);
            if (id_room <= 0) {
                this.$message({type: 'error', message: `->请选择课程表上课教室`});
                return;
            }
            param.id_room = id_room;
            //endregion
            //region 任课教师
            let id_teacher = this.edit_course.id_teacher;
            if (!isInteger(id_teacher)) {
                this.$message({type: 'error', message: `请选择课程表任课教师`});
                return;
            }
            id_teacher = parseInt(id_teacher);
            if (id_teacher <= 0) {
                this.$message({type: 'error', message: `->请选择课程表任课教师`});
                return;
            }
            param.id_teacher = id_teacher;
            //endregion
            //region 编辑前数据
            param.id_class_old = this.id_class_old;
            param.week_old = this.week_old;
            param.lesson_old = this.lesson_old;
            //endregion
            let save_result = courseSave(param);
            save_result.then(t => {
                this.$message({type: 'success', message: `保存课程表成功`});
                this.coursePageData();
            }).catch(ex => {
                this.$message({type: 'error', message: `保存失败-->${JSON.stringify(ex)}`});
                console.log(ex);
            }).finally();
            //console.log(param);
        },

        /**
         * 关闭编辑器
         */
        edit_course_close() {
            this.$confirm('即将关闭课程表编辑器?', '提示', {
                confirmButtonText: '关闭',
                cancelButtonText: '取消',
                type: 'message'
            }).then(() => {
                this.edit_course.open = false;
            }).catch(ex => {
                /*
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
                */
            });
        },

        /**
         * 下载导入模板
         * @param evt
         */
        download_course(evt) {
            evt.preventDefault();
            let a = document.createElement('a');
            a.style = 'display: none';
            a.download = '课程表导入模板.xlsx';
            a.href = '/static/excel/kchbmb.xlsx';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        },

        /**
         * 导入课程表
         * @param evt
         */
        upload_course(evt) {
            const upload_course = document.createElement("input");
            upload_course.id = "upload_course";
            upload_course.setAttribute('type', 'file');
            upload_course.setAttribute('accept', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            upload_course.style.setProperty('display', 'none', 'important');
            document.body.appendChild(upload_course);
            const that = this;
            upload_course.onchange = function (e) {
                if (!e || !e.target || !e.target.files || e.target.files.length <= 0) {
                    that.$message({type: 'error', message: `选择导入数据文件(xlsx格式)`});
                    return;
                }
                let file_obj = e.target.files[0];
                let file_name = file_obj.name;
                if (!file_name || file_name.length <= 0) {
                    that.$message({type: 'error', message: `导入数据文件(xlsx格式)名称，无效`});
                    return;
                }
                if (!/\.xlsx$/g.test(file_name)) {
                    that.$message({type: 'error', message: `导入数据文件(xlsx格式)名称，只支持xlsx文件`});
                    return;
                }
                let reader = new FileReader();
                reader.onload = function (ef) {
                    let course_data = ef.target.result;
                    let work_book = XLSX.read(course_data, {type: 'binary'});
                    let sheet_names = work_book.SheetNames;
                    let work_sheet = work_book.Sheets[sheet_names[0]];
                    const sheet_json_opts = {
                        /** Default value for null/undefined values */
                        defval: ''//给defval赋值为空的字符串
                    }
                    const results = XLSX.utils.sheet_to_json(work_sheet, sheet_json_opts);
                    let rst = new Array();
                    let regex_time = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
                    for (let i = 0; i < results.length; i++) {
                        let item = new Object();
                        //region 班级名称
                        item.name_class = results[i]['班级名称'];
                        if (!item.name_class || item.name_class.length <= 0) {
                            that.$message({type: 'error', message: `第${i + 1}行，班级名称数据无效`});
                            return;
                        }
                        //endregion
                        //region 上课周日
                        item.week = results[i]['上课周日'];
                        if (!isInteger(item.week)) {
                            that.$message({type: 'error', message: `第${i + 1}行，上课周日数据无效`});
                            return;
                        }
                        item.week = parseInt(item.week);
                        if (item.week > 7 || item.week < 1) {
                            that.$message({type: 'error', message: `第${i + 1}行，上课周日数据应在1到7之间，7--星期天`});
                            return;
                        }
                        //endregion
                        //region 上课节次
                        item.lesson = results[i]['上课节次'];
                        if (!isInteger(item.lesson)) {
                            that.$message({type: 'error', message: `第${i + 1}行，上课节次数据无效`});
                            return;
                        }
                        item.lesson = parseInt(item.lesson);
                        if (item.lesson > 5 || item.lesson < 1) {
                            that.$message({type: 'error', message: `第${i + 1}行，上课节次数据应在1到5之间`});
                            return;
                        }
                        //endregion
                        //region 上课时间
                        item.start = results[i]['上课时间'];
                        if (!item.start || item.start.length <= 0) {
                            that.$message({type: 'error', message: `第${i + 1}行，上课时间无效`});
                            return;
                        }
                        if (!regex_time.test(item.start)) {
                            that.$message({type: 'error', message: `第${i + 1}行，上课时间格式无效`});
                            return;
                        }
                        //endregion
                        //region 下课时间
                        item.end = results[i]['下课时间'];
                        if (!item.end || item.end.length <= 0) {
                            that.$message({type: 'error', message: `第${i + 1}行，下课时间无效`});
                            return;
                        }
                        if (!regex_time.test(item.end)) {
                            that.$message({type: 'error', message: `第${i + 1}行，下课时间格式无效`});
                            return;
                        }
                        //endregion
                        //region 课程科目
                        item.course = results[i]['课程科目'];
                        if (!item.course || item.course.length <= 0) {
                            that.$message({type: 'error', message: `第${i + 1}行，课程科目数据无效`});
                            return;
                        }
                        //endregion
                        //region 上课教室
                        item.name_room = results[i]['上课教室'];
                        if (!item.name_room || item.name_room.length <= 0) {
                            that.$message({type: 'error', message: `第${i + 1}行，上课教室数据无效`});
                            return;
                        }
                        //endregion
                        //region 任课教师
                        item.name_teacher = results[i]['任课教师'];
                        if (!item.name_teacher || item.name_teacher.length <= 0) {
                            that.$message({type: 'error', message: `第${i + 1}行，任课教师数据无效`});
                            return;
                        }
                        //endregion
                        rst.push(item);
                    }
                    let import_course = coursesImport(rst);
                    import_course.then(ic => {
                        that.$message({type: 'success', message: `导入课程表成功`});
                        that.coursePageData();
                    }).catch(ex => {
                        that.$message({type: 'error', message: `导入课程表异常：${JSON.stringify(ex)}`});
                        console.log(ex);
                    }).finally();
                };
                reader.readAsBinaryString(file_obj);
                document.body.removeChild(upload_course);
            }
            upload_course.click();
        }
    },
    components: {},
    created() {
        //#region 处理当前用户
        let login_user = localStorage.getItem('user') || {};
        this.user = JSON.parse(login_user);
        //console.log(this.user);
        //#endregion
        //#region 获取学校管理员扩展信息
        let user_ext = userMessage();
        user_ext.then(t => {
            this.user_ext = t;
            //console.log(this.user_ext);
        }).catch(ex => {
            console.log(ex);
        }).finally();
        //#endregion
        //#region 获取学校班级列表
        let list_class = schoolClass(this.user.idSchool);
        list_class.then(lc => {
            if (lc && lc.length > 0) {
                for (let i = 0; i < lc.length; i++) {
                    let ci = {label: lc[i].name, value: lc[i].id};
                    this.list_class.push(ci);
                }
            }
            //console.log(this.list_class);
        }).catch(ex => {
            console.log(ex);
        }).finally();
        //#endregion
        //#region 获取学校教师列表
        let list_teacher = schoolTeacher(this.user.idSchool);
        list_teacher.then(lt => {
            if (lt && lt.length > 0) {
                for (let i = 0; i < lt.length; i++) {
                    let ci = {label: lt[i].username, value: lt[i].id};
                    this.list_teacher.push(ci);
                }
            }
            //console.log(this.list_teacher);
        }).catch(ex => {
            console.log(ex);
        }).finally();
        //#endregion
        //#region 获取学校科目列表
        let list_course = schoolCourse(this.user.idSchool);
        list_course.then(lc => {
            if (lc && lc.length > 0) {
                this.list_course = lc;
            }
            //console.log(this.list_course);
        }).catch(ex => {
            console.log(ex);
        }).finally();
        //#endregion
        //#region 获取学校教室列表
        let list_room = schoolRoom(this.user.idSchool);
        list_room.then(lr => {
            if (lr && lr.length > 0) {
                for (let i = 0; i < lr.length; i++) {
                    let ci = {label: lr[i].name, value: lr[i].id};
                    this.list_room.push(ci);
                }
            }
            //console.log(this.list_room);
        }).catch(ex => {
            console.log(ex);
        }).finally();
        //#endregion
        //#region 初始化星期日
        let weeks = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];
        for (let i = 0; i < weeks.length; i++) {
            let ci = {label: weeks[i], value: i + 1};
            this.list_week.push(ci);
        }
        //#endregion
        //#region 初始化课程节次
        let lessons = ['第一节课', '第二节课', '第三节课', '第四节课', '第五节课'];
        for (let i = 0; i < lessons.length; i++) {
            let ci = {label: lessons[i], value: i + 1};
            this.list_lesson.push(ci);
        }
        //#endregion
        //#region 读取课程列表标题
        let list_title = titleList(5);
        list_title.then(cl => {
            this.list_title = cl.rows[0].cols;
            for (let i = 0; i < this.list_title.length; i++) {
                switch (this.list_title[i].align) {
                    case 1:
                        this.list_title[i].align_text = 'left';
                        break;
                    case 2:
                        this.list_title[i].align_text = 'center';
                        break;
                    case 3:
                        this.list_title[i].align_text = 'right';
                        break;
                }
            }
            //console.log(this.list_title);
        }).catch(ex => {
            console.log(ex);
        }).finally();
        //#endregion
        //#region 获取课程表条目操作菜单列表
        let course_menu = courseItemMenu();
        course_menu.then(cm => {
            if (cm && cm.length > 0) {
                this.course_menu = cm;
            }
            //console.log(this.course_menu);
        }).catch(ex => {
            console.log(ex);
        }).finally();
        //#endregion
        this.coursePageData();
    },
    mounted() {
        //#region 计算顶部组件高度
        this.$nextTick(() => {
            let app_title = document.querySelector('#app_title');
            let app_title_height = app_title.offsetHeight;
            //console.log('标题：', app_title_height);
            let app_user_ext = document.querySelector('#app_user_ext');
            let app_user_ext_height = app_user_ext.offsetHeight + 5;
            //console.log('信息：', app_user_ext_height);
            let app_list_search = document.querySelector('#app_list_search');
            let app_list_search_height = app_list_search.offsetHeight + 5;
            //console.log('搜索：', app_list_search_height);
            let app_list_title = document.querySelector('#app_list_title');
            let app_list_title_height = app_list_title.offsetHeight + 5;
            //console.log('标题：', app_list_title_height);
            let app_list_page = document.querySelector('#app_list_page');
            let app_list_page_height = app_list_page.offsetHeight + 10;
            //console.log('分页：', app_list_page_height);
            this.except_height = app_title_height + app_user_ext_height + app_list_search_height + app_list_title_height + app_list_page_height;
        })
        //#endregion
    },
};

let instance = Vue.createApp(app);
instance.use(ElementPlus);
instance.mount('#app');

//#region API调用函数

/**
 * 获取当前账号信息
 * @returns {Promise<*|string>}
 */
async function userMessage() {
    let result = await getTeacherMessage();
    if (0 != result.result) {
        return;
    }
    let data = result.msg;
    return data;
}

/**
 * 根据学校获取班级列表
 * @param id_school
 * @returns {Promise<*|string>}
 */
async function schoolClass(id_school) {
    let result = await getSchoolClass(id_school);
    if (0 != result.result) {
        return;
    }
    let data = result.msg;
    return data;
}

/**
 * 根据学校获取教师列表
 * @param id_school
 * @returns {Promise<*|string>}
 */
async function schoolTeacher(id_school) {
    let result = await getSchoolTeacher(id_school);
    if (0 != result.result) {
        return;
    }
    let data = result.msg;
    return data;
}

/**
 * 根据学校获取科目列表
 * @param id_school
 * @returns {Promise<*|string>}
 */
async function schoolCourse(id_school) {
    let result = await getSchoolCourse(id_school);
    if (0 != result.result) {
        return;
    }
    let data = result.msg;
    return data;
}

/**
 * 根据学校获取教室列表
 * @param id_school
 * @returns {Promise<*|string>}
 */
async function schoolRoom(id_school) {
    let result = await getRoomList(0, 0, id_school, '');
    if (0 != result.result) {
        return;
    }
    let data = result.msg;
    return data;
}

/**
 * 获取课程列表标题
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
 * 获取课程表条目菜单
 * @returns {Promise<*|string>}
 */
async function courseItemMenu() {
    let result = await getCourseItemMenu();
    if (0 != result.result) {
        return;
    }
    let data = result.msg;
    return data;
}

/**
 * 获取课程分页列表
 * @param id_class
 * @param week_min
 * @param week_max
 * @param lesson
 * @param start_min
 * @param start_max
 * @param end_min
 * @param end_max
 * @param course
 * @param id_room
 * @param id_teacher
 * @param size
 * @param page
 * @returns {Promise<*|string>}
 */
async function coursePageList(id_class, week_min, week_max, lesson, start_min, start_max, end_min, end_max, course, id_room, id_teacher, size, page) {
    let result = await getCoursePageList(id_class, week_min, week_max, lesson, start_min, start_max, end_min, end_max, course, id_room, id_teacher, size, page);
    if (0 != result.result) {
        return;
    }
    let data = result.msg;
    return data;
}

/**
 * 保存课程表
 * @param course
 * @returns {Promise<*|string>}
 */
async function courseSave(course) {
    let result = await saveCourse(course);
    if (0 != result.result) {
        return;
    }
    let data = result.msg;
    return data;
}

/**
 * 获取课程表
 * @param id_class
 * @param week
 * @param lesson
 * @returns {Promise<*|string>}
 */
async function courseGet(id_class, week, lesson) {
    let result = await getCourse(id_class, week, lesson);
    if (0 != result.result) {
        return;
    }
    let data = result.msg;
    return data;
}

/**
 * 批量删除课程表
 * @param dcs
 * @returns {Promise<*|string>}
 */
async function coursesDelete(dcs) {
    let result = await deleteCourses(dcs);
    if (0 != result.result) {
        return;
    }
    let data = result.msg;
    return data;
}

/**
 * 删除课程表
 * @param id_class
 * @param week
 * @param lesson
 * @returns {Promise<*|string>}
 */
async function courseDelete(id_class, week, lesson) {
    let result = await deleteCourse(id_class, week, lesson);
    if (0 != result.result) {
        return;
    }
    let data = result.msg;
    return data;
}

/**
 * 导入课程表
 * @param dcs
 * @returns {Promise<*|string>}
 */
async function coursesImport(ics) {
    let result = await importCourses(ics);
    if (0 != result.result) {
        return;
    }
    let data = result.msg;
    return data;
}

//#endregion
