<template>
    <div class='flex homepage-container'>
        <div class='flex-col left-homepage'>

            <Carousel 
                v-if="popularRecentReleases != undefined"
                :carouselContent='popularRecentReleases.result'
                :carouselTitle='popularRecentReleases.name'
                :carouselJumps='2'
            />
            <Carousel 
                v-if="topUpcomingGames != undefined"
                :carouselContent='topUpcomingGames.result'
                :carouselTitle='topUpcomingGames.name'
                :carouselJumps='2'
            /> 

            <Carousel 
                v-if="mostAnticipated != undefined"
                :carouselContent='mostAnticipated.result'
                :carouselTitle='mostAnticipated.name'
                :carouselJumps='2'
                carouselType='smaller'
            /> 
            <!-- <youtube video-id="fn8fXI8MjT8" ref="youtube"></youtube> -->
            <Carousel 
                v-if="popularTrailers != undefined"
                :carouselContent='popularTrailers.result'
                :carouselTitle='popularTrailers.name'
                :carouselJumps='0'
                carouselType='video'
            /> 
        </div>
        <div class='flex-col right-homepage'>
            <!-- <template v-if="rawHomepageData.length > 0"> -->
            <RankList v-if="topGamesOfLastYear != undefined"
                :listContent="topGamesOfLastYear.result" 
                :listName="topGamesOfLastYear.name"
            />
            <RankList v-if="topRatedGames != undefined"
                :listContent="topRatedGames.result" 
                :listName="topRatedGames.name"
            />
            <!-- </template> -->
        </div>
    </div>
</template>

<script>
    import Carousel from '../shared/carousel/Carousel'
    import RankList from '../shared/Ranklist.vue'

    export default {
    name: 'Home',
    components: {
        Carousel,
        RankList
    },
    methods: {
        
    },
    computed: {
        rawHomepageData () {
            return this.$store.getters.homepageData.length > 0 ? this.$store.getters.homepageData : []
        },
        popularRecentReleases () {
            return this.rawHomepageData[0]
        },
        topUpcomingGames () {
            return this.rawHomepageData[1]
        },
        mostAnticipated () {
            return this.rawHomepageData[2]
        },
        popularTrailers () {
            return this.rawHomepageData[3]
        },
        topGamesOfLastYear () {
            return this.rawHomepageData[this.rawHomepageData.length-1]
        },
        topRatedGames () {
            return this.rawHomepageData[this.rawHomepageData.length-2]
        }
        // topGamesOfLastYear () {
        //     return this.rawHomepageData[this.rawHomepageData.length-1]
        // }
    },

    props: {

    },
}
</script>
<style >
    @import '../../css/Home.css';
</style>

