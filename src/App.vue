<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
html, body, #app, * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: -apple-system,BlinkMacSystemFont,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Segoe UI","PingFang SC","Hiragino Sans GB","Microsoft YaHei","Helvetica Neue",Helvetica,Arial,sans-serif;
}
html, body, #app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.none_panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 5%;
}
.none_panel>.i-icon.icon-none {
  font-size: 300px;
}
.none_panel>span {
  margin-top: 20px;
  font-size: 16px;
  color: #999;
}
</style>
