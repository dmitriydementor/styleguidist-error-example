<template>
    <div>
        <b-table :fields="fields" :items="items">
            <template slot="action" slot-scope="row">
                <div class="text-right crud-buttons-slot">
                    <delete-btn
                        route="/user/children"
                        class="mgr-15 disabled"
                        :id="12"
                    >
                        <i class="fa fa-trash action red fa-lg pointer" slot-scope="{ events, data }" @click="events.showModal">
                            <util-modal :value="data.isModalOpen" @input="events.closeModal" width="400">
                                <confirm-form class="pd-10" compare-str="1" @on-valid="events.destroy"/>
                            </util-modal>
                        </i>
                    </delete-btn>
                    <edit-btn
                        route="/user/children"
                        :entity="row.item"
                    >
                        <span slot-scope="{ events, data }">
                            <slot name="edit-btn" :events="events">
                                <i class="fa fa-edit action blue fa-lg pointer" @click="events.showModal"/>
                            </slot>
                            <util-modal :value="data.isModalOpen" @input="events.closeModal" width="600">
                                <slot name="edit-form" :item="row.item" :edit="events.edit"/>
                            </util-modal>
                        </span>
                    </edit-btn>
                </div>
            </template>
        </b-table>
    </div>
</template>

<script lang="ts">
    import { BaseComponent, Component, Prop } from './BaseComponent'

    @Component({})
    export default class CrudTable extends BaseComponent {
        @Prop({ required: true }) fields!: any[]
        @Prop({ required: true }) items!: any[]
    }
</script>

<style lang="scss">
    .crud-buttons-slot {
        min-width: 150px;
    }
</style>
