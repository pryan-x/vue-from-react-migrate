<template>
    <div 
        class='flex carousel-custom-container'
        :style='`
            opacity: ${hideTitle ? `0` : `1`};
            visibility: ${hideTitle ? `hidden` : `visible`}`'

    >
    <!-- (videoFocused === game.id && playing) true/false result for title display transistion -->
    <!-- if video is videoFocused, and currently playing pass true (dont display) -->
    <!-- if video is playing, dont hide title -->
        <div 
            class='flex carousel-card-metadata'
        >
            <p class='carousel-card-title'>{{ game.name }}</p> 
            <!-- {{this.carouselType === 'smaller' 
                ? <p class='carousel-card-title'>{props.game.name}</p> 
                : <router-link
                    class='carousel-card-title'
                    to={`/game/${game.id}`}
                >{game.name}</router-link>
            }} -->
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