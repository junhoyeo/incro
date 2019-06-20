<script>
export default {
  data () {
    return {
      form: {
        id: '',
        password: '',
        name: '',
        serial: ''
      }
    }
  },
  methods: {
    onSubmit () {
      this.$api.post('http://dev-api.dimigo.in/auth', {
        id: this.form.id,
        password: this.form.password
      })
        .then((res) => {
          this.$api.get('http://dev-api.dimigo.in/user/jwt', {
            headers: {
              Authorization: `Bearer ${res.data.token}`
            }
          })
            .then((res) => {
              this.form.name = res.data.name
              this.form.serial = res.data.serial
            })
            .catch((err) => {
              this.$swal('에러!', err.message, 'error')
            })
        })
        .catch((err) => {
          this.$swal('에러!', err.message, 'error')
        })
    }
  }
}
</script>

<template>
  <div class="content">
    <div class="join">
      <h1>등록하기</h1>
      <input
        type="text"
        class="join__input"
        placeholder="디미고 아이디"
        v-model.trim="form.id"
        @keyup.enter="onSubmit"
      />
      <input
        type="password"
        class="join__input"
        placeholder="디미고 비밀번호"
        v-model.trim="form.password"
        @keyup.enter="onSubmit"
      />
      <button class="join__submit" @click="onSubmit">
        사용자 추가
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.join {
  margin: auto;
  width: fit-content;
  text-align: left;

  &__input {
    box-sizing: border-box;
    width: 290px;
    display: block;
    font-size: 1.5em;
    padding: 10px;
    padding-left: 15px;
    border-radius: 50px;
    border: none;
    margin-bottom: 0.2em;
    background-color: #f3f3f3;
  }

  &__submit {
    width: 100%;
    font-size: 1.2em;
    padding: 8px;
    border-radius: 50px;
    background: linear-gradient(to right, #ffc3a088, #FFAFBD88);
    border: none;
    color: black;
    cursor: pointer;
  }
}
</style>
