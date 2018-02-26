<template>
  <cell
    :title="title"
    @click.native="onCellClick"
    is-link
  >
    <span>{{value || placeholder}}</span>
    <popup
      v-model="showPopup"
      :show-mask="false"
      :hide-on-blur="false"
      height="100%"
      style="text-align: initial;color: #121212;"
    >
      <search-group-list
        v-if="type === 'group'"
        ref="list"
        :groupList="groupList"
        :searchPlaceholder="searchPlaceholder"
        :onCellClick="onListCellClick"
      />
      <search-list
        v-else
        ref="list"
        :itemList="groupList"
        :searchPlaceholder="searchPlaceholder"
        :onCellClick="onListCellClick"
      />
    </popup>
  </cell>
</template>

<script>
  import SearchList from '../List/SearchList';
  import SearchGroupList from '../List/SearchGroupList';

  export default {
    name: 'popup-selector',
    components: {
      SearchList,
      SearchGroupList
    },
    props: {
      onChange: {
        type: Function
      },
      groupList: {
        type: Array,
        default: () => ([])
      },
      placeholder: {
        type: String,
        default: ''
      },
      searchPlaceholder: {
        type: String,
        default: ''
      },
      title: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: 'base'
      },
      value: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        showPopup: false
      };
    },
    methods: {
      onListCellClick(item, group) {
        this.showPopup = false;
        this.onChange(item, group);
      },
      onCellClick(e) {
        // 点击的是搜索，则不处理
        if (!this.$refs.list.$refs.search.$el.contains(e.target)) {
          this.showPopup = !this.showPopup;
        }
      }
    }
  };
</script>
