<template>
  <div class="content">
    <div class="join">
      <h1>등록하기</h1>
      <input class="join__input" placeholder="디미고 아이디" />
      <input class="join__input" placeholder="디미고 비밀번호" />
      <button class="join__submit">
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
