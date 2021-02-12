<template>
    <div 
        class='flex carousel-custom-container'
        :style='`
            opacity: ${hideTitle ? `0` : `1`};
            visibility: ${hideTitle ? `hidden` : `visible`}`'

    >
        <div 
            class='flex carousel-card-metadata'
        >
            <p class='carousel-card-title'>{{ game.name }}</p> 
        </div>
    </div>
</template>

<script>
export default {
    name: 'JustTitle',
    props: {
        game : {
            type: Object
        },
        hideTitle : {
            type: Boolean
        },
    }
}
</script>
<style>
</style>