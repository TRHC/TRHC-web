/* eslint-disable */
import {Line, mixins} from 'vue-chartjs'

const {reactiveProp, reactiveData} = mixins

export default {
    extends: Line,
    mixins: [mixins.reactiveProp],
    data: () => ({
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Час'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Температура (гр. Ц) \ Відносна вологість'
                    }
                }]
            }
        }
    }),

    mounted() {
        this.renderChart(this.chartData, this.options)
    }
}