<template>
  <div class="content">
    <div class="request">
      <h1>신청하기</h1>
      <select class="request__input">
        <option selected>1520 여준호</option>
      </select>
      <select class="request__input">
        <option>1타임</option>
        <option selected>2~3타임</option>
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
    background: linear-gradient(to right, #ffc3a088, #FFAFBD88);
  }

  &__submit {
    width: 100%;
    font-size: 1.2em;
    padding: 8px;
    border-radius: 50px;
    background-color: black;
    border: none;
    color: white;
    cursor: pointer;
  }
}
</style>
