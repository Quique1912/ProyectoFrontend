import { FormEvent, useEffect, useState } from "react"
import Category from "../models/Category"
import { CategoryService } from "../services/category.service"

interface CategoryFormProps{
    onSubmit: (e:FormEvent, name: string) => void
}
function CategoryForm({onSubmit}:CategoryFormProps) {
    const [name, setName] = useState('')
    return (
        <form onSubmit={(e)=>onSubmit(e, name)} className="text-white">
            <label htmlFor="name">Nombre:</label>
            <input id="name" name="name" value={name} onChange={(e)=>setName(e.target.value)}/>
            <button>Guardar</button>
        </form>
    )
}

interface CategoryListProps{
    categories: Category[]
    onDelete: (id: number) => void
}
function CategoryList({categories, onDelete}: CategoryListProps) {
    return (
        <div className="text-white">
        {categories.map(category =>  
            <div key={category.id}>
                {category.name} -
                <button onClick={()=>onDelete(category.id)}>Borrar</button>
            </div>
        )}
        </div>
    )
}


function CategoryManager() {
    const [categories, setCategories] = useState<Category[]>([])

    useEffect(()=>{ // cargar las categorias de la BD
        CategoryService
            .getAll()
            .then(setCategories)
    }, [])

    const handleCreate = async (e: FormEvent, name: string) => { // guardar una categoria
        e.preventDefault()
        const nuevaCategory = await CategoryService.create({name})
        setCategories([...categories, nuevaCategory])
    }
    
    const handleDelete = (id: number) => { // borrar una categoria
        if (!window.confirm("¿Estás seguro que quieres borrar esta categoría?"))
            return;
        CategoryService.delete(id)
        setCategories(categories?.filter((category) => category.id !== id));
    }
    
    return (
        <div>
            <h1 className="text-4xl font-extrabold dark:text-white">Gestión de categorías</h1>
            <CategoryForm onSubmit={handleCreate}></CategoryForm>
            <CategoryList categories={categories} onDelete={handleDelete}></CategoryList>
        </div>
    )
}

export default CategoryManager