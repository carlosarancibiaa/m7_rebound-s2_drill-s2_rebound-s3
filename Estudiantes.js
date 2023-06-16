import consulta from './pool.js'

class Estudiantes{
    constructor(nombre, apellido, edad, nro_identificacion){
        this.nombre = nombre;
        this.apellido= apellido;
        this.edad = edad;
        this.nro_identificacion = nro_identificacion;
    }
    static findAll(query){
        return new Promise(async(resolve, reject) => {
            try{
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
                    text: 'INSERT INTO estudiantes (nombre, apellido, edad, nro_identificacion) VALUES($1, $2, $3, $4) RETURNING id, nombre, apellido, edad, nro_identificacion',
                    values: [this.nombre, this.apellido, this.edad, this.nro_identificacion]
                };
                let resultado = await consulta(query);
                return resolve(resultado);
            }catch(error){
                reject(error);
            }
        })
    }

    static updateUser(id, nombre, apellido, edad, nro_identificacion) {
		return new Promise(async (resolve, reject) => {
            try {
                let query = {
                    text: 'UPDATE estudiantes SET nombre=$2, apellido=$3, edad=$4, nro_identificacion=$5 WHERE id = $1',
					values: [id, nombre, apellido, edad, nro_identificacion],
				};
				let resultado = await consulta(query);
				return resolve(resultado);
			} catch (error) {
                console.log(error)
				reject(error);
			}
		});
	}

    static deleteUser(id) {
        return new Promise(async (resolve, reject)=>{
            try {
                let query = {
                    text:`DELETE FROM estudiantes WHERE id=$1`,
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

export default Estudiantes

// Estudiantes.createUser("Juan", "Valenzuela", 22, 854534562);
// Estudiantes.createUser("Gerardo", "Camacho", 42, 524534562);
// Estudiantes.createUser("Valentina", "Vielma", 26, 452114874);