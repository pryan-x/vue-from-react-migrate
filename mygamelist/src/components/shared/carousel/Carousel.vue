<template>
    <div class='flex-col homepage-carousel'>
        <div class='carousel-header-container'>
            <p class='carousel-header-text'>
                {{ carouselTitle }}
            </p>
        </div>
            <!-- class="flex-col carousel-container" -->
        <div 
            :class="`flex-col carousel-container ${carouselTypeCheck}`"
        >
                <!-- shiftCarousel={this.shiftCarousel} -->
            <CarouselCaret 
                direction='left'
                @click.native="shiftCarousel($event)"
            />

                <!-- shiftCarousel={this.shiftCarousel} -->
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
            // carouselHandlers: {
            //     this.shiftCarousel,
            //     this.focusVideo,
            //     this.handleVideoLoad,
            //     this.setPlaying,
            // },

            content: [],

            // animation states
            carouselShiftAnimation: null,
            centerVideoIndex: null,
            videoFocused: null,
            videoLoaded: false,
            preFocusIndex: null,

            // video playback check
            playing: false,
            //** timeout check for whether video will be playing in xxxms
            queuedToPlay: false,
            //**  
            prevPlaying: false
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
    watch:{
        playing(newVal, oldVal){
            if(oldVal != newVal) {
                this.prevPlaying = oldVal
            }
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
            if ((this.state.preFocusIndex !== arrIndex) 
                && (arrIndex !== this.state.centerVideoIndex) 
                && this.state.carouselShiftAnimation) 
            {
                this.preFocusIndex = arrIndex
            }
        },
        handleVideoLoad() {
            this.videoLoaded = true
        },
        setPlaying(play) {
            // play
            if (play) {
                this.playing = play,
                // queuedtoplay gets set true ONLY IF the timeout for pause has not run yet and playing is still set to true from playing again quickly after pausing(to smooth play+pause transitions)
                this.queuedToPlay = this.prevPlaying
                // this.setState(prevState =>({ 
                //     playing: play,
                //     queuedToPlay: prevState.playing
                // })) 
            }
            // pause
            if(!play) {
                setTimeout(() => {
                    // if queuedtoplay is false, pause
                    // if true, keep this.state.playing unchanged as true to keep pause transitions from running when playing
                    this.playing = this.queuedToPlay,
                    this.queuedToPlay = false
                }, 500)
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
            this.preFocusIndex= null
            this.playing= false

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

                // this.setState(prevState => {
                //     return {
                //         // reorders the carousel content to match the animation shift
                //         content: shiftRightOrLeft
                //             ? this.shift(prevState.content, 'r', prevState.jumps) 
                //             : this.shift(prevState.content, 'l', prevState.jumps),
                //         // sets the video focus to null (reset) or the new center video if the shifted video was queued before animation finished
                //         videoFocused: prevState.preFocusIndex === null 
                //             ? null
                //             : prevState.centerVideoIndex,
                //         // resets animation
                //         carouselShiftAnimation: null,
                            
                //         preFocusIndex: null,
                //         videoLoaded: false,
                //     }
                // })
            // for animation and carousel content change to match up, timeout has to be a little under timing as the keyframes timing for the shift animation
            // }, 19500)

            }, 500)
            // }, 475)
            // }, 460)
            // }, 15000)
            // }, 5000)
            // }, 40000)
            // })
        }
    },
    created() {
        this.reorderArrForCarousel()
    },
}
</script>
<style >
    @import '../../../css/carousel/CarouselDefault.css';
    @import '../../../css/carousel/CarouselShared.css';
    @import '../../../css/carousel/CarouselSmaller.css';
    @import '../../../css/carousel/CarouselVideo.css';
</style>