<template>
    <div class='flex-col ranklist-container'>
        <div class='flex ranklist-header-container'>
            <p class='ranklist-header'>{{listName}}</p>
            <p class='ranklist-header-expand-link'>More</p>
        </div>
         <!-- v-for='(post, index) in postsReverse'
      v-bind:item='post'
      v-bind:index='index'
      v-bind:key='post._id' -->
        <div class='flex-col ranklist-list-container'>
            <div 
                v-for='(game, index) in listContent'
                v-bind:item='game'
                v-bind:index='index'
                v-bind:key='game.id'
                class='flex ranklist-item'
            >
                <p class='ranklist-rank'>{{index+1}}</p>
                <!-- <router-link class='ranklist-img-link' to={`/game/${item.id}`}> -->
                <div class='ranklist-img-link' >
                <img 
                    src="https://images.igdb.com/igdb/image/upload/t_cover_small/${item.cover.image_id}.jpg" 
                    alt='img'
                />
                </div>
                <div class='flex-col ranklist-metadata'>
                    <div class='ranklist-title-wrapper'>
                        <!-- <Link class='ranklist-title'  to={`/game/${item.id}`}> -->
                        <div class='ranklist-title'>
                            {{item.name}}
                        </div>
                    </div>
                    <div class='flex-col ranklist-submetadata'>
                        <p>{{formatPlatformList(item.platforms)}}</p>
                        <p class='ranklist-rating'>
                            Score: {{
                                item.rating 
                                    ? `${(item.rating/10).toFixed(2)} (${item.rating_count})` 
                                    : 'TBD'
                            }}
                        </p>
                        <p v-if='item.follows' class='ranklist-followers'>Followers: {{item.follows}}</p>
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
        formatPlatformList(list){(
            list.map((platform) => (
                platform.name.includes(' (Microsoft Windows)') 
                ? 'PC'
                : platform.name
                            // if(platform.name.includes(' (Microsoft Windows)')) {
                            //     return 'PC'
                            // }
                            // return platform.name
        )).join(', ')
)}
    },
    props: {
        listName : {
            type: String
        },
        listContent: {
            type: Array
        }
    },
    async created () {

        }
}
</script>
<style>
    @import '../../css/Ranklist.css';
</style>
