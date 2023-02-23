<template>
    <div id="openInventoryBtn" @click="open_inventoty()"></div>
    <div class="bag" id="bag" style="visibility: hidden;">
            <div class="bag_frame">
                <ul class="bag_inner">
                    <li class="item_holder">
                        <div class="img_helmet"></div>
                        <div class="add_item_slot">
                            <div class="add_item_button" @click="add_item_to_slot()"></div>
                        </div>
                    </li>
                    <li class="item_holder">
                        <div class="img_armor"></div>
                        <div class="add_item_slot">
                            <div class="add_item_button" @click="add_item_to_slot()"></div>
                        </div>
                    </li>
                    <li class="item_holder">
                        <div class="img_sword"></div>
                        <div class="add_item_slot">
                            <div class="add_item_button" @click="add_item_to_slot()"></div>
                        </div>
                    </li>
                    <li class="item_holder">
                        <div class="img_shield"></div>
                        <div class="add_item_slot">
                            <div class="add_item_button" @click="add_item_to_slot()"></div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
</template>

<script lang="ts">

export default {
    name: "BagInventory",
    methods: {
        async add_item_to_slot() {
            alert('No functionality yet!')
        },
        async open_inventoty() {
        const element = document.getElementById('bag');
        const button = document.getElementById('inventory_openbutton');
        if (element != null) {
            if (element.style.visibility == 'hidden') {
                element.style.visibility = 'visible';
                if (button != null) {
                    button.style.backgroundColor = 'rgba(255, 126, 0, 0.185)'

                }
            } else {
                    element.style.visibility = 'hidden';
                    if (button != null) {
                        button.style.backgroundColor = 'rgba(255, 196, 0, 0.185)'
                    }
                }
            }
        }
    }
}
</script>

<style>
 #openInventoryBtn {
    width: 100px;
    height: 100px;
    background-color:rgba(255, 196, 0, 0.185);
    outline-color: rgba(0, 0, 0, 0.295);
    outline-width: 3px;
    outline-style: solid;
    border-radius:30%;
    background-image: url('../assets/images/inventory_image.png');
    background-size: 100px 100px;
    position: relative;
    margin-top: 400px;
    margin-left: 1750px;
 }

 .bag {
    width: 400px;
    height: 500px;
    margin-left: 1450px;
    top: 190px;
    background-color:rgba(44, 0, 0, 0.712);
    position: fixed;

 }

 .bag_frame {
    margin-left: -50px;
    margin-top: -50px;
    width: 500px;
    height: 585px;
    border-radius: 10%;
    position: fixed;
    background-image: url('../assets/images/bag_frame.png');
    background-size: 500px 585px;
 }

 .bag_inner {
    margin-top: 90px;
    margin-left: 170px;
    width: 340px;
    height: 430px;
    position: fixed;
    display: table-column;
 }

 .img_helmet {
    content:url('../assets/images/homePage_slotImages/helm.png');
 }

 .img_armor {
    content: url('../assets/images/homePage_slotImages/armor.png');
 }

 .img_sword {
    content: url('../assets/images/homePage_slotImages/sword_slot_image.png');
 }

 .img_shield {
    content: url('../assets/images/homePage_slotImages/shield_slot_image.png');
 }

 .add_item_slot {
    width: 70px;
    height: 70px;
    margin-left: 100px;
    background-size: 70px 70px;
    background-image: url('../assets/images/homePage_slotImages/item_slot_image.png');
    position: fixed;
 }

 .item_holder {
    width: 170px;
    height: 70px;
    margin-top: 20px;
    display: flex;
    padding: auto;
 }

 .add_item_button {
    width: 50px;
    height: 50px;
    margin-top: 10px;
    margin-left: 10px;
    background-size: 50px 50px;
    background-image: url('../assets/images/homePage_slotImages/plus_button.png');
 }
</style>