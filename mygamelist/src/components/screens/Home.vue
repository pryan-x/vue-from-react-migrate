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
            yo
            <!-- {topGamesOfThisYear &&
                <RankList 
                    listContent={topGamesOfThisYear.result} 
                    listName={topGamesOfThisYear.name}
                />
            }
            {topGamesOfLastYear &&
                <RankList 
                    listContent={topGamesOfLastYear.result} 
                    listName={topGamesOfLastYear.name}
                />
            }

            {topRatedGames &&
                <RankList 
                    listContent={topRatedGames.result} 
                    listName={topRatedGames.name}
                />
            } -->
        </div>
    </div>
</template>

<script>
    // import PageHeader from '../fixed/PageHeader'
    // import Carousel from '../shared/carousel/Carousel'
    // import RankList from '../shared/Ranklist'

    export default {
    name: 'Home',
    data() {
        return {
            homepageData: {}
        }
    },
    components: {
        // PageHeader,
        // Carousel,
        // RankList
    },
    methods: {
        
    },
    props: {

    },
    async created () {
        const x  = await this.$store.getters.homepageData
        console.log(x)
        this.homepageData = x
    }
}
</script>
<style >
    @import '../../css/Home.css';
</style>

