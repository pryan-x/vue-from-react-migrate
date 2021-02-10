<template>
  <div className="flex-col nav">
    <div className='flex nav-top'>
      <TopNav v-bind:userProp="{
          username: 'peepo',
        }"
      /> 
    </div>
  </div>
</template>

<script>
import TopNav from './TopNav.vue';

export default {
  name: 'Header',

  components: {
    TopNav
  },

}
</script>
<style>
  
</style>
