import {
    randomUUID
} from 'crypto'


//constructor para creacion de productos nuevos
export class Product {
    #title
    #description
    #price
    #thumbnail
    #code
    #stock
    #category
    #id
    #status
    #owner
   
    constructor(
        {title,
        description,
        price,
        thumbnail,
        code,
        stock,
        category,
        owner}
    ) {
        if (!title||!description||!price||!thumbnail||!code||!stock||!category) {
            throw new Error('Campo-vacio')
          }
          
          if(typeof(price)!=="number"||typeof(stock)!=="number"){
            throw new Error('Campo-con-valor-invalido')
          }
          
          if(typeof(title)!=="string"||typeof(description)!=="string"||typeof(thumbnail)!=="string"||typeof(code)!=="string"||typeof(category)!=="string"){
            throw new Error('Campo-con-valor-invalido')
          }


        this.#title = title;
        this.#description = description;
        this.#price = price;
        this.#thumbnail = thumbnail;
        this.#code = code;
        this.#stock = stock;
        this.#category = category;
        this.#id = randomUUID();
        this.#status = true;
        this.#owner = owner || "Admin";
    }

    async dto() {
        return await {
            title:this.#title,
            description:this.#description,
            price:this.#price,
            thumbnail:this.#thumbnail,
            code:this.#code,
            stock:this.#stock,
            category:this.#category,
            id:this.#id,
            status:this.#status,
            owner:this.#owner
        }
      }
}
