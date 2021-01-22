module.exports = {
  // GET 可忽略

  'GET /mock/cakeChart': {
    "msg": '错误信息',
    "code": "200",
    body: [
      {
        name: 'text1',
        type: 'chatTime',
        children: {
          id: Math.random(),
          data: [
            { type: 'car', value: 93.33 },
            { type: 'phone', value: 6.67 }
          ]
        },
      },
    ],
  },

}
