const axios = require('axios');
const api = axios.create({
  baseURL: 'http://localhost:5000/api/'
});
const moment = require('moment');

api.post('/user', {
  id: 'hanaro0704',
  password: '#include0704',
  name: '여준호'
})
  .then((res) => {
    console.log(res.status)
    const userId = res.data.objectId
    console.log(userId)
    api.post('/job', {
      user: res.data.objectId,
      ingangDate: moment().format('YYYYMMDD'),
      ingangTime: 2
    })
      .then((res) => {
        console.log(res.status)
        console.log(res.data)
      })
  })
