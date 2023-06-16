
import consulta from './pool.js'

class Curso{
    constructor(titulo, descripcion){
        this.titulo = titulo;
        this.descripcion=descripcion;
    }

    static findAll(){
        return new Promise(async(resolve, reject)=>{
            try{
                let query={
                    text:'SELECT titulo, descripcion FROM curso',
                    values:[]
                }
                let resultado = await consulta(query);
                return resolve(resultado);
            }catch(error){
                reject(error);
            }
        })
    }
    createUser(){
        return new Promise(async(resolve, reject)=>{
            try{
                let query = {
                    text: 'INSERT INTO curso (titulo, descripcion) VALUES($1, $2) RETURNING id, titulo, descripcion',
                    values: [this.titulo, this.descripcion]
                };
                let resultado = await consulta(query);
                return resolve(resultado);
            }catch(error){
                console.log(error)
                reject(error);
            }
        })
    }

    static updateUser(id, titulo, descripcion) {
		return new Promise(async (resolve, reject) => {
			try {
				let query = {
					text: 'UPDATE curso SET titulo=$2, descripcion=$3 WHERE id = $1',
					values: [id, titulo, descripcion],
				};
				let resultado = await consulta(query);
				return resolve(resultado);
			} catch (error) {
				reject(error);
			}
		});
	}

    static deleteUser(id) {
        return new Promise(async (resolve, reject)=>{
            try {
                let query = {
                    text:`DELETE FROM curso WHERE id=$1`,
                    values:[id],
                };
                let resultado = await consulta (query);
                return resolve (resultado);
            } catch (error) {
                reject(error)
            }
        })
    }

}

export default Curso;