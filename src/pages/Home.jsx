import React from 'react'
import CrimeInvestigationApp from '../components/CrimeInvestigationApp'
import Back from '../assets/svg/Back'

const Home = () => {
    return (
        <div className='bg-gradient-to-br from-slate-900 to-slate-700 text-white'>
            <Back/>
            <CrimeInvestigationApp/>
        </div>
    )
}

export default Home