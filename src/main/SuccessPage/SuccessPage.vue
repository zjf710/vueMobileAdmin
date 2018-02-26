<template>
  <div class="zeus-success-page">
    <i class="anticon icon-checkcircle" />
    <p class="main-msg">保存成功</p>
    <p class="sub-msg">{{message}}</p>
    <zs-button link="/">
      返回首页
    </zs-button>
  </div>
</template>

<script>
  import _ from 'lodash';
  import './index.scss';

  export default {
    name: 'success-page',
    data() {
      return {
        message: _.get(this.$route, 'query.message', '成功')
      };
    }
  };
</script>
