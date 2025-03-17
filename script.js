const ctx = document.getElementById('chart').getContext('2d');

        const initialData = {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
            datasets: [{
                data: [12, 19, 3, 5, 2],
                backgroundColor: [
                    'rgb(255,0,0)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(153, 102, 255, 0.8)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1,
            }]
        };

        let chartType = 'pie';
        const config = {
            type: chartType,
            data: initialData,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        labels: {
                            color: '#ffffff',
                            font: {
                                size: 14
                            }
                        },
                    },
                    tooltip: {
                        backgroundColor: '#000000',
                        titleColor: '#ffffff',
                        bodyColor: '#ffffff'
                    },
                },
                rotation: Math.PI / 4,
                cutout: '30%', 
                elements: {
                    arc: {
                        borderWidth: 0, 
                    }
                },
                animation: {
                    animateRotate: true,
                    animateScale: true
                }
            }
        };

        const chart = new Chart(ctx, config);

        document.getElementById('addData').addEventListener('click', () => {
            const randomValue = Math.floor(Math.random() * 50) + 1;
            const randomLabel = `New-${chart.data.labels.length + 1}`;

            chart.data.labels.push(randomLabel);
            chart.data.datasets[0].data.push(randomValue);

            anime({
                targets: chart.data.datasets[0].data,
                easing: 'easeInOutQuad',
                duration: 1000,
                update: chart.update(),
            });
        });

        document.getElementById('changeChart').addEventListener('click', () => {
            const types = ['pie', 'bar', 'line'];
            const currentTypeIndex = types.indexOf(chartType);
            chartType = types[(currentTypeIndex + 1) % types.length];

            chart.config.type = chartType;
            chart.update();

            anime({
                targets: '#chart',
                scale: [0.9, 1],
                duration: 500,
                easing: 'easeInOutExpo',
            });
        });