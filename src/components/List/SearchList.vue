<template>
  <div class="zeus-search-list">
    <search ref="search" :value="keyword" :placeholder="searchPlaceholder" @on-change="onChange" :autoFixed="false" />
    <base-list :listItems="listItems" :url="url" :link="linkTo" :onCellClick="onCellClick" />
  </div>
</template>

<script>
  import _ from 'lodash';
  import { querystring } from 'vux';

  import BaseList from './BaseList';
  import './index.scss';

  export default {
    name: 'search-list',
    components: {
      BaseList
    },
    data() {
      return {
        listItemsOrg: [],
        listItems: [],
        keyword: ''
      };
    },
    props: {
      url: {
        type: String,
        default: ''
      },
      linkTo: {
        type: String
      },
      itemList: {
        type: Array
      },
      searchPlaceholder: {
        type: String,
        default: '请输入关键词搜索'
      },
      onCellClick: {
        type: Function
      }
    },
    methods: {
      onChange(value) {
        this.keyword = value;
        this.listItems = _.filter(this.listItemsOrg, item => (
          item.text.toLowerCase().indexOf(value.toLowerCase()) >= 0
        ));
      },
      onClick(...arg) {
        this.onChange('');
        if (this.onCellClick) {
          this.onCellClick(...arg);
        }
      }
    },
    mounted() {
      if (this.itemList) {
        this.listItemsOrg = this.itemList;
        this.listItems = this.itemList;
      }
      if (this.url) {
        this.$http.get(`${this.url}?${querystring.stringify(this.$route.query)}`)
          .then((res) => {
            const {
              status,
              data,
              message
            } = res.data;

            if (status === 200) {
              this.listItemsOrg = data;
              this.listItems = data;
            } else {
              this.$vux.toast.show({
                text: message || '服务异常'
              });
            }
          });
      }
    },
    watch: {
      itemList() {
        this.listItemsOrg = this.itemList;
        this.listItems = this.itemList;
      }
    }
  };
</script>
