<template>
    <nav class="navbar is-primary is-fixed-top" role="navigation" aria-label="dropdown navigation">
        <div class="navbar-brand">
            <router-link to="/" class="navbar-item title" style="margin-bottom: 0;">TRHC</router-link>

            <a role="button" class="navbar-burger burger" data-target="navMenu" aria-label="menu" aria-expanded="false">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>

        <div class="navbar-menu" id="navMenu">
            <div class="navbar-start" v-if="logged">
                <router-link to="/statistic" class="navbar-item">Мікроклімат</router-link>
                <router-link to="/devices" class="navbar-item">IOT-менеджер</router-link>
                <router-link to="/info" class="navbar-item">Панель інформації</router-link>
            </div>
            <div class="navbar-start" v-else>
                <router-link to="/description" class="navbar-item">Опис</router-link>
            </div>

            <div class="navbar-end">
                <router-link to="/login" v-if="!logged" class="navbar-item">Вхід</router-link>
                <router-link to="/signup" v-if="!logged" class="navbar-item">Реєстрація</router-link>
                <a class="navbar-item" v-if="logged" @click="logout()">Вийти, {{username}}</a>
            </div>
        </div>
    </nav>
</template>

<script>
    import {AUTH_LOGOUT} from '@/store/actions/auth'

    export default {
        name: 'NavB',
        methods: {
            logout() {
                this.$store.dispatch(AUTH_LOGOUT).then(() => {
                    this.$router.push('/login')
                })
            }
        },
        computed: {
            username() {
                return this.$store.getters.username
            },
            logged() {
                return this.$store.getters.isAuthenticated
            }
        }
    }
    document.addEventListener('DOMContentLoaded', () => {

        // Get all "navbar-burger" elements
        const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

        // Check if there are any navbar burgers
        if ($navbarBurgers.length > 0) {

            // Add a click event on each of them
            $navbarBurgers.forEach(el => {
                el.addEventListener('click', () => {

                    // Get the target from the "data-target" attribute
                    const target = el.dataset.target;
                    const $target = document.getElementById(target);

                    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
                    el.classList.toggle('is-active');
                    $target.classList.toggle('is-active');

                });
            });
        }

    });
</script>

<style>
    .burger span {
        color: darkblue;
    }
</style>