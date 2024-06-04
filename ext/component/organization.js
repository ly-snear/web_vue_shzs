const organization = {

    props: {
        user: {
            type: Object,
            require: true
        },
        orgs: {
            type: Array,
            require: true
        }
    },

    data() {
        return {
            org: [],
            citys: [],
            zones: [],
            school: [],
            title_citys: '选择城市',
            value_city: '',
            disabled_city: false,
            title_zones: '选择区县',
            value_zone: '',
            disabled_zone: false,
            title_schools: '选择学校',
            value_school: '',
            disabled_school: false
        };
    },

    methods: {
        /**
         * 组件自定义事件实例方法
         */
        change() {
            //#region 验证选择结果
            let city = this.value_city;
            if (!isInteger(city)) {
                city = 0;
            }
            city = parseInt(city);

            let zone = this.value_zone;
            if (!isInteger(zone)) {
                zone = 0;
            }
            zone = parseInt(zone);

            let school = this.value_school;
            if (!isInteger(school)) {
                school = 0;
            }
            school = parseInt(school);
            //#endregion
            let org_value = {
                city: city,
                zone: zone,
                school: school
            }
            this.$emit('change', org_value);
        },

        /**
         * 城市改变后设置区县、学校数据
         * 发送change事件
         */
        getZone() {
            this.zones = this.citys.find(c => c.value == this.value_city).child;
            this.value_zone = '选择区县';
            this.value_school = '选择学校';
            if (this.zones && this.zones.length > 0) {
                this.value_zone = this.zones[0].value;
                this.school = this.zones[0].child;
                if (this.school && this.school.length > 0) {
                    this.value_school = this.school[0].value;
                }
            }
            this.change();
        },

        /**
         * 区县改变后设置学校数据
         * 发送change事件
         */
        getSchool() {
            this.school = this.zones.find(z => z.value == this.value_zone).child;
            this.value_school = '选择学校';
            if (this.school && this.school.length > 0) {
                this.value_school = this.school[0].value;
            }
            this.change();
        },

        /**
         * 学校数据改变后发送change事件
         */
        selectSchool() {
            this.change();
        }
    },

    created() {
    },

    setup(){},

    emits: ['change'],

    watch: {
        /**
         * org数据为父组件异步结果，监听
         * @param newOrg
         * @param oldOrg
         */
        orgs(newOrg, oldOrg) {
            if (newOrg && newOrg.length > 0) {
                this.org = newOrg;
                let initData = initOrganization(this.org);
                let list_citys = initData.city;
                let list_zone = initData.zone;
                let list_school = initData.school;
                if (this.user && this.user.level && 10000 == this.user.level) {
                    if (list_citys && list_citys.length > 0) {
                        this.citys = list_citys;
                        this.value_city = this.citys[0].value;
                    }
                    if (list_zone && list_zone.length > 0) {
                        this.zones = list_zone;
                        this.value_zone = this.zones[0].value;
                    }
                    if (list_school && list_school.length > 0) {
                        this.school = list_school;
                        this.value_school = this.school[0].value;
                    }
                } else {
                    if (list_citys && list_citys.length > 0) {
                        this.citys = list_citys;
                        if (this.user && this.user.idCity && parseInt(this.user.idCity) > 0) {
                            this.value_city = parseInt(this.user.idCity);
                        }
                        list_zone = list_citys.find(c => c.value == this.value_city).child;
                        if (list_zone && list_zone.length > 0) {
                            this.zones = list_zone;
                            this.value_zone = parseInt(this.user.idZone);
                            list_school = list_zone.find(z => z.value == this.value_zone).child;
                            if (list_school && list_school.length > 0) {
                                this.school = list_school;
                                this.value_school = parseInt(this.user.idSchool);
                            }
                        }
                    }
                }
                if (this.user && this.user.level && 1200 == this.user.level) {
                    this.disabled_city = true;
                    this.disabled_zone = false;
                    this.disabled_school = false;
                }
                if (this.user && this.user.level && 1100 == this.user.level) {
                    this.disabled_city = true;
                    this.disabled_zone = true;
                    this.disabled_school = false;
                }
                if (this.user && this.user.level && 1000 == this.user.level) {
                    this.disabled_city = true;
                    this.disabled_zone = true;
                    this.disabled_school = true;
                }
                if (this.user && this.user.level && 100 == this.user.level) {
                    this.disabled_city = true;
                    this.disabled_zone = true;
                    this.disabled_school = true;
                }
                this.change();
            }
        }
    },

    template: `
    <el-row>
        <el-col :span="8">
            <el-select v-model="value_city" class="m-2" :placeholder="title_citys" :disabled="disabled_city" size="large" @change="getZone">
                <el-option v-for="item in citys" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
        </el-col> 
        <el-col :span="8">
            <el-select v-model="value_zone" class="m-2" :placeholder="title_zones" :disabled="disabled_zone" size="large"  @change="getSchool">
                <el-option v-for="item in zones" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
        </el-col> 
        <el-col :span="8">
            <el-select v-model="value_school" class="m-2" :placeholder="title_schools" :disabled="disabled_school" size="large"  @change="selectSchool">
                <el-option v-for="item in school" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
        </el-col>                  
    </el-row>
    `
}