<template>
    <div class='flex nav-top'>
        <div class="flex nav-top-left">
            <div class='flex nav-title-logo-container'>
                <router-link class='flex' to="/">
                    <img
                        :src='titleLogoIcon'
                        class='logo-placeholder'
                        alt='img'
                    />
                    <h3 class='title'>MyGameList</h3>
                </router-link>
            </div>
            <div class="flex nav-space-between-wrapper">
                <div class="flex nav-intro-text-container">
                    <div class="flex-col nav-intro-text-left">
                        <p class='nav-intro-text'>Track,</p>
                        <p class='nav-intro-text'>Rate,</p>
                        <p class='nav-intro-text'>Review,</p>
                    </div>
                    <h1 class='nav-intro-text'>your video games</h1>
                </div>
                <form class='flex nav-search-container'>
                    <input placeholder='Search games, genre, characters...' class='nav-search-input' />
                    <button type='submit' class='flex nav-search-icon-wrapper'>
                        <img
                            :src='searchIcon'
                            class='nav-search-icon'
                            alt='img'
                        />
                    </button>
                </form>
            </div>
        </div>
        <template v-if='$store.getters.isLoggedIn'>
        <!-- <template v-if='storedUser'> -->
            <div class="flex nav-top-right">
                <div v-on:click="handleToggle" v-on:blur='handleBlur' tabIndex="0" class='flex nav-user-dropdown-button'>
                    <img
                        :src='profilePicturePlaceholder'
                        class='nav-pfp-PLACEHOLDER disable-select'
                        alt='img'
                    />
                    <h3 class='nav-username disable-select'>{{storedUser.username}}</h3>
                    <img
                        :src='profileDropdownCaret'
                        class='nav-caret disable-select'
                        alt='img'
                        v-bind:style=" this.dropdown ? 'rotate(0deg)' : 'rotate(-180deg)' "
                        style= 'transform .95s cubic-bezier(.16,1.1,.59,.98)'
                    />
                    <template v-if='this.dropdown'>
                        <ul class='nav-user-dropdown' >
                            <li>
                                Profile
                            </li>
                            <li>
                                Profile Settings
                            </li>
                            <li>
                                Game List
                            </li>
                            <li>
                                Reviews
                            </li>
                            <li>
                            <router-link class='flex logout-button' to="/logout">
                                <h3 class='logout-text'>Logout</h3>
                                <img
                                    :src='logoutIcon'
                                    class='logout-icon'
                                    alt='img'
                                />
                            </router-link>
                            </li>
                        </ul>
                    </template>
                </div>
            </div>
        </template>
        <template v-else>
            <div class="unauth-right-nav flex">
                <router-link class='flex unauth-nav-button login' to="/login">
                    Login
                </router-link>
                <router-link class='flex unauth-nav-button signup' to="/signup">
                    Sign Up
                </router-link>
            </div>
        </template>
    </div>
</template>

<script>
    import logoutIcon from '../../../resources/img/exit_door.svg'
    import searchIcon from '../../../resources/img/search.svg'
    import profileDropdownCaret from '../../../resources/img/dropdown_caret.png'
    import profilePicturePlaceholder from '../../../resources/img/profile_placeholder.png'
    import titleLogoIcon from '../../../resources/img/logo_placeholder.png'

    export default {
    name: 'TopNav',
    data() {
        return {
            searchIcon: searchIcon, 
            logoutIcon: logoutIcon,
            profileDropdownCaret: profileDropdownCaret, 
            profilePicturePlaceholder: profilePicturePlaceholder,
            titleLogoIcon: titleLogoIcon, 
            dropdown: false,
        }
    },
    computed: {
        storedUser () {
            return this.$store.state.user
        }
    },
    methods: {
        handleToggle() {
            this.dropdown = !this.dropdown
            console.log('dropdown toggled')
        },
        // handleLogout() {
        //     this.$store.commit('setUser', false)
        //     signOutUser()
        // },
        handleBlur(e) {
            const currentTarget = e.currentTarget;
            setTimeout(() => {
                if (!currentTarget.contains(document.activeElement)) {
                this.dropdown = false
                }
            }, 0)
        }
    }
}
</script>
<style >
  @import '../../../css/nav/TopNav.css';
</style>
