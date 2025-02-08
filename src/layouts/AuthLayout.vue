<template>
  <div class="auth-layout">
    <div class="auth-form">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.auth-layout {
  background-image: url('@/assets/img/background.jpg');
  width: 100vw;
  height: 100vh;
  background-size: contain;
  .auth-form {
    background-color: #fff;
    min-width: 300px;
    width: auto;
    height: auto;
    border-radius: 20px;
    padding: 20px;
    position: absolute;
    top: calc(50%);
    left: calc(50%);
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
