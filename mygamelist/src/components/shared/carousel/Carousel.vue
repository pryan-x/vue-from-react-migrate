<template>
    <div class='flex-col homepage-carousel'>
        <div class='carousel-header-container'>
            <p class='carousel-header-text'>
                {{ carouselTitle }}
            </p>
        </div>
        <div :class="`flex-col carousel-container ${carouselTypeCheck}`">
            <CarouselCaret 
                direction='left'
                @click.native="shiftCarousel($event)"
            />
            <CarouselCaret 
                direction='right'
                @click.native="shiftCarousel($event)"
            />
            <div 
                :class="`flex carousel-list ${
                    carouselShiftAnimation 
                        ? `carousel-animation-active-${carouselShiftAnimation}` 
                        : ``
                    } ${carouselTypeCheck}`"
            >
                <RenderCarouselItems  
                    v-if="content.length > 0"

                    :carouselType='carouselTypeCheck'
                    :carouselItems='content'

                    @shift-carousel='shiftCarousel'
                    @focus-video='focusVideo'
                    @handle-video-load='handleVideoLoad'
                    @set-playing='setPlaying'
                    

                    :carouselShiftAnimation="carouselShiftAnimation"
                    :centerVideoIndex="centerVideoIndex"
                    :videoFocused="videoFocused"
                    :videoLoaded="videoLoaded"
                    :playing="playing"
                    :preFocusIndex="preFocusIndex"

                />
            </div>

        </div>
    </div>
</template>

<script>
    import CarouselCaret from './CarouselCaret.vue'
    import RenderCarouselItems from './RenderCarouselItems.vue'

    export default {
    name: 'Carousel',
    components: {
        CarouselCaret,
        RenderCarouselItems
    },
    data() {
        return {
            content: [],

            // animation state
            carouselShiftAnimation: null,
            centerVideoIndex: null,
            videoFocused: null,
            videoLoaded: false,
            preFocusIndex: null,

            // video playback check
            playing: false,
            //** timeout check for whether video is playing in xxxms
            queuedToPlay: false,
            //**  
        }
    },
    props: {
        carouselTitle : {
            type: String
        },
        carouselContent : {
            type: Array
        },
        carouselJumps : {
            type: Number
        },
        carouselType : {
            type: String
        }
    },
    computed: {
        carouselTypeCheck() {
            return this.carouselType ? this.carouselType : 'default'
        }
    },
    methods: {
        reorderArrForCarousel() {
            const reorderedArr = [...this.carouselContent]
            // first initialize items as an even amount for styling and functionality purposes
            if (reorderedArr.length % 2 !== 0) {
                reorderedArr.pop()
            }

            this.centerVideoIndex = (reorderedArr.length/2)-1
            this.content = [
                    // results come in ordered in popularity
                    // half+3 most important results are taken, then reversed so they are in the middle to be displayed first
                    ...reorderedArr.splice(0, (reorderedArr.length/2)+2).reverse(), 
                    // rest of games
                    ...reorderedArr
            ].reverse()
        },
        focusVideo(arrIndex) {
            // video can only be focused to play when its the center video
            if (arrIndex === this.centerVideoIndex) {
                this.videoFocused = arrIndex
                this.videoLoaded = false
                this.playing = false
            }
            // If left or right thumbnail is clicked during animation: video is queued to focus after finished.
            if ((this.preFocusIndex !== arrIndex) 
                && (arrIndex !== this.centerVideoIndex) 
                && this.carouselShiftAnimation) 
            {
                this.preFocusIndex = arrIndex
            }
        },
        handleVideoLoad() {
            this.videoLoaded = true
        },
        setPlaying(play) {
            // on pause
            if(!play) {
                setTimeout(() => {
                    // if queuedtoplay is false, pause
                    // if true, keep this.playing unchanged as true to keep pause transitions from running when playing
                    this.playing = this.queuedToPlay
                    this.queuedToPlay = false
                }, 500)
            }
            // on play
            if (play) {
                // queuedtoplay gets set true ONLY IF the timeout for pause has not run yet and playing is still set to true from playing again before pause timeout fires(to smooth play+pause transitions)
                this.queuedToPlay = this.playing ? true : false
                this.playing = play
            }

        },
        shift(arr, direction, jumps) {
            const shiftedArr = [...arr]
            // shifts items in arr x amt of times depending on how many jumps to make
            for ( let i = 0; i <= jumps; i++ ) {
                direction === 'r' 
                    ? shiftedArr.push(shiftedArr.shift())
                    : shiftedArr.unshift(shiftedArr.pop())
            }
            return shiftedArr
        },
        shiftCarousel(e) {
            // grabs class for carouselshift direction check (will be right or left)
            const directionToShift = e.currentTarget.getAttribute('class')
            
            // stop and return if: animation is running OR if the center video was clicked
            if( this.carouselShiftAnimation || directionToShift.includes('center') ) {
                return
            }
            
            // true if element's class contains 'right'
            var shiftRightOrLeft = directionToShift.includes('right')

            this.carouselShiftAnimation = shiftRightOrLeft ? 'right' : 'left',
            this.preFocusIndex = null
            this.playing = false
            this.queuedToPlay = false

            setTimeout(() => {
                // reset animation and values after animation is done
                // reorders the carousel content to match the animation shift
                this.content = shiftRightOrLeft
                    ? this.shift(this.content, 'r', this.carouselJumps) 
                    : this.shift(this.content, 'l', this.carouselJumps)
                // sets the video focus to null (reset) or the new center video if the shifted video was queued before animation finished
                this.videoFocused = this.preFocusIndex === null ? null : this.centerVideoIndex
                // resets animation
                this.carouselShiftAnimation = null
                    
                this.preFocusIndex = null
                this.videoLoaded = false
            }, 500)
            // }, 475)
            // }, 460)
        }
    },
    created() {
        this.reorderArrForCarousel()
    }
}
</script>
<style >
    @import '../../../css/carousel/CarouselDefault.css';
    @import '../../../css/carousel/CarouselShared.css';
    @import '../../../css/carousel/CarouselSmaller.css';
    @import '../../../css/carousel/CarouselVideo.css';
</style>