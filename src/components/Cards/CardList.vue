<template>
  <div class="zeus-card-list">
    <h2 v-if="cardList.length > 0" class="card-list-title">{{title}}</h2>
    <p v-else class="zeus-empty-prompt">
      未查到数据
    </p>
    <ul :class="`card-list-container${submit ? ' has-button' : ''}`">
      <li
        v-for="(card, i) in cardList"
        :key="i"
        class="card-container"
        @click="onCardClick(i)"
      >
        <div v-if="check" class="check-item">
          <check-icon :value="checked.indexOf(i) >= 0" />
        </div>
        <div class="card-item">
          <header class="card-header">
            <span>{{card.text}}</span>
            <span class="sub-text">{{card.subText}}</span>
          </header>
          <div class="card-content">
            {{card.content}}
          </div>
          <footer class="card-footer">
            {{card.desc}}
          </footer>
        </div>
        <div v-if="isLink" class="link-item">
          <i class="anticon icon-right" />
        </div>
      </li>
    </ul>

    <div v-if="submit" class="submit-button">
      <zs-button
        type="primary"
        @click.native="onSubmit"
        :disabled="checked.length <= 0"
      >
        {{buttonText || '提交'}}
      </zs-button>
    </div>
  </div>
</template>

<script>
  import { querystring } from 'vux';
  import _ from 'lodash';

  import { submitCompleteDeal } from '../../lib/ComponentCommonMethod';
  import './index.scss';

  export default {
    name: 'card-list',
    props: {
      title: {
        type: String,
        default: '列表'
      },
      url: {
        type: String
      },
      check: {
        type: Boolean,
        default: false
      },
      isLink: {
        type: Boolean,
        default: false
      },
      submit: {
        type: Boolean,
        default: false
      },
      successDirect: {
        type: String
      },
      buttonText: {
        type: String
      },
      linkTo: {
        type: String
      }
    },
    data() {
      return {
        cardList: [],
        checked: []
      };
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
              message
            } = res.data;

            if (status === 200) {
              this.checked = [];
              this.cardList = data;
            } else {
              this.$vux.toast.show({
                type: 'cancel',
                text: message || '服务异常'
              });
            }
          });
      },
      onCardClick(index) {
        // 勾选
        if (this.check) {
          if (this.checked.indexOf(index) >= 0) {
            this.checked = _.filter(this.checked, o => index !== o);
          } else {
            this.checked.push(index);
          }
        } else if (this.linkTo) {
          // 跳转
          this.$router.push(`${this.linkTo}?${querystring.stringify(this.cardList[index])}`);
        }
      },
      onSubmit() {
        if (this.url) {
          const params = [];
          _.map(this.checked, (index) => {
            params.push(this.cardList[index]);
          });
          this.$http.post(`${this.url}?${querystring.stringify(this.$route.query)}`, params)
            .then((res) => {
              submitCompleteDeal.bind(this)(_.get(res, 'data', {}));
            });
        }
      }
    }
  };
</script>
