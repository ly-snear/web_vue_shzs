/**
 * 处理组织数据
 * @param list
 * @param user
 */
function processOrganization(list, user) {
    const city = 1200;
    const zone = 1100;
    const school = 1000;
    let result = [];
    let list_city = list.filter(d => d.level = city && d.idCity > 0 && 0 == d.idZone && 0 == d.idSchool);
    for (let i = 0; i < list_city.length; i++) {
        result.push({value: list_city[i].id, label: list_city[i].name});
        let key = `child`
        list_city[i][key] = list.filter(d => d.level = city && list_city[i].id == d.idCity && d.idZone > 0 && 0 == d.idSchool);
        result[i][key] = [];
        for (let j = 0; j < list_city[i][key].length; j++) {
            list_city[i][key][j][key] = list.filter(d => d.level = city && list_city[i].id == d.idCity && list_city[i][key][j].id == d.idZone && d.idSchool > 0);
            result[i][key].push({value: list_city[i][key][j].id, label: list_city[i][key][j].name})
            result[i][key][j][key] = [];
            for (let k = 0; k < list_city[i][key][j][key].length; k++) {
                result[i][key][j][key].push({
                    value: list_city[i][key][j][key][k].id,
                    label: list_city[i][key][j][key][k].name
                })
            }
        }
    }
    return result;
}

/**
 * 组织初始化数据
 * @param list
 * @returns {{city: *[], zone: *[], school: *[]}}
 */
function initOrganization(list) {
    let city = [];
    let zone = [];
    let school = [];
    city = list;
    if (city && city.length > 0) {
        zone = city[0].child;
        if (zone && zone.length > 0) {
            school = zone[0].child
        }
    }
    let result = {
        city: city,
        zone: zone,
        school: school
    };
    return result;
}
