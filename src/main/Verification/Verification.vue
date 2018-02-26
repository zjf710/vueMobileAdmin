<template>
  <div style="padding-top: 180px;text-align: center;">{{message}}</div>
</template>

<script>
  import { querystring } from 'vux';
  import { setLocalStorageCache } from '../../components/utils/CacheService';

  export default {
    name: 'verification',
    data() {
      return {
        message: '正在验证......'
      };
    },
    mounted() {
      if (!this.$route.query || !this.$route.query.code) {
        this.message = '验证失败，请退出重试...';
        this.$vux.toast.show({
          text: '验证错误'
        });
        return;
      }
      const {
        router,
        params,
        code,
        state
      } = this.$route.query;

      // 调用验证接口
      this.$http.get(`/authenticate?${querystring.stringify({ code, state })}`)
        .then((res) => {
          const {
            status,
            token,
            expired,
            message
          } = res.data;

          if (status === 200) {
            setLocalStorageCache('token', {
              token,
              expired
            });
            if (router) {
              this.$router.push(`/${router}?${querystring.stringify(JSON.parse(params || {}))}`);
            } else {
              this.$router.push('/');
            }
          } else {
            this.message = '验证失败，请退出重试...';
            this.$vux.toast.show({
              text: message || '验证失败'
            });
          }
        });
    }
  };
</script>
