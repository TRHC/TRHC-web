<template>
    <div>
        <div class="columns">
            <div class="column box is-10 is-offset-1">
                <h1 class="title">Статистика мікроклімату вибраного девайсу:</h1>
                <hr>
                    <b-select placeholder="Виберіть девайс">
                        <option
                                v-for="dev in devices"
                                :value="dev.uuid"
                                :key="dev.uuid">
                            {{ dev.name }}
                        </option>
                    </b-select>
                <hr/>
                <div class="charts">
                    <line-chart :chart-data="dataChart"></line-chart>
                </div>
                <hr>
                <div class="columns">
                    <div class="column datepicker-container">
                        <b-field label="Оберіть початкову дату">
                            <b-datepicker
                                    placeholder="Клікніть для вибору"
                                    :min-date="minDate"
                                    :max-date="maxDate"
                                    :month-names="monthNames"
                                    :day-names="dayNames"
                                    v-model="request.after_date"
                                    inline>
                            </b-datepicker>
                        </b-field>
                    </div>

                    <div class="column datepicker-container">
                        <b-field label="Оберіть кінцеву дату">
                            <b-datepicker
                                    placeholder="Клікніть для вибору"
                                    :min-date="minDate"
                                    :max-date="maxDate"
                                    :month-names="monthNames"
                                    :day-names="dayNames"
                                    v-model="request.before_date"
                                    inline>
                            </b-datepicker>
                        </b-field>
                    </div>
                </div>
                <button class="button is-primary is-large is-rounded" v-on:click="fetchData()">Оновити</button>
                <hr>
            </div>
        </div>
    </div>
</template>

<script>
    import LineChart from './LineChart.js'
    import BField from "buefy/src/components/field/Field";
    import BUpload from "buefy/src/components/upload/Upload";

    export default {
        components: {
            LineChart,
            BUpload,
            BField
        },
        data() {
            return {
                devices: null,
                stats: {
                    data: [],
                    range: [],
                },
                monthNames: ["Січень", "Лютий", "Березень", "Квітень",
                    "Травень", "Червень", "Липень", "Серпень", "Вересень",
                    "Жовтень", "Листопад", "Грудень"],
                request: {
                    before_date: undefined,
                    after_date: undefined,
                    period: 'hour'
                },
                dayNames: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"],
                dataChart: null,
                minDate: undefined,
                maxDate: new Date(),
                isFailed: false,
                files: []
            }
        },
        beforeMount() {
            this.updateDevices().then(resp => {
                this.axios.get('/stats', {params: {uuid: this.devices[0].uuid}}
                ).then(resp => {
                    this.minDate = new Date(resp.data.range.first_date);
                    this.maxDate = new Date(resp.data.range.last_date);
                    this.request.after_date = this.minDate
                    this.request.before_date = this.maxDate
                    this.stats = resp.data.data;

                    this.setGraphData()
                    console.log(resp.data)
                }).catch(err => {
                    this.isFailed = true
                    console.log('Request error: ')
                    console.log(err)
                })
            })
        },
        methods: {
            fetchData() {
                this.axios.get('/stats', {
                    params: this.request
                }).then(resp => {
                    this.stats = resp.data;
                    this.setGraphData()
                    console.log(resp.data)
                }).catch(err => {
                    console.log('fetching data returned error: ')
                    console.log(err)
                });
            },
            updateDevices() {
                return this.axios.get('/devices'
                ).then(resp => {
                    this.devices = resp.data
                })
            },
            setGraphData() {
                this.dataChart = {
                    labels: this.stats.lbl,
                    datasets: [
                        {
                            label: 'Температура',
                            borderWidth: 3,
                            borderColor: '#c62828',
                            pointBorderColor: '#c62828',
                            pointBackgroundColor: '#ef9a9a',
                            fill: false,
                            data: this.stats.tcs
                        },
                        {
                            label: 'Вологість',
                            borderWidth: 2,
                            borderColor: '#1565C0',
                            pointBorderColor: '#1565C0',
                            pointBackgroundColor: '#90CAF9',
                            fill: false,
                            data: this.stats.rhs
                        }
                    ]
                }
            },
            upload: function (formData) {
                this.axios.post('upload', formData)
                    .then(data => {
                        console.log('uploaded');
                        console.log(data);
                    })
                location.reload()
            },
            process: function (formData) {
                this.upload(formData)
            },
            submit: function () {
                const formData = new FormData()
                formData.append("csv", this.files[0], this.files[0].name)
                this.process(formData)
            }
        }
    }
</script>

<style scoped>
    .datepicker-container {
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>