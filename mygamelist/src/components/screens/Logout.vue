<template>
  <div>
  </div>
</template>
<script>
import { signOutUser } from '../../services/auth'

export default {
  name: 'Logout',
  mounted() {
    this.$store.commit('setUser', false)
    signOutUser()
    this.$router.push({ path: '/' })
  }
}
</script>
