import React from 'react'
import { useRecoilState } from 'recoil'
import { dniState, userBankState } from './state'
import mainLogo from './svg/mainLogo.svg'
import { UserCircleIcon, DesktopComputerIcon } from '@heroicons/react/solid'
import { reverse, allCodeDniGenerate } from './utils/index'

const taquillas = [
    { id: 1, user: '' },
    { id: 2, user: '' },
    { id: 3, user: '' },

]

const Header = () => {
    const [bankLockers, setBankLockers ] = React.useState(taquillas)
    const [dni, setDniState] = useRecoilState(dniState)
    const [userBank, setUserBankState] = useRecoilState(userBankState)

    const submitUserInTheBank = () => {
        const dniReverse = reverse(dni)
        const allCodeNormalDni =  allCodeDniGenerate(dni)
        const allCodeReverseDni = allCodeDniGenerate(dniReverse)
        const allCodeDni = allCodeNormalDni.concat(allCodeReverseDni)

        for(const code of allCodeDni){
            if(!userBank.includes(code)){
                setUserBankState([...userBank, code])
                setDniState('')
                break
            }
        }
    }

    const handleAttendUser = (id) => {
        console.log('atender a usuario en la taquilla', id)
        if(userBank.length === 0){ return }

        /*  Se crea un nuevo array vacio para recorrer el que tiene data y pasar cada uno de los valores al nuevo array
            de esta forma se obtiene una copia y es la que va sustituir el nuevo valor de la lista
        */
        const newDataUserBank = [ ...userBank ]
        const userAttend = newDataUserBank.shift()

        const newDataBankLockers = [...bankLockers ]

        newDataBankLockers.forEach( ( banLocker ) => {
            banLocker.id === id && ( banLocker.user = userAttend )
            return banLocker
        } )

        setUserBankState(newDataUserBank)
        setBankLockers(newDataBankLockers)

    }

    return (
        <>
            {/* Ingresar al sistema */}
            <div className='flex flex-col items-center p-5 font-mono'>
                <img src={mainLogo} alt="mainLogo" width={300} className='mb-5' />
                <p className='mb-5'>Digite su  número de cédula para ingresar al banco</p>
                <input
                value={dni}
                onChange={(e)=> setDniState(e.target.value)} 
                type="text" 
                className='border border-gray-500 p-2 text-sm w-80 italic text-center mb-3' 
                placeholder='Ejemplo: 23701893'/>
                <button onClick={submitUserInTheBank} className='w-80 p-2 text-white bg-blue-900 flex justify-center items-center hover:bg-blue-700'>Ingresar</button>
            </div>

            {/* Taquillas */}
            <div className='pl-5 font-mono'>
                {
                    bankLockers.map( ({id, user}) => (
                        <div key={id} className='flex items-center mb-2'>
                            <button onClick={ ()=> handleAttendUser(id) } className='flex flex-col justify-center items-center p-2 border-2 border-gray-500 mr-3 hover:border-blue-700'>
                                <p className='text-xs pr-2'>Taquilla {id}</p>
                                <p className='text-xs pr-2'>Atender</p>
                            </button>
                            <DesktopComputerIcon className='w-12 h-12 text-gray-700 mb-3' />
                            {
                                user &&
                                    <div className='flex flex-col justify-center items-center first:text-blue-700 first:font-bold'>
                                        <UserCircleIcon className='w-7 h-7 text-green-700' />
                                        <p className='text-sm'>{user}</p>
                                    </div>
                            }
                        </div>
                    ))
                }
            </div>


            {/* Lista de usuarios en espera */}
            <div className='flex flex-col items-center mt-8 font-mono'>
                <p className='mb-2'>Lista de usuarios en espera</p>
                <div className='flex justify-center gap-5  p-5 font-mono'>
                    {
                        userBank.map( user => (
                            <div key={user} className='flex flex-col justify-center items-center first:text-blue-700 first:font-bold'>
                                <UserCircleIcon className='w-9 h-9 text-gray-700' />
                                <p className='text-sm'>{user}</p>
                            </div>
                        ) )
                    }
                </div>
            </div>
        </>
    )
}

export default Header