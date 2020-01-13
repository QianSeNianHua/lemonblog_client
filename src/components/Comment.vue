<template>
  <footer :class="{ comment: true, focus: animate }">
    <div class="panel">
      <div class="panel-input">
        <textarea
          placeholder="写下你的评论..." :readonly="!isFocus" v-model="word"
          @click="focusHandle" ref="refInput"
        ></textarea>
        <i
          class="emoji" aita-label="icon: smile" v-show="isFocus"
          @click="$emit('emojiClick')"
        >
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
      <div class="panel-info" v-show="!isFocus">
        <div class="comment-info" @click="$emit('toComment')">
          <i class="el-icon-chat-dot-square"></i>
          <label>评论 15</label>
        </div>
        <el-dropdown placement="bottom" trigger="click" @command="dropdownHandle">
          <button class="dropdown-btn">
            <i class="el-icon-more"></i>
          </button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="share">分享文章</el-dropdown-item>
            <el-dropdown-item command="B"></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="panel-btn" v-show="isFocus">
        <el-button
          type="primary" round size="small"
          :disabled="!word"
        >
          发布
        </el-button>
        <el-button round size="small" @click="cancelHandle">取消</el-button>
      </div>
    </div>
  </footer>
</template>

<script>
/**
 * 页面底部评论
 * @event toComment 滚动到评论区位置
 * @event initInput (被父组件调用)input聚焦并且初始化值
 * @event emojiClick 表情库点击事件
 * @event appendInput (被父组件调用)追加input值
 */

let timeId = 0

export default {
  name: 'Comment',
  data () {
    return {
      isFocus: false, // 是否可写评论
      animate: false, // 动画显示
      word: '' // 评论内容
    }
  },
  methods: {
    dropdownHandle (command) {
    },
    // input聚焦
    focusHandle () {
      clearTimeout(timeId)

      this.animate = true
      
      timeId = setTimeout(() => {
        this.isFocus = true
      }, 500)
    },
    // input失焦
    cancelHandle () {
      clearTimeout(timeId)

      if (this.isFocus) {
        this.isFocus = false
        this.animate = false
        this.word = ''
      }
    },
    // 被父组件调用，初始化input值
    initInput (word) {
      this.focusHandle()

      this.$refs.refInput.focus()
      this.word = word
    },
    // 被父组件调用，追加input值
    appendInput (word, isFoucs = false) {
      if (isFoucs) {
        this.$refs.refInput.focus()
      }

      this.word += word
    }
  }
}
</script>

<style lang="less" scoped>
@duration: 0.5s;

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
  transition: all @duration ease;
  
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
    position: relative;

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
      cursor: text;
      transition: all @duration ease;

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
    color: #969696;
    position: absolute;
    top: 26px;
    right: 30px;
    cursor: pointer;
  }
  & .panel-btn {
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-end;
  }
}
</style>
