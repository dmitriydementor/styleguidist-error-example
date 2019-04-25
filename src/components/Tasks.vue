<template>
    <div class="card-simple card--flat meetings-table">
        <div class="mgt-20">
            <b-table
                striped
                hover
                :fields="fields"
                :items="items"
                :current-page="currentPage"
                :per-page="perPage"
                :filter="filter"
            />

            <div class="text-center">
                <div class="text-center" v-show="items.length > perPage">
                    <b-pagination
                        :total-rows="totalRows"
                        :per-page="perPage"
                        v-model="currentPage"
                        class="pagination"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import BaseTable from './BaseTable'
    import { Component, Prop } from '@/components/BaseComponent'

    @Component({})
    export default class Tasks extends BaseTable {
        @Prop({ required: true }) userId!: number

        items = []
        fields: any[] = [
            { key: 'id', label: 'Id' },
            {
                key: 'date',
                sortable: true
            },
            {
                sortable: true,
                formatter: (value) => {
                    return !value ? '-' : value
                }
            },
            { key: 'description', label: 'Description' }
        ]
        resourceRoute = '/task'

        getList() {
            this.http.get(this.resourceRoute, {
                params: {
                    userId: this.userId
                }
            }, (response) => {
                this.items = response.body.tasks
            }, (error) => {
                console.error(error)
            })
        }

        created() {
            this.getList()

            this.$events.$on('task-refresh', () => {
                this.getList()
            })
        }
    }
</script>

<style lang='scss' scoped>
</style>
