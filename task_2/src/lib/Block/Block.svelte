<script>
    import {onMount, onDestroy} from 'svelte';
    import {writable} from 'svelte/store';


    export let ratesRef;
    export let value;
    export let currency;
    export let onChangeValue;
    export let onChangeCurrency;

    const dropdownRef = writable(null);
    let showDropdown = false;

    const toggleDropdown = () => {
        showDropdown = !showDropdown;
    };

    const handleClickOutside = (event) => {
        if (dropdownRef && $dropdownRef && $dropdownRef.current && !$dropdownRef.current.contains(event.target)) {
            showDropdown = false;
        }
    };

    onMount(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    });

    onDestroy(() => {
        document.removeEventListener("mousedown", handleClickOutside);
    });

    let currencies = [];

    $: {
        currencies = Object.keys(ratesRef || {});
    }

    const selectCurrency = (cur) => {
        onChangeCurrency(cur);
        showDropdown = false;
    };
</script>

<div class="block">
    <div class="currencies">
        <div class="selected-currency" bind:this={$dropdownRef} on:click={toggleDropdown}>{currency}</div>
        <ul class="dropdown-content" style="{showDropdown ? 'display: block;' : 'display: none;'}">
            {#each currencies as cur}
                <li
                        on:click={() => selectCurrency(cur)}
                        class:selected={currency === cur}
                        key={cur}>
                    {cur}
                </li>
            {/each}
        </ul>
    </div>
    <input bind:value={value} type="number" placeholder="0" on:input={e => onChangeValue(e.target.value)}/>
</div>

