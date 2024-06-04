/**
 *API基地址
 */
const api_base = 'http://127.0.0.1:8080';
// const api_base = 'http://shuhua.nnyun.net';
const SUBMITFORM = 'application/x-www-form-urlencoded';
const SUBMITJSON = 'application/json';
const SUBMITUPLOAD = 'multipart/form-data';

/**
 * API请求
 * @param {请求设置} options
 * @param {访问令牌} token
 */
function api(options, token) {
    return new Promise((resolve, reject) => {
        let msg = '';
        if (isNullOrEmpty(options)) {
            msg = `API请求设置无效`;
            reject(new executeResult(1, msg));
            return;
        }
        if (isNullOrEmpty(options.url)) {
            msg = `API请求地址无效`;
            reject(new executeResult(1, msg));
            return;
        }
        let url = `${api_base}/${options.url}`;
        let method = options.method || 'get';
        let data = options.data || {};
        let header = options.header || {'content-type': SUBMITFORM};
        if (token) {
            let token_key = localStorage.getItem('token') || '';
            if (isNullOrEmpty(token_key)) {
                msg = `请先登录`;
                reject(new executeResult(2, msg));
                return;
            }
            header.token = token_key;
        }
        //console.log('-->', header);
        let axios_data = {
            url: url,
            method: method,
            headers: header
        };
        if ('get' == axios_data.method.toLowerCase().trim()) {
            axios_data.params = data;
        } else {
            axios_data.data = data;
        }
        ;
        axios(axios_data).then(resp => {
            if (undefined === resp.status) {
                reject(new executeResult(1, '检查API服务器是否正常工作'));
                return;
            }
            let status = resp.status;
            let statusText = resp.statusText;
            let headers = resp.headers;
            let data = resp.data;
            if (200 != status) {
                reject(new executeResult(1, statusText));
            } else {
                //console.log('结果：', data);
                if (null == data || undefined === data || undefined === data.ok || null == data.ok) {
                    reject(new executeResult(1, '接口数据格式错误'));
                }
                if (data.ok) {
                    if (undefined === data.body) {
                        reject(new executeResult(1, '接口数据格式错误-->无数据'));
                    }
                    resolve(new executeResult(0, data.body));
                } else {
                    if (undefined === data.msg) {
                        reject(new executeResult(1, '接口数据格式错误-->无消息'));
                    }
                    reject(new executeResult(1, data.msg));
                }
            }
        }).catch(ex => {
            if (undefined === ex.response.data) {
                msg = `异常：检查API服务器是否正常工作`;
                reject(new executeResult(1, msg));
                return;
            }
            msg = ex.response.data.status + ':' + ex.response.data.error + '-->' + ex.response.data.path;
            reject(new executeResult(1, msg));
        });
    });
};

/**
 * 获取配置参数
 * @returns {Promise<unknown>}
 */
function getDashboardParameter() {
    let url = 'api/dashboard/setup';
    let options = {
        url: url
    };
    return api(options, true);
}

/**
 * 获取教室类型
 */
function getRoomType() {
    let url = 'api/roomv2/type';
    let options = {
        url: url
    };
    return api(options, true);
}

/**
 * 获取教室条目菜单
 * @returns {Promise<unknown>}
 */
function getRoomItemMenu() {
    let url = 'api/roomv2/item/menu';
    let options = {
        url: url
    };
    return api(options, true);
}

/**
 * 房间列表对象
 * @param id
 * @returns {Promise<unknown>}
 */
function getList(id) {
    let url = 'api/roomv2/list/info';
    let parames = {
        id: id
    };
    let options = {
        url: url,
        data: parames
    };
    return api(options, true);
}

/**
 * 教室列表数据
 * @param city
 * @param zone
 * @param school
 * @param name
 * @returns {Promise<unknown>}
 */
function getRoomList(city, zone, school, name) {
    let url = 'api/roomv2/list/v2';
    let parames = {
        idCity: city,
        idZonen: zone,
        idSchool: school,
        name: name
    };
    let options = {
        url: url,
        data: parames
    };
    return api(options, true);
}

/**
 * 获取阿里云oss
 * @returns {Promise<unknown>}
 */
function getAliyunOSS() {
    let url = 'api/user/oss/token';
    let options = {
        url: url
    };
    return api(options, true);
}

/**
 * 上传文件到阿里云
 * @param oss: 阿里云参数
 * @param file: 上传文件对象 input
 * @param progress: 上传进度回调
 * @param success: 上传成功回调
 * @param fail: 上传失败回调
 */
function uploadFileToAliyun(oss, file, progress, success, fail) {
    const type = file.type;
    const exts = type.split('/');
    const ext = exts[exts.length - 1].replace('jpeg', 'jpg');
    const time = getTime().replace('-', '_').replace('-', '_').replace(' ', '_').replace(':', '_').replace(':', '_');
    const key = oss.dir + '/' + ext + '/' + guid() + '_' + time + '_' + getRandomChar(7, false) + '.' + ext;
    const form = new FormData();
    form.append('key', key);
    form.append('file', file);
    form.append('policy', oss.policy);
    form.append('ossAccessKeyId', oss.accessid);
    form.append('signature', oss.signature);
    form.append('success_action_status', '200');

    let msg = '';
    let url = oss.host;
    let options = {
        url: url,
        method: 'post',
        processData: false,////告诉axios不要去处理发送的数据(重要参数)
        data: form,
        contentType: SUBMITUPLOAD,
        onUploadProgress: progressEvent => {
            if (progress) {
                progress(progressEvent.loaded, progressEvent.total);
            }
        },
    };
    axios(options).then(res => {
        if (res.status == 200 && res.statusText == 'OK') {
            let file_url = 'https://' + oss.domain + '/' + key;
            if (success) {
                success(file_url);
            }
        } else {
            msg = `AliyunOSS服务器错误-->${res.status}：${res.statusText}`;
            if (fail) {
                fail(msg);
            }
        }
    }, error => {
        console.log(error);
        msg = `上传错误：${JSON.stringify(error)}`;
        if (fail) {
            fail(msg);
        }
    }).catch(ex => {
        console.log(ex);
        msg = `上传异常：${JSON.stringify(ex)}`;
        if (fail) {
            fail(msg);
        }
    }).finally();
}

/**
 * 保存教室
 * @param parames
 * @returns {Promise<unknown>}
 */
function roomSave(parames) {
    let url = 'api/roomv2/save';
    let headers = {
        'content-type': SUBMITJSON,
    };
    let options = {
        url: url,
        method: 'post',
        data: parames,
        header: headers,
        dataType: 'json',
    };
    return api(options, true);
}

/**
 * 获取教室数据
 */
function getRoomDetail(id) {
    let url = 'api/roomv2/get/v2';
    let parames = {
        id: id
    };
    let options = {
        url: url,
        data: parames
    };
    return api(options, true);
}

/**
 * 读取教室摄像机列表
 * @param id
 * @returns {Promise<unknown>}
 */
function getRoomCameras(id) {
    let url = 'api/roomv2/camera/list';
    let parames = {
        idRoom: id
    };
    let options = {
        url: url,
        data: parames
    };
    return api(options, true);
}

/**
 * 获取教室摄像机条目菜单
 * @returns {Promise<unknown>}
 */
function getCameraItemMenu() {
    let url = 'api/roomv2/camera/item/menu';
    let options = {
        url: url
    };
    return api(options, true);
}

/**
 * 保存教室摄像机
 * @param parames
 * @returns {Promise<unknown>}
 */
function roomCameraSave(camera) {
    let url = 'api/roomv2/camera/batch/save';
    let headers = {
        'content-type': SUBMITJSON,
    };
    let options = {
        url: url,
        method: 'post',
        data: camera,
        header: headers,
        dataType: 'json',
    };
    return api(options, true);
}

/**
 * 获取教室小组条目菜单
 * @returns {Promise<unknown>}
 */
function getGroupItemMenu() {
    let url = 'api/roomv2/group/item/menu';
    let options = {
        url: url
    };
    return api(options, true);
}

/**
 * 读取教室小组列表
 * @param id
 * @returns {Promise<unknown>}
 */
function getRoomGroups(id) {
    let url = 'api/roomv2/group/list';
    let parames = {
        idRoom: id
    };
    let options = {
        url: url,
        data: parames
    };
    return api(options, true);
}

/**
 * 保存教室小组
 * @param group
 * @returns {Promise<unknown>}
 */
function roomGroupSave(group) {
    let url = 'api/roomv2/group/batch/save';
    let headers = {
        'content-type': SUBMITJSON,
    };
    let options = {
        url: url,
        method: 'post',
        data: group,
        header: headers,
        dataType: 'json',
    };
    return api(options, true);
}

/**
 * 读取教室坐位列表
 * @param id
 * @returns {Promise<unknown>}
 */
function getRoomSeats(id) {
    let url = 'api/roomv2/seat/list/v2';
    let parames = {
        idRoom: id
    };
    let options = {
        url: url,
        data: parames
    };
    return api(options, true);
}

/**
 * 读取教室课桌座位列表
 * @param id
 * @returns {Promise<unknown>}
 */
function getRoomDeskSeats(id) {
    let url = 'api/roomv2/seat/list/desk';
    let parames = {
        idRoom: id
    };
    let options = {
        url: url,
        data: parames
    };
    return api(options, true);
}

/**
 * 保存教室坐位
 * @param seat
 * @returns {Promise<unknown>}
 */
function saveRoomSeat(seat) {
    let url = 'api/roomv2/seat/batch/save/v2';
    let headers = {
        'content-type': SUBMITJSON,
    };
    let options = {
        url: url,
        method: 'post',
        data: seat,
        header: headers,
        dataType: 'json',
    };
    return api(options, true);
}

/**
 * 根据教师获取班级列表
 */
function getTeacherClasss(id) {
    let url = 'api/user/teacher/class/list';
    let parames = {
        idTeacher: id
    };
    let options = {
        url: url,
        data: parames
    };
    return api(options, true);
}

/**
 * 获取班级小组条目菜单
 * @returns {Promise<unknown>}
 */
function getClassItemMenu() {
    let url = 'api/user/class/menu';
    let options = {
        url: url
    };
    return api(options, true);
}

/**
 * 获取教师信息
 * @returns {Promise<unknown>}
 */
function getTeacherMessage() {
    let url = 'api/user/message';
    let options = {
        url: url
    };
    return api(options, true);
}

/**
 * 根据班级、教室获取学生在班级中的座位情况
 * @param id_class
 * @param id_room
 * @returns {Promise<unknown>}
 */
function getClassRoomStudents(id_class, id_room) {
    let url = 'api/user/class/student/seat/list';
    let parames = {
        idClass: id_class,
        idRoom: id_room
    };
    let options = {
        url: url,
        data: parames
    };
    return api(options, true);
}

/**
 * 根据班级获取学生列表
 */
function getClassStudents(id) {
    let url = 'api/user/class/student/list';
    let parames = {
        idClass: id
    };
    let options = {
        url: url,
        data: parames
    };
    return api(options, true);
}

/**
 * 保存教室坐位学生
 * @param seats
 * @returns {Promise<unknown>}
 */
function saveRoomSeatStudent(seats) {
    let url = 'api/user/class/student/seat/save';
    let headers = {
        'content-type': SUBMITJSON,
    };
    let options = {
        url: url,
        method: 'post',
        data: seats,
        header: headers,
        dataType: 'json',
    };
    return api(options, true);
}
