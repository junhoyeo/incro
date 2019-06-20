<template>
  <div id="app">
    <div class="navbar">
      <span class="navbar__title"><i class="fas fa-keyboard" /> 인강실 자동 신청</span>
      <div class="navbar__menu">
        <router-link :to="{ name: 'index' }" class="navbar__cell">
          신청 현황
        </router-link>
        <router-link :to="{ name: 'request' }" class="navbar__cell">
          인강실 신청
        </router-link>
        <router-link :to="{ name: 'join' }" class="navbar__cell">
          사용자 등록
        </router-link>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
@import url('https://spoqa.github.io/spoqa-han-sans/css/SpoqaHanSans-kr.css');

html, body {
  margin: 0;
  padding: 0;
}

*:focus {
  outline: none;
}

#app {
  height: 100%;
  font-family: 'Spoqa Han Sans', 'Sans-serif';
}

.navbar {
  background: linear-gradient(to right, #ffc3a0, #FFAFBD);
  padding: 1.5em;

  &__title {
    font-size: 2em;
    font-weight: bold;
  }

  &__menu {
    float: right;
  }

  &__cell {
    color: black;
    text-decoration: none;
    margin-left: 0.5em;
  }

  &__cell:focus {
    color: rgb(43, 43, 43);
  }
}

.content {
  text-align: center;
}
</style>
