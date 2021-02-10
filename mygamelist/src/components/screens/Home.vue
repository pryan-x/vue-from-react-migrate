<template>
    <div class='flex homepage-container'>
        <div class='flex-col left-homepage'>
            <!-- {popularRecentReleases && 
                <Carousel 
                    carouselContent={popularRecentReleases.result} 
                    carouselTitle={popularRecentReleases.name}
                    carouselJumps={2}
                />
            }
            {topUpcomingGames &&
                <Carousel 
                    carouselContent={topUpcomingGames.result} 
                    carouselTitle={topUpcomingGames.name}
                    carouselJumps={2}
                /> 
            }
            {mostAnticipated &&
                <Carousel 
                    carouselContent={mostAnticipated.result} 
                    carouselTitle={mostAnticipated.name}
                    carouselType='smaller'
                    carouselJumps={2}
                /> 
            }
            {mostAnticipated &&
                <Carousel 
                    carouselContent={popularTrailers.result} 
                    carouselTitle={popularTrailers.name}
                    carouselType='video'
                    carouselJumps={0}
                /> 
            } -->
        </div>
        <div class='flex-col right-homepage'>
            <RankList 
                v-bind:listContent="topGamesOfThisYear.result"
                v-bind:listName="topGamesOfThisYear.name"
            />

            <RankList 
                v-bind:listContent="topGamesOfLastYear.result" 
                v-bind:listName="topGamesOfLastYear.name"
            />

            <RankList 
                v-bind:listContent="topRatedGames.result" 
                v-bind:listName="topRatedGames.name"
            />
        </div>
    </div>
</template>

<script>
    // import Carousel from '../shared/carousel/Carousel'
    import RankList from '../shared/Ranklist.vue'

    export default {
    name: 'Home',
    data() {
        return {
            homepageData: {},
            popularRecentReleases: [],
            topUpcomingGames: [],
            mostAnticipated: [],
            popularTrailers: [],
            topRatedGames: [],
            topGamesOfLastYear: []
        }
    },
    components: {
        // Carousel,
        RankList
    },
    methods: {
        
    },
    props: {

    },
    async created () {
        const resp = this.$store.getters.homepageData[0]
        this.popularRecentReleases = resp[0]
        this.topUpcomingGames = resp[1]
        this.mostAnticipated = resp[2]
        this.popularTrailers = resp[3]
        this.topRatedGames = resp[resp.length-2]
        this.topGamesOfLastYear = resp[resp.length-1]
        }
}
</script>
<style >
    @import '../../css/Home.css';
</style>

