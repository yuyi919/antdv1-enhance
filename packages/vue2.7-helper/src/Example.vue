<template>
  <App :a="1" @input1=""></App>
  <App2 ></App2>
</template>
<script lang="ts" setup>
import { App, App2 } from "./example";
</script>
