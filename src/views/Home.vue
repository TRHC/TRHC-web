/* eslint-disable */
<template>
    <div class="container box has-text-left">
        <h1 class="title is-size-1">Головна сторінка</h1>
        <p class="is-size-4">Опис проекту і загальна інформація</p>
        <hr/>
        <p class="is-size-5">
            Проект TRHC - простий та зручний монітор температури та вологості в будь якому приміщенні, від складу до жилого приміщення.
            Дуже важливо знати, що контроль мікроклімату кімнати допомагає перебувати не тільки в комфорті і продуктивному стані, а й запобігти
            різним захворюванням
            <br> <br>
            Аби розпочати роботу з нами вже найближчим часом - просто перейдіть на
            <router-link to="/logged" v-if="logged">сторінку реєстрації</router-link>
            <router-link to="/signup" v-else>сторінку реєстрації</router-link>
        </p>
        <hr>
        <iframe width="560"
                height="315"
                src="https://www.youtube.com/embed/jqDjpI8a6A0"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
        >
            Нажаль, Ваш браузер не підтримує вбудовані відео.
        </iframe>
    </div>
</template>

<script>
    export default {
        name: 'home',
        computed: {
            logged() {
                return this.$store.getters.isAuthenticated
            }
        }
    }
</script>
