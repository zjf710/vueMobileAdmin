<template>
  <form
    class="zeus-cards-form"
    @submit="submit"
  >
    <div
      v-for="(form, i) in formCards"
      :key="i"
    >
      <group :title="i === 0 ? title : ''">
        <form-item
          v-for="(item, key) in form"
          :key="key"
          :item="item"
          :groupList="options[item.name]"
          :formItemType="item.cellType"
        />
        <div class="delete-bar" v-if="deletable && fixedItemIndex!== i">
          <i class="anticon icon-delete" @click="deleteItem(i)" />
          <span @click="deleteItem(i)">删除</span>
        </div>
      </group>
    </div>
    <div class="add-bar" v-if="addable">
      <div class="add-container" @click="addItem()">
        <i class="anticon icon-plus" />
      </div>
    </div>
    <group class="button-container">
      <zs-button action-type="submit" type="primary" size="large">
        {{buttonText}}
      </zs-button>
    </group>
  </form>
</template>

<script>
  import _ from 'lodash';
  import { querystring } from 'vux';

  import {
    submitCompleteDeal,
    formValidate
  } from '../../lib/ComponentCommonMethod';
  import FormItem from './FormItem';
  import './index.scss';

  export default {
    name: 'cards-form',
    props: {
      itemTemplates: {
        type: Array,
        default: () => ([])
      },
      id: {
        type: String,
        default: ''
      },
      dataBind: {
        type: Array,
        default: () => ([])
      },
      title: {
        type: String,
        default: ''
      },
      successDirect: {
        type: String
      },
      url: {
        type: String,
        default: ''
      },
      buttonText: {
        type: String,
        default: '提交'
      },
      fixedItemIndex: {
        type: Number
      },
      deletable: {
        type: Boolean,
        default: false
      },
      addable: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        formCards: [],
        options: {}
      };
    },
    components: {
      FormItem
    },
    updated() {
      if (this.id) {
        const data = this.formatParam();
        this.$store.commit({
          type: 'setPageData',
          id: this.id,
          data
        });
      }
    },
    mounted() {
      if (this.url) {
        this.getData();
      }
    },
    methods: {
      getData() {
        this.$http.get(`${this.url}?${querystring.stringify(this.$route.query)}`)
          .then((res) => {
            const {
              status,
              data,
              options,
              message
            } = res.data;

            if (status === 200) {
              this.options = options || {};
              this.formCards = _.map(data, (o) => {
                const form = [];
                _.map(this.itemTemplates, (t) => {
                  const template = _.cloneDeep(t);
                  template.value = o[template.name];
                  form.push(template);
                });

                return form;
              });
            } else {
              this.$vux.toast.show({
                text: message || '服务异常'
              });
            }
          });
      },
      // 验证
      validate(formItemList) {
        for (let i = 0; i < formItemList.length; i += 1) {
          const item = formItemList[i];
          // 验证是否为空
          if (item.required && !item.value) {
            this.$vux.toast.show({
              text: `${item.label}为必填项`
            });
            return false;
          }

          // 如果指定格式，则验证格式
          if (item.regex) {
            const input = _.get(this.$refs[item.name][0], '$refs.formItem');
            // 验证格式
            if (!input.valid) {
              this.$vux.toast.show({
                text: input.firstError,
                time: 2000
              });
              return false;
            }
          }
        }

        return true;
      },
      submit(e) {
        e.preventDefault();
        if (this.formCards.length === 0) {
          return;
        }

        // 验证表单
        for (let i = 0; i < this.formCards.length; i += 1) {
          const formItemList = this.formCards[i];

          if (!formValidate.bind(this)(formItemList)) {
            return;
          }
        }

        if (this.url) {
          let params = this.formatParam();
          // 提交数据绑定其他组件
          if (this.dataBind && this.dataBind.length > 0) {
            params = {
              [this.id]: params
            };
            _.map(this.dataBind, (id) => {
              params[id] = this.$store.state.pageData[id];
            });
          }
          this.$http.post(`${this.url}?${querystring.stringify(this.$route.query)}`, params)
            .then((res) => {
              submitCompleteDeal.bind(this)(_.get(res, 'data', {}));
            });
        }
      },
      deleteItem(index) {
        this.formCards = _.filter(this.formCards, (item, i) => index !== i);
      },
      addItem() {
        const form = [];
        _.map(this.itemTemplates, (t) => {
          const template = _.cloneDeep(t);
          template.value = '';
          if (template.cellType === 'popupSelector') {
            template.groupList = this.options[template.name];
          }
          form.push(template);
        });
        this.formCards.push(form);
      },
      formatParam() {
        const formData = [];
        _.map(this.formCards, (item) => {
          const itemData = {};
          _.map(item, (o) => {
            itemData[o.name] = o.value;
          });
          formData.push(itemData);
        });
        return formData;
      }
    }
  };
</script>
