let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

/**
 * 选择文件
 */
function select_excel() {
    let file_tag = document.createElement('input');
    file_tag.setAttribute('type', 'file');
    file_tag.setAttribute('accept', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    file_tag.setAttribute('style', 'display: none;');
    file_tag.onchange = function (e) {
        if (!e.target.files || !e.target.files[0]) {
            alert('请选择学校班级学生数据文件');
            file_tag.remove();
            return;
        }
        file_tag.remove();
        read_excel(e.target.files[0]);
    }
    file_tag.click();
}

/**
 * 读取文件
 * @param file
 */
function read_excel(file) {
    let reader = new FileReader();
    reader.onload = function (e) {
        let data = parse_excel(e.target.result);
        console.log(data);
    };
    reader.readAsArrayBuffer(file);
}

/**
 * 解析数据
 * @param data
 */
function parse_excel(data) {
    let result = new executeResult(null, null);
    const workbook = XLSX.read(data);
    let sheet_count = workbook.SheetNames.length;
    let datas = [];
    for (let i = 0; i < sheet_count; i++) {
        let obj_class = {};
        //读取班级名称
        let sheet_name = workbook.SheetNames[i]
        obj_class.name = sheet_name;
        //读取工作表
        const worksheet = workbook.Sheets[sheet_name];
        //获取有效数据范围
        let region = worksheet['!ref'];
        console.log('-->', region);
        let p = parse_region(region);
        if (!p.result) {
            result.result = null;
            result.msg = `解析数据表-->${sheet_name}-->有效数据范围错误-->${p.msg}`;
            return result;
        }
        let teachers = [];
        let students = [];
        let type = 1;
        let margin_row = 0;
        for (let m = p.result.start.row; m <= p.result.end.row; m++) {
            if (m == p.result.start.row) {
                //忽略教师标题
                continue;
            }
            //region 处理数据列
            //region 处理第一列 教师姓名 学生姓名
            let cell_name = chars.substr(0, 1) + m;
            let cell_value = worksheet[cell_name];
            let cell_1 = '';
            if (cell_value && cell_value.v) {
                cell_1 = cell_value.v.toString();
            }
            if (0 == cell_1.trim().length) {
                type = 2;
                margin_row = m + 1;
                continue;
            }
            if (margin_row == m) {
                continue;
            }
            //endregion
            //region 处理第二列 教师电话 学生学号
            cell_name = chars.substr(1, 1) + m;
            cell_value = worksheet[cell_name];
            let cell_2 = '';
            if (cell_value && cell_value.v) {
                cell_2 = cell_value.v.toString();
            }
            //endregion
            //region 处理第三列 教师密码 学生密码
            cell_name = chars.substr(2, 1) + m;
            cell_value = worksheet[cell_name];
            let cell_3 = '';
            if (cell_value && cell_value.v) {
                cell_3 = cell_value.v.toString();
            }
            //endregion
            //region 处理第四列 课程名称 学生简介
            cell_name = chars.substr(3, 1) + m;
            cell_value = worksheet[cell_name];
            let cell_4 = '';
            if (cell_value && cell_value.v) {
                cell_4 = cell_value.v.toString();
            }
            //endregion
            //region 处理第五列 教室名称 学生性别
            cell_name = chars.substr(4, 1) + m;
            cell_value = worksheet[cell_name];
            let cell_5 = '';
            if (cell_value && cell_value.v) {
                cell_5 = cell_value.v.toString();
            }
            //endregion
            //region 处理第六列 学生头像
            cell_name = chars.substr(5, 1) + m;
            cell_value = worksheet[cell_name];
            let cell_6 = '';
            if (cell_value && cell_value.v) {
                cell_6 = cell_value.v.toString();
            }
            //endregion
            //region 处理第七列 学生分组
            cell_name = chars.substr(6, 1) + m;
            cell_value = worksheet[cell_name];
            let cell_7 = '';
            if (cell_value && cell_value.v) {
                cell_7 = cell_value.v.toString();
            }
            //endregion
            //endregion
            //region 分拣数据
            if (1 == type) {
                //region 处理教师
                if (0 == cell_1.trim().length) {
                    result.result = null;
                    result.msg = `请在第${m}行，设置教师姓名`;
                    return result;
                }
                if (0 == cell_2.trim().length) {
                    result.result = null;
                    result.msg = `请在第${m}行，设置教师手机号码`;
                    return result;
                }
                if (0 == cell_3.trim().length) {
                    result.result = null;
                    result.msg = `请在第${m}行，设置课程名称`;
                    return result;
                }
                if (0 == cell_4.trim().length) {
                    result.result = null;
                    result.msg = `请在第${m}行，设置教室名称`;
                    return result;
                }
                let techer = {
                    name: cell_1,
                    phone: cell_2,
                    password: cell_3,
                    course: cell_4,
                    room: cell_5
                };
                teachers.push(techer);
                //endregion
            }
            if (2 == type) {
                //region 处理学生
                if (0 == cell_1.trim().length) {
                    result.result = null;
                    result.msg = `请在第${m}行，设置学生姓名`;
                    return result;
                }
                if (0 == cell_2.trim().length) {
                    result.result = null;
                    result.msg = `请在第${m}行，设置学生学号`;
                    return result;
                }
                let student = {
                    name: cell_1,
                    sno: cell_2,
                    password: cell_3,
                    intro: cell_4,
                    male: cell_5,
                    avatar: cell_6,
                    group: cell_7
                };
                students.push(student)
                //endregion
            }
            //endregion
            //region 遍历数据
            /*
            for (let n = p.result.start.col; n <= p.result.end.col; n++) {
                let cell_name = chars.substr(n - 1, 1) + m;
                let cell_value = worksheet[cell_name];
                let cell_text = '';
                if (cell_value && cell_value.v) {
                    cell_text = cell_value.v;
                }
            }
            */
            //endregion
        }
        obj_class.techers = teachers;
        obj_class.students = students;
        datas.push(obj_class);
    }
    result.result = datas;
    result.msg = null;
    return result;
}

/**
 * 解析范围
 * @param region
 */
function parse_region(region) {
    let result = new executeResult(null, null);
    let ref = region.split(':');
    if (2 != ref.length) {
        result.result = null;
        result.msg = '数据有效范围格式错误';
        return result;
    }
    let start = ref[0];
    let end = ref[1];
    let obj_start = parse_point(start);
    if (null == obj_start.result) {
        return result;
    }
    let point_start = obj_start.result;
    let obj_end = parse_point(end);
    if (null == obj_end.result) {
        return result;
    }
    let point_end = obj_end.result;
    result.result = {start: point_start, end: point_end};
    result.msg = null;
    return result;
}

/**
 * 解析坐标点
 * @param point
 */
function parse_point(point) {
    let result = new executeResult(null, null);
    if (!point) {
        result.result = null;
        result.msg = '等待解析的坐标点无效';
        return result;
    }
    if (2 != point.length) {
        result.result = null;
        result.msg = `坐标点-->${point}--数据无效，长度必须是两位`;
        return result;
    }
    let ccol = point.substr(0, 1);
    let crow = point.substr(1, 1);
    let col = chars.indexOf(ccol);
    if (-1 == col) {
        result.result = null;
        result.msg = `没有在列集中找到列-->${ccol}`;
        return result;
    }
    col = col + 1;
    if (!isInteger(crow)) {
        result.result = null;
        result.msg = `数据范围行-->${crow}-->无效，必须是数字`;
        return result;
    }
    let row = parseInt(crow);
    result.result = {row: row, col: col};
    result.msg = null;
    return result;
}
