<template>
    <div class="mapTile" v-if="epmtyTile"></div>
</template>

<script lang="ts">

export default {
    name: "empty-tile",
    props: {
        epmtyTile: {
            type: Boolean,
            default: false
        }
    }
}
</script>