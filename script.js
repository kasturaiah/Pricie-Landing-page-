document.addEventListener('DOMContentLoaded', () => {
    const toggleButtons = document.querySelectorAll('.toggle-details');
    const pricingButtons = document.querySelectorAll('.toggle-pricing button');
    const currencySelector = document.getElementById('currency');

    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const details = button.nextElementSibling;
            if (details.style.display === 'block') {
                details.style.display = 'none';
                button.textContent = 'More Details';
            } else {
                details.style.display = 'block';
                button.textContent = 'Less Details';
            }
        });
    });

    pricingButtons.forEach(button => {
        button.addEventListener('click', () => {
            pricingButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            updatePrices();
        });
    });

    currencySelector.addEventListener('change', updatePrices);

    function updatePrices() {
        const period = document.querySelector('.toggle-pricing button.active').id;
        const currency = currencySelector.value;
        const exchangeRates = {
            usd: 1,
            eur: 0.85,
            gbp: 0.75
        };
        const rate = exchangeRates[currency];

        document.querySelectorAll('.price').forEach(priceElement => {
            const price = parseFloat(priceElement.dataset[period]) * rate;
            priceElement.textContent = `${currency.toUpperCase()} ${price.toFixed(2)}/${period === 'monthly' ? 'month' : 'year'}`;
        });
    }

    updatePrices();
});