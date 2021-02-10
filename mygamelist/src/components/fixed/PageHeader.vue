<template>
  <div class='flex page-header'>
        <p class='page-name-text'>
        {{pageHeader}}
        </p>
    </div>
</template>

<script>
export default {
    name: 'PageHeader',
    props: {
        pageHeader:{
            type: String,
        },
    },
}
</script>
<style>
  @import '../../css/base/PageHeader.css';
</style>
