/**
 * Created by zhaozailin on 2017/1/10.
 */
// 初始化
const init = (domArray, config) => {

    // 初始化配置信息
    let curConfig = initConfig(config);

    domArray.each((idx, domObj) => {
        handlePerDom($(domObj), curConfig);
    });
};

// 初始化配置信息
const initConfig = (config) => {

    // 默认配置
    let defaultConfig = {

        // 是否可为负
        negative: true,

        // 整数位数
        intSize: 12,

        // 小数位数
        decimalSize: 0
    };

    // 组装自定义配置与当前默认配置
    if (config) {
        return Object.assign({}, defaultConfig, config);
    }

    return defaultConfig;
};

// 复原
const resetVal = (oriVal, e) => {
    e.target.value = oriVal;
    return false;
};

// 处理单个元素
const handlePerDom = (dom, config) => {
    let oriVal = dom.val();

    // 默认值非数字时转为空
    if (isNaN(oriVal)) {
        oriVal = '';
    }

    // 监控oninput事件
    dom.on('input', (e) => {
        let curVal = e.target.value;

        // 检验最基本的数字格式
        if (!/^[-]?[\.|\d]*$/.test(curVal)) {
            return resetVal(oriVal, e);
        }

        // 校验正号
        if (!config.negative && /[-]+/g.test(curVal)) {
            return resetVal(oriVal, e);
        }

        // 首先保证只有一个小数点
        if (curVal.indexOf('.') !== curVal.lastIndexOf('.')) {
            return resetVal(oriVal, e);
        }

        var valArray = curVal.split('.');

        // 小数位长度为0
        if (config.decimalSize === 0 && curVal.indexOf('.') !== -1) {
            return resetVal(oriVal, e);
        }

        // 超过小数位长度
        if (valArray.length > 1 && valArray[1].length > config.decimalSize) {
            return resetVal(oriVal, e);
        }

        // 超过整数位长度
        if (valArray[0].length > config.intSize) {
            return resetVal(oriVal, e);
        }

        oriVal = curVal;
    });
};

export default {init};

// 兼容es5
window.inputNumberEs5 = {
    init: init
};