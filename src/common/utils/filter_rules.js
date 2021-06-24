import { isvalidMobile, regexn, noFuNumber } from "$common/utils/validate";

export default {
  install(Vue) {
    /**
     * 注意: 定义type 规则时 不用做非空验证
     * 只需要传入 required:true 即可
     * */

    /* 验证非负数 */

    const isnoFuNumber = (rule, value, callback) => {
      if (value != null && value !== "") {
        if (!noFuNumber(value)) {
          callback(new Error("请输入非负数的数字!"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };

    /* 验证手机号 */

    const isvalidateMobile = (rule, value, callback) => {
      if (value != null && value !== "") {
        if (!isvalidMobile(value)) {
          callback(new Error("请输入正确的手机号码!"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };

    /* 含有非法字符(只能输入中文、英文、数字) */

    const isvalidateRegexn = (rule, value, callback) => {
      if (value != null && value !== "") {
        if (!regexn(value)) {
          callback(new Error("含有非法字符(只能输入中文、英文、数字)!"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };

    /* 请输入正整数 */

    // const isvalidateInteger= (rule, value, callback) => {

    // if (value != null && value != "") {

    // if (!integer(value)) {

    // callback(new Error('请输入正整数!'))

    // } else {

    // callback()

    // }

    // }

    // else {

    // callback();

    // }

    // }

    /**
     * 参数 item
     * required true 必填项
     * maxLength 字符串的最大长度
     * min 和 max 必须同时给 min < max type=number
     * type 手机号 mobile
     * 邮箱 email
     * 网址 url
     * 各种自定义类型 定义在 src/utils/validate 中 持续添加中.......
     * */

    Vue.prototype.filter_rules = function(item) {
      let rules = [];

      if (item.required) {
        rules.push({
          required: true,
          message: "该输入项为必填项!",
          trigger: "blur",
        });
      }

      if (item.maxLength) {
        rules.push({
          min: 1,
          max: item.maxLength,
          message: "最多输入" + item.maxLength + "个字符!",
          trigger: "blur",
        });
      }

      if (item.min && item.max) {
        rules.push({
          min: item.min,
          max: item.max,
          message: "字符长度在" + item.min + "至" + item.max + "之间!",
          trigger: "blur",
        });
      }

      if (item.type) {
        let type = item.type;

        switch (type) {
          // case 'email':

          // rules.push({ type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' })

          // break isnoFuNumber

          case "activeOrder":
            rules.push({ validator: isnoFuNumber, trigger: "blur" });

            break;

          case "mobile":
            rules.push({ validator: isvalidateMobile, trigger: "blur" });

            break;

          case "name":
            rules.push({
              validator: isvalidateRegexn,
              message: "请输入正确的用户姓名",
              trigger: "blur",
            });

            break;

          case "password":
            rules.push({
              validator: isvalidateRegexn,
              message: "请输入密码",
              trigger: "blur",
            });

            break;

          case "org_name":
            rules.push({
              validator: isvalidateRegexn,
              message: "机构名称不能包含特殊字符",
              trigger: "blur",
            });

            break;

          default:
            rules.push({});

            break;
        }
      }

      return rules;
    };
  },
};
