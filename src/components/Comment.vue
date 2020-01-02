<template>
  <footer class="comment focus">
    <div class="panel">
      <div class="panel-input">
        <textarea placeholder="写下你的评论..."></textarea>
        <i class="emoji" aita-label="icon: smile">
          <svg 
            viewBox="64 64 896 896"
            width="1em" height="1em"
            fill="currentColor"
            aria-hidden="true"
            data-icon="smile"
          >
            <path d="M288 421a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm352 0a48 48 0 1 0 96 0 48 48 0 1 0-96 0zM512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm263 711c-34.2 34.2-74 61-118.3 79.8C611 874.2 562.3 884 512 884c-50.3 0-99-9.8-144.8-29.2A370.4 370.4 0 0 1 248.9 775c-34.2-34.2-61-74-79.8-118.3C149.8 611 140 562.3 140 512s9.8-99 29.2-144.8A370.4 370.4 0 0 1 249 248.9c34.2-34.2 74-61 118.3-79.8C413 149.8 461.7 140 512 140c50.3 0 99 9.8 144.8 29.2A370.4 370.4 0 0 1 775.1 249c34.2 34.2 61 74 79.8 118.3C874.2 413 884 461.7 884 512s-9.8 99-29.2 144.8A368.89 368.89 0 0 1 775 775zM664 533h-48.1c-4.2 0-7.8 3.2-8.1 7.4C604 589.9 562.5 629 512 629s-92.1-39.1-95.8-88.6c-.3-4.2-3.9-7.4-8.1-7.4H360a8 8 0 0 0-8 8.4c4.4 84.3 74.5 151.6 160 151.6s155.6-67.3 160-151.6a8 8 0 0 0-8-8.4z"></path>
          </svg>
        </i>
      </div>
      <div class="panel-info">
        <div class="comment-info">
          <i class="el-icon-chat-dot-square"></i>
          <label>评论 15</label>
        </div>
        <el-dropdown placement="bottom" trigger="click" @command="dropdown">
          <button class="dropdown-btn">
            <i class="el-icon-more"></i>
          </button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="share">分享文章</el-dropdown-item>
            <el-dropdown-item command="B"></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Comment',
  methods: {
    dropdown (command) {
    }
  }
}
</script>

<style lang="less" scoped>
footer.comment {
  height: 56px;
  position: fixed;
  left: 0px;
  right: 0px;
  bottom: 0px;
  z-index: 100px;
  background-color: white;
  box-shadow: 0px -2px 7px 0px rgba(0,0,0,0.1);
  user-select: none;
  
  &>.panel {
    width: 730px;
    height: inherit;
    margin: 0px auto;
    padding: 10px 16px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
  .panel-input {
    flex-shrink: 0;

    &>textarea {
      padding: 8px 18px;
      width: 400px;
      height: 36px;
      font-size: 14px;
      line-height: 20px;
      border-radius: 20px;
      margin-right: 16px;
      background-color: #f2f2f2;
      border: none;
      resize: none;
      outline: 0;
      color: #404040;

      &::-webkit-input-placeholder {
        color: #999;
      }
    }
  }
  .panel-info {
    height: 22px;
    line-height: 22px;
    flex-shrink: 0;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    color: #969696;

    &>:not(:last-child) {
      margin-right: 24px;
    }
    &>.comment-info {
      font-size: 14px;
      cursor: pointer;

      &>i {
        font-size: 22px;
        vertical-align: middle;
        margin-right: 8px;
      }
      &>label {
        cursor: pointer;
      }
    }
    & .dropdown-btn {
      width: 22px;
      height: 22px;
      cursor: pointer;
      outline: none;
      border: none;
      background-color: initial;
      color: #969696;
      font-size: 16px;
    }
  }
}
footer.comment.focus {
  height: 76px;

  & textarea {
    width: 560px;
    height: 56px;
    padding: 8px 80px 8px 18px;
    border-radius: 4px;
  }
  & i.emoji {
    font-size: 20px;
    font-weight: bold;
  }
}
</style>
