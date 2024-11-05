<!--<template>
  <div class="w-full max-w-3xl mx-auto bg-white p-6 rounded-md shadow-md">
    <div v-if="chartData.labels.length && chartData.datasets[0].data.length">
      <h2 class="text-xl font-bold text-center">Language Collection Time - Bar Chart</h2>
      <Bar :data="chartData" :options="chartOptions" />
      <h2 class="text-xl font-bold text-center">Language Collection Time - Line Chart</h2>
      <Line :data="chartData" :options="chartOptions" />
    </div>
    <div v-else class="text-center text-red-500 p-4 bg-cyan-100 mt-4">
      Loading data or failed to fetch data
    </div>
  </div>
</template>

<script >
import { ref, onMounted } from 'vue';
import { Bar, Line } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, LineElement, CategoryScale, LinearScale, PointElement);

export default {
  setup() {
    const { $axios } = useNuxtApp();
    const chartData = ref({
      labels: [],
      datasets: [
        {
          label: 'Language Collection Time',
          data: [],
          backgroundColor: [],
          borderColor: [],
          borderWidth: 1,
        },
      ],
    });

    const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'top',
    },
    tooltip: {
      mode: 'index',
      intersect: false,
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Months',
      },
    },
    y: {
      title: {
        display: true,
        text: 'Values',
      },
      beginAtZero: true,
    },
  },
});

    const fetchLanguageData = async () => {
      try {
        const response = await $axios.get('/languages/bar-chart');
        const data = response.data;
        console.log('API Response:', data); // Log the response to check its structure
        if (data && Array.isArray(data.labels) && Array.isArray(data.times) && Array.isArray(data.categoryColor)) {
          chartData.value = {
            labels: data.labels,
            datasets: [
              {
                label: 'Language Collection Time',
                data: data.times,
                backgroundColor: data.categoryColor,
                borderColor: data.categoryColor.map(color => color),
                borderWidth: 1,
                fill: false,
              },
            ],
          };
        } else {
          console.error("Invalid data structure:", data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    onMounted(() => {
      fetchLanguageData().then(() => {
        console.log('Chart Data after fetching:', chartData.value);
      });
    });

    return { chartData, chartOptions };
  },
};
</script>

<style>
.w-full {
  max-width: 100%;
}
</style>-->
<template>
  <div style="display: flex; flex-direction: column; align-items: center;">
    <div style="position: relative; height: 400px; width: 600px; margin-bottom: 20px;">
      <Bar :data="barChartData" :options="chartOptions" />
    </div>

    <div style="position: relative; height: 400px; width: 600px;">
      <Line :data="lineChartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Bar, Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, BarElement, LineElement, PointElement, LinearScale, CategoryScale);

// Bar chart data
const barChartData = ref({
  labels: ['January', 'February', 'March', 'April', 'May'],
  datasets: [
    {
      label: 'Bar Data',
      backgroundColor: ['#f87979','#42A5F5','#9CCC65','#FF6384','#36A2EB'],
      data: [40, 20, 12, 50, 10],
    },
  ],
});

// Line chart data
const lineChartData = ref({
  labels: ['January', 'February', 'March', 'April', 'May'],
  datasets: [
    {
      label: 'Line Data',
      borderColor: '#42A5F5',
      backgroundColor: 'rgba(66, 165, 245, 0.2)',
      data: [30, 45, 20, 60, 40],
      fill: true,
    },
  ],
});

// Chart options
const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'top',
    },
    tooltip: {
      mode: 'index',
      intersect: false,
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Months',
      },
    },
    y: {
      title: {
        display: true,
        text: 'Values',
      },
      beginAtZero: true,
    },
  },
});
</script>

<style scoped>
/* Add any additional styles here */
</style>

