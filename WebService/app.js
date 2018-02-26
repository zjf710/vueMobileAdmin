const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Cache-Control,Zeus-Token');
  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    return res.end();
  }
  return next();
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/pipeline/index', (req, res) => {
  const data = [];
  for (let i = 0; i < 50; i += 1) {
    data.push({
      text: parseFloat(Math.random() * 100).toFixed(3),
      name: `name_${Math.random()}`,
      value: Math.random()
    });
  }
  res.send({
    status: 200,
    data,
    message: '用户名密码错误'
  });
});

app.get('/clients', (req, res) => {
  const data = [];
  for (let i = 0; i < 50; i += 1) {
    data.push({
      text: parseFloat(Math.random() * 100).toFixed(3),
      name: `name_${Math.random()}`,
      value: Math.random()
    });
  }
  res.send({
    status: 200,
    data,
    message: '用户名密码错误'
  });
});

app.get('/tags', (req, res) => {
  const data = [];
  for (let i = 0; i < 10; i += 1) {
    const group = {
      groupTitle: `title_${parseFloat(Math.random() * 100).toFixed(3)}`,
      name: `n_${parseFloat(Math.random() * 100).toFixed(3)}`,
      value: `v_${parseFloat(Math.random() * 100).toFixed(3)}`,
      items: []
    };

    for (let j = 0; j < Math.random() * 20; j += 1) {
      group.items.push({
        text: parseFloat(Math.random() * 100).toFixed(3),
        name: `name_${Math.random()}`,
        value: Math.random()
      });
    }

    data.push(group);
  }
  res.send({
    status: 200,
    data,
    message: '用户名密码错误'
  });
});

app.get('/pipeline/bill_info', (req, res) => {
  setTimeout(() => {
    res.send({
      status: 200,
      data: {
        company: `company_${Math.random()}`,
        tag: `tag_${Math.random()}`,
        auth: `auth_${Math.random()}`,
        default_pipeline: `router_${Math.random()}`,
        tag_id: `tag_id_${Math.random()}`
      },
      message: '用户名密码错误'
    });
  }, 30);
});

app.get('/auth_charge', (req, res) => {
  setTimeout(() => {
    res.send({
      status: 200,
      data: {
        company: `company_${Math.random()}`,
        tag: `tag_${Math.random()}、tag_${Math.random()}、tag_${Math.random()}`,
        auth: `auth_${Math.random()}`,
        left_count: parseInt(Math.random() * 100, 10)
      },
      message: '用户名密码错误'
    });
  }, 30);
});

app.get('/pipeline/routes', (req, res) => {
  setTimeout(() => {
    res.send({
      status: 200,
      data: [{
        weight: parseInt(Math.random() * 100, 10),
        provider: {
          text: 'asdasdasdasd',
          value: 0,
          desc: 'rkremark'
        }
      }, {
        weight: parseInt(Math.random() * 100, 10),
        provider: {
          text: 'bbb',
          value: 0,
          desc: 'aaaa'
        }
      }],
      options: {
        provider: [{
          text: 'lkjlkjlklkjlkjl',
          value: 0,
          desc: 'remarkremarkremarkremark'
        }, {
          text: 'iuyieruywiruyw',
          value: 1,
          desc: 'remarkrark'
        }]
      },
      message: '用户名密码错误'
    });
  }, 40);
});

app.get('/provider_cache', (req, res) => {
  if (req.query && req.query.tag !== undefined) {
    setTimeout(() => {
      const data = [];
      for (let i = 0; i < 10; i += 1) {
        data.push({
          text: 'PDC',
          subText: '2017-10-27  12:21:13',
          content: 'Redq格式返回内容：{summary”:{“is_certify_user”:{“value”:1}}}',
          desc: '聚合及信联银行卡四要素一致数据',
          value: i
        });
      }

      res.send({
        status: 200,
        data,
        message: '用户名密码错误'
      });
    }, 300);
    return;
  }
  setTimeout(() => {
    const data = [];
    for (let i = 0; i < 10; i += 1) {
      const group = {
        groupTitle: `title_${parseFloat(Math.random() * 100).toFixed(3)}`,
        name: `n_${parseFloat(Math.random() * 100).toFixed(3)}`,
        value: `v_${parseFloat(Math.random() * 100).toFixed(3)}`,
        items: []
      };

      for (let j = 0; j < Math.random() * 20; j += 1) {
        group.items.push({
          text: parseFloat(Math.random() * 100).toFixed(3),
          name: `name_${Math.random()}`,
          value: Math.random()
        });
      }

      data.push(group);
    }

    res.send({
      status: 200,
      data: {},
      options: {
        tag: data
      },
      message: '用户名密码错误'
    });
  }, 50);
});

app.get('/auth_info', (req, res) => {
  setTimeout(() => {
    const data = [];
    for (let i = 0; i < 10; i += 1) {
      data.push({
        text: 'ac_14a10be213455',
        content: '手机在网时长、手机实名认证、手机状态',
        desc: '剩余次数:111',
        value: i
      });
    }

    res.send({
      status: 200,
      data,
      message: '用户名密码错误'
    });
  }, 300);
});

app.get('/pipeline_switch', (req, res) => {
  setTimeout(() => {
    res.send({
      status: 200,
      data: {
        current_provider: 'Provider Now',
        alternate_provider: 'Provider Next',
        tag: '银行卡三要素',
        rule: '10分钟内异常率高于10%'
      },
      message: '用户名密码错误'
    });
  }, 300);
});

app.post('/pipeline_switch', (req, res) => {
  setTimeout(() => {
    res.send({
      status: 200,
      message: '成功切换至供应商Provide Next'
    });
  }, 300);
});

app.get('/authenticate', (req, res) => {
  setTimeout(() => {
    res.send({
      status: 200,
      token: 'aasasdasdasdasdasdasdddddd',
      expired: new Date().getTime() + 11111111111111,
      message: '用户名密码错误'
    });
  }, 500);
});

app.post('/pipeline/routes', (req, res) => {
  setTimeout(() => {
    res.send({
      status: 200,
      message: '切换路由成功111'
    });
  }, 500);
});

app.post('/provider_cache', (req, res) => {
  setTimeout(() => {
    res.send({
      status: 200,
      message: '删除成功'
    });
  }, 500);
});

app.post('/auth_charge', (req, res) => {
  setTimeout(() => {
    res.send({
      status: 200,
      message: '充值成功'
    });
  }, 500);
});

const server = app.listen(3000, () => {
  const {
    address,
    port
  } = server.address();

  console.log('Example app listening at http://%s:%s', address, port);
});
