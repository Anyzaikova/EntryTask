<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import Block from "./lib/Block/Block.svelte";
  import './app.css'


  let ratesRef = {};
  let fromCurrency = 'RUB';
  let toCurrency = 'USD';
  let fromPrice = 0;
  let toPrice = 1;
  const ratesStore = writable(ratesRef);

  const loadRates = async () => {
    try {
      const res = await fetch("https://open.er-api.com/v6/latest");
      const data = await res.json();
      ratesRef = data.rates;
      ratesStore.set(ratesRef);
      onChangeToPrice(1);
    } catch (error) {
      console.error("Error fetching currencies:", error);
    }
  };

  const onChangeFromPrice = (value) => {
    const price = value / ratesRef[fromCurrency];
    const result = price * ratesRef[toCurrency];
    toPrice = result.toFixed(2);
    fromPrice = value;
  };

  const onChangeToPrice = (value) => {
    const result = (ratesRef[fromCurrency] / ratesRef[toCurrency]) * value;
    toPrice = value;
    fromPrice = result.toFixed(2);
  };

  const onChangeFromCurrency = (currency) => {
    fromCurrency = currency;
    onChangeFromPrice(fromPrice);
  };

  const onChangeToCurrency = (currency) => {
    toCurrency = currency;
    onChangeToPrice(toPrice);
  };

  onMount(loadRates);
</script>
<div class="App">

        <Block
                value={fromPrice}
                onChangeValue={onChangeFromPrice}
                currency={fromCurrency}
                onChangeCurrency={onChangeFromCurrency}
                ratesRef={ratesRef}
        />
        <Block
                value={toPrice}
                onChangeValue={onChangeToPrice}
                currency={toCurrency}
                onChangeCurrency={onChangeToCurrency}
                ratesRef={ratesRef}
        />
    </div>




