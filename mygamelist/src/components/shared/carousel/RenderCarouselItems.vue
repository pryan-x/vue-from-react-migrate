<template>
    <div style='all: inherit;'>
    <Fragment v-if='carouselType === `video`'>
        <div 
            v-for='(game, index) in carouselItems'
            v-bind:item='game'
            v-bind:key='game.id'

            class='flex-col carousel-card video'
        >
            <div 
                :class='`flex-col carousel-card-content-wrapper ${
                    videoFocused === game.id && !carouselShiftAnimation
                        ? `focused` 
                        : ``
                } ${ 
                    index === centerVideoIndex 
                    ? `center`
                        : index < centerVideoIndex 
                            ? `left` 
                            : `right`
                }`' 
                @click='shiftCarousel($event)'
            >
                <!-- <HandleVideoFocusRendering 
                    { ...props }
                    game={ game }
                    id={ id }
                /> -->
                <!-- const HandleVideoFocusRendering = (props) => {
    const {        
        // helpers
        focusVideo,
        handleVideoLoad,
        setPlaying,
        
        // state objs
        carouselShiftAnimation,
        videoFocused,
        videoLoaded,
        preFocusIndex,
        id, 
        game
    } = props -->
        <template v-if='videoFocused === index'>
        <!-- render this when a thumbnail has been focused (clicked on) -->
            <div class='carousel-video-container' >
                <Spinner 
                    :style='` 
                        display: 
                            ${videoLoaded  ? `none` : `block`}
                    `'
                />
                <youtube 
                    :video-id="game.videos[0].video_id" 
                    :player-vars="playerVars" 
                    :ready='handleReady()'
                    :paused='handlePause()'
                    :playing='handlePlay()'
                />
                <!-- <ReactPlayer 
                    class='carousel-video-player'
                    url={`https://www.youtube.com/watch?v=${game.videos[0].video_id}`} 
                    onReady={ handleVideoLoad }	
                    onPause={ () => setPlaying(false) }
                    onPlay={ () => setPlaying(true) }
                    playing={ true }
                    muted={true}
                    controls
                    width='100%'
                    height='100%'
                /> -->
                <img 
                    class='carousel-card-img disable-select'
                    draggable='false'
                    :src="videoThumbnail(game)" 
                    alt='img'
                    :style='`
                        opacity: ${!videoLoaded 
                            ? `1`
                            : carouselShiftAnimation 
                                ? `1`
                                : `0`}
                    `'
                />    
                    <!-- maybe templat here -->
                    <div v-if='carouselShiftAnimation' class='carousel-play-img-wrapper'>
                        <img 
                            draggable='false'
                            class='carousel-play-img disable-select opacity-transition-play-icon'
                            :src='require("../../../resources/img/play.png")'
                            alt='img'
                        />
                    </div>
                <div :key='game.id' class='shadow-image-fix'></div>
            </div>
        </template>
        <template v-else>
            <div 
                @click='handleFocus(index)'
                class='carousel-video-container nofocus '
            >
                <img 
                    draggable={false}
                    :src='videoThumbnail(game)'
                    alt='img'
                    class='carousel-card-img disable-select'
                />

                <!-- If clicked before animation is completed: video is queued to focus. This check displays spinner to indicate video will load when animation is finished -->
                    <Spinner v-if='preFocusIndex === index' />
                    <div v-else class='carousel-play-img-wrapper'>
                        <img 
                            draggable='false'
                            class='carousel-play-img disable-select'
                            :src='require("../../../resources/img/play.png")'
                            alt='img'
                        />
                    </div>
                <div :key='game.id' class='shadow-image-fix'></div>
            </div>          
        </template>
                <JustTitle
                    :game='game'
                    :hideTitle='(videoFocused === index && playing)'
                />
                    <!-- :hideTitle='(videoFocused === id) && playing' -->

                <!-- (videoFocused === game.id && playing) true/false result for title display transistion -->
                <!-- if video is videoFocused, and currently playing pass true (dont display) -->
                <!-- if video is playing, dont hide title -->

            </div>
        </div>
    </Fragment>
    <Fragment v-else>
        <div 
            v-for='(game) in carouselItems'
            v-bind:item='game'
            v-bind:key='game.id'

            :class='`flex-col carousel-card ${carouselType}`'
        >
            <!-- <router-link class='flex-col carousel-card-content-wrapper'> -->
            <router-link class='flex-col carousel-card-content-wrapper' :to='`/game/${game.id}`'>
                <img 
                    v-if='game.cover'
                    class='carousel-card-img'
                    :src="imageUrl(game)"
                    alt='img'
                />
                <JustTitle v-if='carouselType === `smaller`' :game='game' :carouselType='carouselType'/>
                <div v-else class='flex carousel-card-metadata'>
                        <div class='flex-col carousel-card-metadata-left'>
                            <p class='carousel-card-title'>{{game.name}}</p>
                                <p v-if='game.genres' class='carousel-card-subtitle'>
                                    {{game.genres[0].name}}
                                </p> 
                        </div> 
                            <div v-if='game.rating' class='flex-col carousel-card-metadata-right'>
                                <p class='carousel-card-rating-text'>Score:</p>
                                <p class='carousel-card-rating'>
                                    {{(game.rating/10).toFixed(2)}}
                                </p>
                            </div>
                    </div>
            </router-link>
        </div>
    </Fragment>
    </div>
</template>


<script>
    import Spinner from './LoadingSpinner.vue'
    import JustTitle from './JustTitle.vue'
    import Fragment from '../../Fragment.vue'

    export default {
    name: 'RenderCarouselItems',
    components: {
        Spinner,
        JustTitle,
        Fragment
    },
    data() {
        return {
            playerVars: {
                autoplay: 1
            }
        }
    },
    props: {
        carouselType : {
            type: String,
            required: true,
        },
        carouselItems : {
            type: Array,
            required: true,
        },
        carouselShiftAnimation : {
            type: String,
        },
        centerVideoIndex : {
            type: Number
        },
        videoFocused : {
            type: Number
        },
        videoLoaded : {
            type: Boolean
        },
        playing : {
            type: Boolean
        },
        preFocusIndex : {
            type: Number
        },
       
    },
    methods: {
        handleReady() {
            this.$emit('handle-video-load')
        },
        handlePlay() {
            this.$emit('set-playing', true)
        },
        handlePause() {
            this.$emit('set-playing', false)
        },
        handleFocus(index) {
            this.$emit('focus-video', index)
        },
        shiftCarousel(e) {
            this.$emit('shift-carousel', e)
        },
        imageUrl(game) {
            return `https://images.igdb.com/igdb/image/upload/t_cover_big${this.carouselType === 'smaller' ? '' : '_2x'}/${game.cover.image_id}.jpg`
        },
        videoThumbnail(game) {
            return `https://img.youtube.com/vi/${game.videos[0].video_id}/hqdefault.jpg`
        }
    },
    created() {
        console.log(this.centerVideoIndex)
    },
}
</script>
<style>
    iframe {
        height: 100%;
        width: 100%;
    }
</style>




