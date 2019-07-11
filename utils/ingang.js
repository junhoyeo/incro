const axios = require('axios');
const api = axios.create({
  baseURL: 'http://dev-api.dimigo.in/'
});

module.exports = {
  async getToken (id, password) {
    return api.post('/auth', {
      id, password
    })
      .then((res) => {
        return res.data.token
      })
  },

  async getIngangs (token) {
    return api.get('/ingang', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        return res.data.ingangs
      })
  },

  async requestIngang (ingang, token) {
    return api.post(`/ingang/${ingang.idx}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        if (res.status === 200)
          return true
        return res.status
      })
      .catch((err) => {
        return err.response.status
      })
  },

  async apply (secret, time) {
    // time is 1 or 2
    return this.getToken(secret.id, secret.password)
      .then((token) => {
        console.log(token)
        return this.getIngangs(token)
          .then((ingangs) => {
            console.log(ingangs)
            return this.requestIngang(ingangs[time - 1], token)
              .then((res) => {
                console.log(res)       
                return res       
              })
          })
      });
  }
};
