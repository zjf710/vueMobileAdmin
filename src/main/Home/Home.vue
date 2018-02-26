<template>
  <view-box class="zeus-home">
    <Sidebar v-if="$root.environment === 'development'" />
    <popup v-if="$root.environment === 'development'" v-model="showMenu" is-transparent>
      <div style="width: 95%;background-color:#fff;margin:0 auto 10px;border-radius:5px;padding-top:20px;">
        <div style="padding:20px 15px;">
          <zs-button @click.native="showMenu = false">取消</zs-button>
        </div>
      </div>
    </popup>
    <router-view class="child-view" />
  </view-box>
</template>

<script>
  import Sidebar from '../../components/Sidebar/Sidebar';

  export default {
    name: 'home',
    components: {
      Sidebar
    },
    data() {
      return {
        showMenu: false
      };
    }
  };
</script>
