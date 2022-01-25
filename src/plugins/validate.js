// vee-vaildate插件表单验证功能
import Vue from 'vue'
import validate from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN'//引入中文版本
Vue.use(validate)

//表单验证
validate.Validator.localize('zh_CN', {
    messages: {
        ...zh_CN.messages,//zh_CN表示中文信息
        password: () => '555',
        is: (field) => `${field}必须与密码相同`,//修改内置规则的message，使其必须与密码相同
        required: (field) => "请输入" + field
    },
    attributes: {//给表单验证的filed属性映射中文名
        phone: '手机号',
        code: '验证码',
        password: '密码',
        againPassword: '再次确认密码',
        agree: '用户协议',
    }
})

// validate.Validator.updateDictionary(dictionary);
// 自定义规则
validate.Validator.extend('tphone', {
    getMessage: field => field + '必须是11位手机号码',
    validate: value => {
        return value.length == 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
    }
});
validate.Validator.extend('agree', {
    getMessage: field => field + '必须勾选',
    validate: value => {
        return value==true
    }
});
validate.Validator.extend('tpassword', {
    getMessage: field => field + '至少8-16个字符、1个大写字母、1个小写字母和1个数字',
    validate: value => {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/.test(value)
    }
});
