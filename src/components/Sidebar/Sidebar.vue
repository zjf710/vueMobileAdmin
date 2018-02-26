<template>
  <div class="zeus-sidebar">
    <div :class="classObject">
      <i class="anticon icon-left" v-on:click="showAccountMenu" />
      <span>{{this.$route.name}}</span>
    </div>
    <popup v-model="showAccount" is-transparent>
      <div style="width: 95%;background-color:#fff;margin:0 auto 10px;border-radius:5px;padding-top:20px;">
        <p style="text-align: center;font-size: 20px">{{username}}</p>
        <div style="padding:20px 15px;">
          <zs-button type="primary" @click.native="logout">退出登录</zs-button>
          <zs-button @click.native="showAccount = false">取消</zs-button>
        </div>
      </div>
    </popup>
  </div>
</template>

<script>
  import { environment } from 'app.config';
  import {
    // removeLocalStorageCache,
    getLocalStorageCache
  } from '../utils/CacheService';

  import './index.scss';

  export default {
    name: 'sidebar',
    data() {
      const username = getLocalStorageCache('username');
      return {
        environment,
        username,
        showAccount: false,
        classObject: {
          'zeus-header': true,
          'ios-header-top': this.$root.isiOS
        }
      };
    },
    methods: {
      showAccountMenu() {
        this.$router.go(-1);
        // this.showAccount = true;
      },
      logout() {
        this.$router.go(-1);
        // removeLocalStorageCache('username');
        // removeLocalStorageCache('token');
        // this.$router.push('/login');
      }
    }
  };
</script>
