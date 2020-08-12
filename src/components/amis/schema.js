const json = [
  {
    type: 'mis-form',
    api: 'http://dev.bendi.ad.weibo.com:3000/api/list/12/3000',
    controls: [
      {
        type: 'mis-input',
        name: 'email',
        label: '邮箱',
        value: '',
        rules: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: ['blur', 'change'],
          },
        ],
      },
      {
        type: 'mis-input',
        name: 'age',
        label: '年龄',
        value: '',
        rules: [
          { required: true, message: '年龄不能为空' },
          { type: 'number', message: '年龄必须为数字值' },
        ],
      },
      {
        type: 'mis-input',
        name: 'input',
        label: 'input',
        value: 'mis',
        props: {
          placeholder: '请选择日期',
          'suffix-icon': 'el-icon-date',
        },
        visibleOn: 'switchs == true',
      },
      {
        type: 'mis-select',
        name: 'select',
        label: '选择框',
        disabledOn: 'switchs == false',
        options: [
          {
            value: '选项1',
            text: '黄金糕',
          },
          {
            value: '选项2',
            text: '双皮奶',
          },
          {
            value: '选项3',
            text: '蚵仔煎',
          },
        ],
      },
      {
        type: 'mis-checkbox',
        name: 'checkbox',
        options: [
          {
            value: '1',
            text: '龙须面',
          },
          {
            value: '2',
            text: '北京烤鸭',
          },
        ],
      },
      {
        type: 'mis-radio',
        name: 'radio',
        options: [
          {
            value: '1',
            text: '龙须面',
          },
          {
            value: '2',
            text: '北京烤鸭',
          },
        ],
      },
      {
        type: 'mis-switch',
        name: 'switchs',
        label: '开关',
        value: false,
      },
      {
        type: 'mis-button',
        text: '按钮',
        loading: true,
      },
    ],
  },
]

export default json
