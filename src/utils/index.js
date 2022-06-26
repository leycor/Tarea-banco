/*
En el banco “El Tesoro” existe un sistema de atención por taquillas 1, 2 y 3 a través de una cola
virtual creada a partir de la cédula de identidad del cliente o titular que recién ingresa. El sistema genera un
código único con los últimos 3 dígitos, pero si ya existen entonces los 3 penúltimos o los 3 antepenúltimos,
así sucesivamente hasta encontrar un código distinto a los existentes en la cola virtual. En caso extremo de
no conseguir ternas de dígitos distintivos entonces se invierten todos los dígitos de la cédula y se repite el
procedimiento anterior.

Ejemplo: Cédula 22543233 le corresponde clave 233, pero si ya otra persona en cola tiene 233
entonces el sistema genera clave 323, pero si persiste la situación la nueva clave sería 432… En caso
extremo de fallar con todas las ternas hasta 225 entonces se invierte la cédula así 33234522 y se repite el
proceso de pruebas de claves desde 522.

En función de la información se requiere un programa que controle los procesos con las
siguientes estructuras de datos:

    1- Una cola para las claves de los usuarios en espera.
    2- Una pila para invertir los dígitos de la cédula en el algoritmo de generación de clave única.

La interfaz de usuario visualiza la cola de números actualizada y el número que están siendo atendido en cada taquilla. Ejecute los procesos presionando las siguientes teclas:
    
    A: para ingresar por teclado la cédula, generar el código y agregar a la cola.
    1: para finalizar la atención del cliente en taquilla 1 y llamar al siguiente de la cola virtual.
    2: para finalizar la atención del cliente en taquilla 2 y llamar al siguiente de la cola virtual.
    3: para finalizar la atención del cliente en taquilla 3 y llamar al siguiente de la cola virtual.
    F: finalizar la ejecución del programa.
*/

// const reverse = (dni) => {
//     const lastNumberdni = dni.length - 1
//     let dniReverse = ""
    
//     for (let i = 0; i < dni.length; i++) {
//         dniReverse += dni[lastNumberdni - i]
//     }
    
//     return dniReverse;
// };

// ======================= UTILS ======================= // 

// Formatea la cedúla y retorna el dato en reverso.
export const reverse = (dni) => {
    const pilaDni = []
    let reverseDni = ''
    for(const num of dni){
        pilaDni.unshift(num)
    }
    for(const num of pilaDni){
        reverseDni += num
    }
    return reverseDni
};

// Crea una lista con todos los codigos disponibles de la cédula.
export const allCodeDniGenerate = (dni) => {
    const allCode = []

    while(dni.length >= 3){
        const lastDigit = dni.length - 1
        const initDigit = lastDigit - 2
        let formatCode = ''
        for(let i = initDigit ; i <= lastDigit; i++){
            formatCode += dni[i]
        }
        allCode.push(formatCode)
        const dniPop = dni.substring(0, dni.length - 1);
        dni = dniPop
    }
    return allCode
    
}

// Agrega a la lista los codigos generados.
const generateCode = (dni) => {
    const dniReverse = reverse(dni)
    const allCodeNormalDni =  allCodeDniGenerate(dni)
    const allCodeReverseDni = allCodeDniGenerate(dniReverse)

    for(code of allCodeReverseDni){
        allCodeNormalDni.push(code)
    }

    for(code of allCodeNormalDni){
        if(bankLocker.length === 0){
            bankLocker.push(code)
            break
        }

        if(!bankLocker.includes(code)){
            bankLocker.push(code)
            break
        }

    }

};

// ======================= UTILS ======================= // 

// Menu
// const menuON = true
// const bankLocker = []

// while(menuON){
//     const responseUser = prompt('Digite una opción\n [A]-Ingresar cédula\n [M]-Mostrar cola\n [F]-Finalizar programa')

//     if(responseUser.toLocaleLowerCase() === 'a'){
//         const dni = prompt('Digite su cedúla de identidad')
//         generateCode(dni)
//     }

//     if(responseUser.toLocaleLowerCase() === 'm'){
//         if(bankLocker.length === 0){
//             alert('La cola está vacia')
//         } else{
//             alert(bankLocker)
//         }
//     }

//     if(responseUser.toLocaleLowerCase() === 'f'){
//         menuON = false
//     }
// }


/*
Normal                      Reverse
22543233 - 233              33234522 - 522
2254323 - 323               3323452 - 452
225432 - 432                332345 - 345
22543 - 543                 33234 - 234
2254 - 254                  3323 - 323
225 - 225                   332 - 332

*/



