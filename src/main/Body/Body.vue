<template>
  <div class="zeus-business-container">
    <component
      v-for="(currentView, key) in currentViews"
      :key="key"
      :is="currentView.component"
      v-bind="currentView.props"
    >
      <!-- 组件在 vm.currentview 变化时改变！ -->
    </component>
  </div>
</template>

<script>
  import ZsFilter from '../../components/Filter/ZsFilter';
  import CardList from '../../components/Cards/CardList';
  import DefaultForm from '../../components/Form/DefaultForm';
  import FormGroup from '../../components/Form/FormGroup';
  import SearchList from '../../components/List/SearchList';
  import SearchGroupList from '../../components/List/SearchGroupList';
  import './index.scss';

  // 组件注册
  const components = {
    ZsFilter,
    CardList,
    DefaultForm,
    SearchList,
    FormGroup,
    SearchGroupList
  };

  export default {
    name: 'Body',
    props: {
      componentList: {
        type: Array,
        default: () => ([])
      }
    },
    data() {
      const currentViews = this.getProps();
      return {
        currentViews
      };
    },
    components,
    methods: {
      getProps() {
        const currentViews = [];

        // 渲染对应组件
        this.componentList.forEach((componentProps) => {
          currentViews.push({
            props: componentProps,
            component: components[componentProps.component]
          });
        });

        return currentViews;
      }
    },
    watch: {
      $route() {
        this.currentViews = this.getProps();
      }
    }
  };
</script>
