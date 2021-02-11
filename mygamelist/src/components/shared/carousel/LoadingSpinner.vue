<template functional>
  <div className='spinner-wrapper'>
        <div className="spinner" data-layer="4">
            <div>
                <div className="spinner-container">
                    <div className="spinner-rotator">
                        <div className="spinner-left">
                            <div className="spinner-circle"></div>
                        </div>
                        <div className="spinner-right">
                            <div className="spinner-circle"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Spinner'
}
</script>
<style>
    @import '../../../css/carousel/LoadingSpinner.css';
</style>