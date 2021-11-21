<template>
  <table class="table mt-3">
    <thead>
      <slot name="head"> </slot>
    </thead>
    <transition-group appear tag="tbody" name="table-list">
      <slot></slot>
    </transition-group>
  </table>
</template>

<script>
export default {};
</script>

<style scoped>
/* table animation in App.vue */
</style>
