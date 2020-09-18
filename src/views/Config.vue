<template lang="pug">
.c-container
  .c-item
    label 显示边框
    input(type="checkbox")
  .c-item
    label 显示边框
    input(type="checkbox")

  
</template>
<script>
export default {}
</script>
<style scoped>
.c-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  background-color: #333;
  width: 100%;
  height: 100%;
  color: white;
  padding: 20px
}
.c-item {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-right: 20px;
}
</style>
