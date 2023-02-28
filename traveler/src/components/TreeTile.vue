<template>
    <button v-if="treeShown" class="treeTile"></button>
</template>

<script lang="ts">

export default {
    name: "tree-tile",
    props: {
        treeShown: {
            type: Boolean,
            required: true
        }
    }
}
</script>
<style>
.treeTile {
    width: 100px;
    height: 100px;
    background: none;
    border: 2px solid rgb(108, 108, 108);
    border-radius: 20%;
    margin-left: 2%;
    display: inline-flex;
    align-items: flex-end;
    background-image: url('../assets/images/homePage_slotImages/tree.png');
    background-size: 100% 100%;
}
</style>