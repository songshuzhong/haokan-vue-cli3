const json = [
  {
    renderer: 'mis-form',
    api: 'http://dev.bendi.ad.weibo.com:3000/api/upload',
    controls: [
      {
        renderer: 'mis-input',
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
        renderer: 'mis-input',
        name: 'age',
        label: '年龄',
        value: '',
        rules: [{ required: true, message: '年龄不能为空' }],
      },
      {
        renderer: 'mis-input',
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
        renderer: 'mis-select',
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
        renderer: 'mis-datepicker',
        name: 'date',
        label: '日期',
      },
      {
        renderer: 'mis-checkbox',
        name: 'checkbox',
        label: '主食',
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
        renderer: 'mis-radio',
        name: 'radio',
        label: '餐具',
        options: [
          {
            value: '1',
            text: '需要',
          },
          {
            value: '2',
            text: '不需要',
          },
        ],
      },
      {
        renderer: 'mis-switch',
        name: 'switchs',
        label: '配送',
        value: false,
      },
      {
        renderer: 'mis-button',
        text: '按钮',
      },
    ],
  },
]

export default json
