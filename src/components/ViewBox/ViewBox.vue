<template>
  <div class="zeus-view-box">
    <slot name="header" />
    <div class="view-box-body">
      <slot />
    </div>
    <slot name="bottom" />
  </div>
</template>

<script>
  import './index.scss';

  export default {
    name: 'view-box'
  };
</script>
