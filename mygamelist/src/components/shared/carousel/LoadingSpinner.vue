<template>
  <div 
    :style='`display: ${videoLoaded 
       ? `none`
       : `block`
    }`' 
    class='spinner-wrapper'
  >
        <div class="spinner" data-layer="4">
            <div>
                <div class="spinner-container">
                    <div class="spinner-rotator">
                        <div class="spinner-left">
                            <div class="spinner-circle"></div>
                        </div>
                        <div class="spinner-right">
                            <div class="spinner-circle"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Spinner',
    props: {
        videoLoaded : {
            type: Boolean
        }
    }
}
</script>
<style>
    @import '../../../css/carousel/LoadingSpinner.css';
</style>