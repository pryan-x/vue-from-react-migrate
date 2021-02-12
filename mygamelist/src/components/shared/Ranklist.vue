<template>
    <div class='flex-col ranklist-container'>
        <div class='flex ranklist-header-container'>
            <p class='ranklist-header'>{{ listName }}</p>
            <p class='ranklist-header-expand-link'>More</p>
        </div>
        <div class='flex-col ranklist-list-container'>
            <div 
                v-for='(game, index) in listContent'
                v-bind:item='game'
                v-bind:index='index'
                v-bind:key='game.id'
                class='flex ranklist-item'
            >
                <p class='ranklist-rank'>{{ index+1 }}</p>
                <!-- <router-link class='ranklist-img-link' to={`/game/${game.id}`}> -->
                <div class='ranklist-img-link' >
                <img 
                    v-if="game.cover.image_id != undefined"
                    :src="imageUrl(game)"
                    alt='img'
                />
                </div>
                <div class='flex-col ranklist-metadata'>
                    <div class='ranklist-title-wrapper'>
                        <!-- <Link class='ranklist-title'  to={`/game/${game.id}`}> -->
                        <div class='ranklist-title'>
                            {{game.name}}
                        </div>
                    </div>
                    <div class='flex-col ranklist-submetadata'>
                        <p>{{ formatPlatformList(game.platforms) }}</p>
                        <p class='ranklist-rating'>
                            Score: {{
                                game.rating 
                                    ? `${(game.rating/10).toFixed(2)} (${game.rating_count})` 
                                    : 'TBD'
                            }}
                        </p>
                        <p v-if='game.follows' class='ranklist-followers'>Followers: {{ game.follows }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
    name: 'Ranklist',
    data() {
        return {
           
        }
    },
    methods: {
        formatPlatformList(list){
            return list.map((platform) => (
                platform.name.includes(' (Microsoft Windows)') 
                ? 'PC'
                : platform.name
            )).join(', ')
        },
        imageUrl(game) {
            return `https://images.igdb.com/igdb/image/upload/t_cover_small/${game.cover.image_id}.jpg`
        }
    },
    props: {
        listName : {
            type: String
        },
        listContent: {
            type: Array
        }
    }
}
</script>
<style>
    @import '../../css/Ranklist.css';
</style>
