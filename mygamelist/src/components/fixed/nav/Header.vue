<template>
  <div class="flex-col nav">
    <div class='flex nav-top'>
      <TopNav/> 
    </div>
  </div>
</template>

<script>
import TopNav from './TopNav.vue';

export default {
  name: 'Header',
  components: {
    TopNav
  }
}
</script>
<style>
  
</style>
