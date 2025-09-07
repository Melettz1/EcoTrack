document.addEventListener('DOMContentLoaded', () => {
    const transportForm = document.getElementById('transport-form');
    const energyForm = document.getElementById('energy-form');
    const foodForm = document.getElementById('food-form');
    const clearDataBtn = document.getElementById('clear-data');

    const totalFootprintEl = document.getElementById('total-footprint');
    const activityListEl = document.getElementById('activity-list');
    const sustainableTipEl = document.getElementById('sustainable-tip');

    const EMISSION_FACTORS = {
        transport: {
            car: 0.18,
            motorcycle: 0.11,
            bus: 0.04,
            metro: 0.02,
            bike: 0,
            walk: 0,
        },
        energy: {
            brazil: 0.0762
        },
        food: {
            'meat-high': 7.2,
            'meat-average': 5.6,
            'vegetarian': 3.8,
            'vegan': 2.9
        }
    };

    const SUSTAINABLE_TIPS = {
        transport: "Considere usar transporte público, bicicleta ou caminhar para viagens curtas. Cada km sem carro faz a diferença!",
        energy: "Desligue as luzes e aparelhos eletrônicos quando não estiverem em uso. Pequenos gestos geram grande economia.",
        food: "Reduzir o consumo de carne vermelha uma ou duas vezes por semana pode diminuir significativamente sua pegada de carbono.",
        general: "Lembre-se de reciclar e reduzir o desperdício. Planeje suas compras para evitar o excesso de lixo."
    };
    
    let categoryChart = null;
    let historyChart = null;

    let activities = JSON.parse(localStorage.getItem('carbonActivities')) || [];

    const calculateFootprint = (activity) => {
        const { type, category, distance, energyUsage, dietType } = activity;
        if (category === 'transport') {
            return distance * EMISSION_FACTORS.transport[type];
        }
        if (category === 'energy') {
            return energyUsage * EMISSION_FACTORS.energy.brazil;
        }
        if (category === 'food') {
            return EMISSION_FACTORS.food[dietType];
        }
        return 0;
    };

    const saveActivities = () => {
        localStorage.setItem('carbonActivities', JSON.stringify(activities));
    };

    const addActivity = (activity) => {
        activity.footprint = calculateFootprint(activity);
        activity.date = new Date().toISOString().split('T')[0];
        activities.push(activity);
        saveActivities();
        updateUI();
    };

    const updateUI = () => {
        updateDashboard();
        renderActivityList();
        updateCharts();
        updateSustainableTip();
    };

    const updateDashboard = () => {
        const totalFootprint = activities.reduce((sum, activity) => sum + activity.footprint, 0);
        totalFootprintEl.textContent = `${totalFootprint.toFixed(2)} kg`;
    };

    const renderActivityList = () => {
        activityListEl.innerHTML = '';
        if (activities.length === 0) {
            activityListEl.innerHTML = '<p>Nenhuma atividade registrada ainda.</p>';
            return;
        }

        const reversedActivities = [...activities].reverse();
        reversedActivities.forEach(activity => {
            const item = document.createElement('div');
            item.className = 'activity-item';
            
            let description = '';
            const date = new Date(activity.date).toLocaleDateString('pt-BR');

            if(activity.category === 'transport') {
                description = `${date}: ${activity.distance} km de ${activity.type}`;
            } else if (activity.category === 'energy') {
                description = `${date}: ${activity.energyUsage} kWh de energia`;
            } else if (activity.category === 'food') {
                description = `${date}: Dieta (${activity.dietType.replace('-', ' ')})`;
            }
            
            item.innerHTML = `
                <p>${description}</p>
                <span class="footprint">${activity.footprint.toFixed(2)} kg CO₂</span>
            `;
            activityListEl.appendChild(item);
        });
    };
    
    const updateSustainableTip = () => {
        if (activities.length === 0) {
            sustainableTipEl.textContent = SUSTAINABLE_TIPS.general;
            return;
        }

        const totals = getCategoryTotals();
        const maxCategory = Object.keys(totals).reduce((a, b) => totals[a] > totals[b] ? a : b, null);
        
        sustainableTipEl.textContent = SUSTAINABLE_TIPS[maxCategory] || SUSTAINABLE_TIPS.general;
    };

    const getCategoryTotals = () => {
        return activities.reduce((acc, activity) => {
            acc[activity.category] = (acc[activity.category] || 0) + activity.footprint;
            return acc;
        }, { transport: 0, energy: 0, food: 0 });
    };

    const getHistoryData = () => {
        const history = activities.reduce((acc, activity) => {
            const date = activity.date;
            acc[date] = (acc[date] || 0) + activity.footprint;
            return acc;
        }, {});
        
        const sortedDates = Object.keys(history).sort((a,b) => new Date(a) - new Date(b));
        const labels = sortedDates.map(date => new Date(date).toLocaleDateString('pt-BR'));
        const data = sortedDates.map(date => history[date]);

        return { labels, data };
    };

    const updateCharts = () => {
        const categoryCtx = document.getElementById('category-chart').getContext('2d');
        const historyCtx = document.getElementById('history-chart').getContext('2d');

        const categoryTotals = getCategoryTotals();
        const historyData = getHistoryData();

        if (categoryChart) {
            categoryChart.destroy();
        }
        categoryChart = new Chart(categoryCtx, {
            type: 'doughnut',
            data: {
                labels: ['Transporte', 'Energia', 'Alimentação'],
                datasets: [{
                    data: [categoryTotals.transport, categoryTotals.energy, categoryTotals.food],
                    backgroundColor: ['#40916C', '#52B788', '#95D5B2'],
                    borderColor: '#FFFFFF',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                }
            }
        });
        
        if (historyChart) {
            historyChart.destroy();
        }
        historyChart = new Chart(historyCtx, {
            type: 'line',
            data: {
                labels: historyData.labels,
                datasets: [{
                    label: 'Emissão Diária de CO₂',
                    data: historyData.data,
                    fill: true,
                    borderColor: '#2D6A4F',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    };

    transportForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const activity = {
            category: 'transport',
            type: e.target.elements['transport-type'].value,
            distance: parseFloat(e.target.elements.distance.value),
        };
        addActivity(activity);
        transportForm.reset();
    });

    energyForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const activity = {
            category: 'energy',
            energyUsage: parseFloat(e.target.elements['energy-usage'].value)
        };
        addActivity(activity);
        energyForm.reset();
    });
    
    foodForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const activity = {
            category: 'food',
            dietType: e.target.elements['diet-type'].value
        };
        addActivity(activity);
        foodForm.reset();
    });

    clearDataBtn.addEventListener('click', () => {
        if (confirm('Você tem certeza que deseja apagar todo o histórico?')) {
            activities = [];
            saveActivities();
            updateUI();
        }
    });

    updateUI();
});