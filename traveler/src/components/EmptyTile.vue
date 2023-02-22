<template>
    <div class="epmtyTile" v-if="epmtyTile"></div>
</template>

<script lang="ts">

export default {
    name: "tree-tile",
    props: {
        epmtyTile: {
            type: Boolean,
            default: false
        }
    }
}
</script>
<style>
.epmtyTile {
    width: 100px;
    height: 100px;
    margin-left: 2%;
    display: inline-flex;
    align-items: flex-end;
}
</style>