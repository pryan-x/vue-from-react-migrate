<template>
  <div id="app">
    <Header />
      <div class='flex-col page-background'>
        <PageHeader pageHeader='Welcome'/>
        <div class='page-container'>
          <router-view :user='storedUser'/>
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
  data() {
    return {
      user: undefined
    }
  },
  components: {
    Header,
    PageHeader,
    Footer
  },
  computed: {
    storedUser () {
        return this.$store.state.user
    }
  },
  async created() {
    this.$store.dispatch('getHomepageData')
    this.$store.dispatch('getUser')
  },
}

</script>

<style>
  @import './css/shared/Reset.css';
  @import './css/shared/Flex.css';
  @import './css/base/Container.css';
</style>
