<template>
  <teleport to="body">
    <div class="custom-toast">
      <h1>successful!</h1>
    </div>
  </teleport>
</template>

<style scoped>
.custom-toast {
  position: absolute;
  right: 0;
  bottom: 0;
  padding: 1rem 2rem;
  margin-right: 1rem;
  background-color: darkslategray;
  color: #fff;
}
</style>
