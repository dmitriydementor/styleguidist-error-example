import Vue from 'vue'

export abstract class BaseComponent extends Vue {
    protected http = {}
}

export * from 'vue-property-decorator'
