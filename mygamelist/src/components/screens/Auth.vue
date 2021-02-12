<template>
   <div class='flex-col auth-page'>
        <div class='auth-wrapper'>
            <div class='flex-col auth-container'>
                <div class='flex-col auth-welcome-container'>
                    <p class='auth-welcome'>
                        {{ authType === 'Sign Up' 
                        ? 'Start using MyGameList!'
                        : 'Login to MyGameList' }}
                    </p>
                    
                    <template v-if='authType === `Sign Up`'>
                        <p class='auth-intro'>
                            Create an account with us to track, rate, review, and share your favorite games and more ...
                        </p>
                        <p class='auth-intro'>all in one place!</p>
                    </template>
                </div>
                <form class='flex-col auth-form' @submit='handleSubmit($event)'>
                    <p class='auth-input-prompt'>Username</p>
                    <input
                        class='auth-input'
                        required
                        type="text"
                        name="username"
                        v-model='username'
                        placeholder="Enter Username"
                    />
                    <!--  <p class='input-prompt'>Email address</p>
                    <input
                        required
                        type="email"
                        name="email"
                        v-model='email'
                        placeholder="Enter email"
                    />  -->
                    <p class='auth-input-prompt'>Password</p>
                    <input
                        class='auth-input'
                        required
                        name="password"
                        v-model='password'
                        type="password"
                        placeholder="Enter Password"
                    />
                    <!--  if authtype is signup, 
                    include confirm password input  -->
                        <template v-if='authType === `Sign Up`'>
                        <p class='auth-input-prompt'>Confirm Password</p>
                        <input
                        class='auth-input'
                        required
                        name="password2"
                        v-model='password2'
                        type="password"
                        placeholder="Confirm Password"
                        />
                        </template>
                    <button class='auth-submit' type="submit">
                    <!--  changes submit button based on authType  -->
                        {{ authType === 'Sign Up' ?
                        'Create Account' : 'Login' }}
                    </button>
                    <template v-if='isError'>
                        <div class='auth-error-container'> 
                            <p 
                                v-for='(error, id) in errors'
                                v-bind:item='error'
                                v-bind:key='id'
                                class='auth-error' 
                            >{{ error }}</p>
                        </div>
                    </template>
                </form>
                <!--  toggles to different auth page  -->
                <div class='flex-col auth-toggle-container'>
                    <p class='auth-toggle-text'>
                        {{ authType === 'Sign Up' ?
                        'Already have an account?' :
                        'Dont have an account?' }}
                    </p>
                    <!--  link to remount and render component for different auth as well as change route  -->
                    <router-link class='auth-toggle' :to='`/${authType === `Sign Up` ? `login` : `signup`}`'>
                        {{ authType === 'Sign Up' ?
                            'Login here' :
                            'Sign up here'
                        }}
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { authUser } from '../../services/auth'

    export default {
    name: 'Auth',
    data() {
        return {
            username: '',
            password: '',
            password2: '',
            isError: false,
            errors: null,
        }
    },
    props: {
        authType : {
            type: String
        },
    },
    computed: {
        storedUser () {
            return this.$store.state.user
        }
    },
    watch: {
        authType(oldVal, newVal) {
            if (oldVal !== newVal) {
                this.username = ''
                this.password = ''
                this.password2 = ''
                this.isError = false
                this.errors = null
            }
        }
    },
    methods: {
        handleSubmit(event) {
            event.preventDefault()
            //authUser checks if the authentication is for signup or login 
            //with authType
            //then signs up and/or logins in the user
            const userData = {
                username: this.username,
                password: this.password,
                password2: this.password2
            }
            authUser(this.authType, userData).then((res) => {
                this.$store.commit('setUser', res.user)
                this.$router.push({ path: '/' })
            })
            .catch(error => {
                this.username = ''
                // this.email = ''
                this.password = ''
                this.password2 = ''
                this.isError = true
                this.errors = ['Something went wrong']
                // errors saved and rendered with renderError
                if (error.response !== undefined) {
                    if (error.response.data.errors) {
                        this.errors = error.response.data.errors
                    }
                }  
            })
        }
    }
}
</script>
<style >
    @import '../../css/Auth.css';
</style>


