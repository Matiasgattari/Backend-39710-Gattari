import { randomUUID} from 'crypto'
export class Cart {

    constructor() {
        this.id = randomUUID();
        this.quantity = 0;
        this.products = [];
    }
}

