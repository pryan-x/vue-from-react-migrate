<template>
  <div id="app">
    <Header />
      <div class='flex-col page-background'>
        <PageHeader pageHeader='Welcome'/>
        <div class='page-container'>
          <router-view />
        </div>
      </div>
    <Footer />
  </div>
</template>

<script>
import Header from './components/fixed/nav/Header.vue'
import PageHeader from './components/fixed/PageHeader.vue'
import Footer from './components/fixed/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    PageHeader,
    Footer
  },
  async created() {
    this.$store.dispatch('getHomepageData')
  },
}

</script>

<style>
  @import './css/shared/Reset.css';
  @import './css/shared/Flex.css';
  @import './css/base/Container.css';
</style>
