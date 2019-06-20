<script>
export default {
  data () {
    return {
      form: {
        id: 'hanaro0704',
        ingang: 1
      }
    }
  }
}
</script>

<template>
  <div class="content">
    <div class="request">
      <h1>신청하기</h1>
      <select
        class="request__input"
        v-model="form.id"
      >
        <option value="hanaro0704" selected>1520 여준호</option>
      </select>
      <select
        class="request__input"
        v-model.number="form.ingang"
      >
        <option :value="0">1타임</option>
        <option :value="1" selected>2~3타임</option>
      </select>
      <button class="request__submit">
        인강실 신청
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.request {
  margin: auto;
  width: fit-content;
  text-align: left;

  &__input {
    appearance: none;
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
