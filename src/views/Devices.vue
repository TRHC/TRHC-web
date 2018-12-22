<template>
    <div class="container">
        <div class="columns is-multiline">
            <div class="column box has-text-left is-3 is-offset-1" v-for="dev in devices">
                <h2 class="title">{{dev.name}}</h2>
                <p class="is-size-7">{{dev.uuid}}</p>
                <hr/>
                <button class="button is-rounded is-danger is-pulled-right" @click="del (dev.uuid)">Delete</button>
            </div>
        </div>
        <hr/>
        <div class="columns">
            <div class="column is-4 is-offset-4 box">
                <form @submit.prevent="createDevice">
                    <b-field type="is-primary" label="Створити новий девайс">
                        <b-input placeholder="Назва" v-model="name"></b-input>
                    </b-field>
                    <button class="button is-primary is-block is-rounded">Створити</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import BInput from "buefy/src/components/input/Input";

    export default {
        components: {BInput},
        data() {
            return {
                devices: null,
                name: null
            }
        },
        methods: {
            del(uuid) {
                this.axios({url: 'delete_device', data: {uuid: uuid}, method: 'POST'})
                this.updateDevices()
            },
            updateDevices() {
                this.axios.get('/devices'
                ).then(resp => {
                    this.devices = resp.data
                })
            },
            createDevice() {
                this.axios({url: 'new', data: {name: this.name}, method: 'POST'})
                this.updateDevices()
            }
        },
        beforeMount() {
            this.updateDevices()
        }
    }
</script>

<style scoped>
    .box {
        margin-bottom: 0px;
    }
</style>
