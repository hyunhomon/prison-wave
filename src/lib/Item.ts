class Item {
    id: string
    name: string
    description: string

    constructor(
        id: string,
        name: string,
        description: string
    ) {
        this.id = id
        this.name = name
        this.description = description
    }

    use() {}
}

export default Item