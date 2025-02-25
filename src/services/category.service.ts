
import Category from "../models/Category"
import { fetchAPI } from "../utils/FetchAPI"
const API_URL_BASE = import.meta.env.VITE_API_URL_BASE

export class CategoryService {
    static async getAll() {
        return await fetchAPI(API_URL_BASE+'/categories?',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
    }

    static async getById(id:number) {
        return await fetchAPI(API_URL_BASE+'/categories/'+id,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
    }

    static async create(category: Partial<Category>) {
        return await fetchAPI(API_URL_BASE+'/categories', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(category),
            credentials: 'include'
        })
    }

    static async update(id:number, category: Partial<Category>) {
        return await fetchAPI(API_URL_BASE+'/categories/'+id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(category),
            credentials: 'include'
        })
    }
    static async delete(id: number){
        return await fetchAPI(API_URL_BASE+'/categories/'+id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
    }



}