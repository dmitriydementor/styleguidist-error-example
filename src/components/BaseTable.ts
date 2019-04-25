/*eslint typescript/explicit-member-accessibility: 'off'*/
import { BaseComponent, Component } from '@/components/BaseComponent'

@Component
export default class BaseTable extends BaseComponent {
    presenter: any
    http: any
    currentPage = 1
    perPage = 25
    filter = null
    items: any[] = []
    fields: any[] = []
    destroyModalName = 'destroy-modal'
    storeModalName = 'store-modal'
    editModalName = 'edit-modal'
    resourceRoute = ''

    get totalRows() {
        return this.items.length
    }

    getList() {
        this.http.get(this.resourceRoute, {
            '_token': (<any>window).Laravel.csrfToken,
        }, (response) => {
            this.items = this.presenter.get(response.body)
        }, (error) => {
            console.error(error)
        })
    }

    created() {
        this.getList()
    }
}
