<script lang="ts">
    import { onMount } from 'svelte';
    import * as echarts from 'echarts';
    import { csv } from 'd3-fetch';
    import {userStore} from "$lib/stores/User";

    let name = $userStore.name;
    let email = $userStore.email;

    let chartRef: HTMLDivElement;
    let cities: string[] = [];
    let selectedCity: string = '';
    let chart: any;
    let allData: any; // Use 'any' here for simplicity

    onMount(async () => {
        allData = await csv("/2016/Table_9B.3_2016.csv");
        if (!allData) {
            console.error("Failed to load data");
            return;
        }
        //@ts-ignore
        cities = allData.map(d => d["City (Col.2)"]);
        selectedCity = cities[0]; // Default to the first city

        chart = echarts.init(chartRef);
        updateChart(selectedCity);
    });

    // Update the chart whenever the selected city changes
    $: if (chart && selectedCity && allData) {
        updateChart(selectedCity);
    }

    function updateChart(city: string) {
        if (!allData) {
            console.error("Data is not loaded yet");
            return;
        }

        const cityData = allData.find((d: { [key: string]: string }) => d["City (Col.2)"] === city);

        if (!cityData) {
            console.error(`Data for ${city} not found`);
            return;
        }

        const crimeTypes = Object.keys(cityData).slice(2, -1);
        let formattedData = crimeTypes.map(type => ({
            name: type,
            value: +cityData[type]
        }));

        // Filter out data points with value 0
        formattedData = formattedData.filter(data => data.value !== 0);

        // Sort data in descending order
        formattedData.sort((a, b) => b.value - a.value);

        const option = {
            title: {
                text: `${city} Crime Data 2016`,
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            series: [
                {
                    name: 'Crime Types',
                    type: 'pie',
                    radius: '50%',
                    data: formattedData
                }
            ]
        };
        chart.setOption(option);
    }

</script>

<!-- Dropdown for cities -->
<select bind:value={selectedCity}>
    {#each cities as city}
        <option>{city}</option>
    {/each}
</select>

<div bind:this={chartRef} style="width: 600px; height: 400px;"></div>