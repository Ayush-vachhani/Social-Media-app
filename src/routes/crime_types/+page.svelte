<script lang="ts">
    import { onMount } from 'svelte';
    import * as echarts from 'echarts';
    import { csv } from 'd3-fetch';

    let chartRef: HTMLDivElement;
    let selectedCrimeType: string = '';
    let chart: any;
    let allData: any;
    let crimeTypeMapping: Record<string, string> = {};

    onMount(async () => {
        allData = await csv("/2016/Table_9B.3_2016.csv");
        if (!allData) {
            console.error("Failed to load data");
            return;
        }

        crimeTypeMapping = Object.keys(allData[0])
            .slice(2, -1)
            .reduce<Record<string, string>>((acc, type) => {
                acc[type.replace(/ \(Col\.\d+\)/, '')] = type;
                return acc;
            }, {});


        selectedCrimeType = Object.keys(crimeTypeMapping)[0]; // Default to the first crime type

        chart = echarts.init(chartRef);
        updateChart(selectedCrimeType);
    });

    $: if (chart && selectedCrimeType && allData) {
        updateChart(selectedCrimeType);
    }

    function updateChart(crimeType: string) {
        if (!allData) {
            console.error("Data is not loaded yet");
            return;
        }

        const originalCrimeType = crimeTypeMapping[crimeType];
        interface CityCrimeData {
            name: string;
            value: number;
        }
        const formattedData = allData.map((d: any): CityCrimeData => ({name: d["City (Col.2)"], value: +d[originalCrimeType]})).filter((d: CityCrimeData) => d.value > 0);
        // Sort data in descending order
        formattedData.sort((a:any, b:any) => b.value - a.value);

        const option = {
            title: {
                text: `${crimeType} Crime Data 2016`,
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            series: [
                {
                    name: 'Cities',
                    type: 'pie',
                    radius: '50%',
                    data: formattedData
                }
            ]
        };
        chart.setOption(option);
    }
</script>

<!-- Dropdown for crime types -->
<select bind:value={selectedCrimeType}>
    {#each Object.keys(crimeTypeMapping) as crimeType}
        <option>{crimeType}</option>
    {/each}
</select>

<div bind:this={chartRef} style="width: 600px; height: 600px;"></div>
