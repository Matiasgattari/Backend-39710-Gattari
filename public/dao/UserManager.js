import fs from 'fs/promises'
import mongoose from 'mongoose';

import { usuarioModel } from './models/schemaUsuarios.js';
import { hashear } from '../../src/utils/criptografia.js';
import { Persistencia } from './fileSystemProducts.js';
import { toPojo } from '../../src/utils/utilidades.js';


export class UserManager {
    
        constructor(path) {
            this.users;
            this.path = path;
            this.persistencia =new Persistencia(path)
        }
    
    
        async readUsers() {
            const data = await fs.readFile(this.path, "utf-8");
            this.users = JSON.parse(data);
        }
    
        async getUsers() {
           try {
            await this.saveUsersLocal()
            return this.users
           } catch (error) {
            throw new Error('SERVER-COMUNICATION-ERROR')
           }
        }

        async getUserById(id) {
            try {
                const usuarioFiltrado = await usuarioModel.find({_id:id}).lean()
                if (!usuarioFiltrado) {return "user not found"} else {return usuarioFiltrado}
               } catch (error) {
                throw new Error('NOT-FOUND')
               }
        }
        async getUserByUserName(userName) {
          try {
            const usuarioFiltrado = await usuarioModel.findOne({email: userName}).lean();
            if (usuarioFiltrado) {
              return usuarioFiltrado;
            }
            else {
              throw new Error("NOT-FOUND");
            }
          } catch (error) {
            throw new Error('NOT-FOUND')
          }
        }
        async saveUsersLocal(){
            try {
            const usuarios = await usuarioModel.find().lean()
            this.users = usuarios;
            const jsonUsers = JSON.stringify(this.users, null, 2)
            // await fs.writeFile(this.path, jsonUsers)
            await this.persistencia.saveTxt(jsonUsers)
            
            } catch (error) {
                throw new Error('SERVER-COMUNICATION-ERROR')
            }
        }
        async createUser(user){
            try {
                const usuarioCreado = await usuarioModel.create(user)
                await this.saveUsersLocal()
                return toPojo(usuarioCreado)
               } catch (error) {
                throw new Error('Campo-vacio')
               }
        }

        async updateUser(id,nuevoModificado){
            try {
                const filtro = {_id:id}
                const update = nuevoModificado
                const modificado = await usuarioModel.findOneAndUpdate(filtro,update)
                await this.saveUsersLocal()
                return toPojo(modificado)
               } catch (error) {
                throw new Error('NOT-FOUND')
               }
        }

        async deleteUser(id){
            try {
                const eliminado = await usuarioModel.findOneAndDelete({_id:id})
                await this.saveUsersLocal()
                return toPojo(eliminado)
               } catch (error) {
                throw new Error('ELIMINACION-FALLIDA')
               }
        }

}


export const userManager = new UserManager('./usuarios.txt')

