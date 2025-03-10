<template>
    <div class="mapTile" v-if="emptyTile"></div>
</template>

<script lang="ts">

export default {
    name: "empty-tile",
    props: {
        emptyTile: {
            type: Boolean,
            default: false
        }
    }
}
</script>