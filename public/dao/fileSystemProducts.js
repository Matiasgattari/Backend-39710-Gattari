import fs from 'fs/promises'

export class Persistencia{
    constructor(path){
        this.path=path
    }
    async readTxt() {
        const data = await fs.readFile(this.path, "utf-8");
        return data
    }
   
   async saveTxt(producto){
        await fs.writeFile(this.path, producto)
   }
}
