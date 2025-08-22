import React from 'react'
import waves from './waves.svg'

const Waves = () => {
    return (
        <div className='absolute bottom-0 w-full overflow-hidden'>
            <svg width="100%" height="100%" id="svg" viewBox="0 0 1440 390" xmlns="http://www.w3.org/2000/svg" class="transition duration-300 ease-in-out delay-150">
                <defs><linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%"><stop offset="5%" stop-color="#0693e3"></stop><stop offset="95%" stop-color="#0693e3"></stop></linearGradient></defs><path d="M 0,400 L 0,100 C 117.45454545454544,109.77990430622009 234.90909090909088,119.5598086124402 319,117 C 403.0909090909091,114.4401913875598 453.81818181818187,99.54066985645932 551,94 C 648.1818181818181,88.45933014354068 791.8181818181818,92.2775119617225 899,102 C 1006.1818181818182,111.7224880382775 1076.909090909091,127.3492822966507 1161,128 C 1245.090909090909,128.6507177033493 1342.5454545454545,114.32535885167465 1440,100 L 1440,400 L 0,400 Z" stroke="none" stroke-width="0" fill="url(#gradient)" fill-opacity="0.53" class="transition-all duration-300 ease-in-out delay-150 path-0"></path>
                <defs><linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%"><stop offset="5%" stop-color="#0693e3"></stop><stop offset="95%" stop-color="#0693e3"></stop></linearGradient></defs><path d="M 0,400 L 0,233 C 86.91866028708134,256.77033492822966 173.83732057416267,280.5406698564594 284,279 C 394.1626794258373,277.4593301435406 527.5693779904307,250.6076555023923 628,234 C 728.4306220095693,217.3923444976077 795.8851674641147,211.0287081339713 871,226 C 946.1148325358853,240.9712918660287 1028.88995215311,277.2775119617225 1125,282 C 1221.11004784689,286.7224880382775 1330.5550239234449,259.8612440191388 1440,233 L 1440,400 L 0,400 Z" stroke="none" stroke-width="0" fill="url(#gradient)" fill-opacity="1" class="transition-all duration-300 ease-in-out delay-150 path-1"></path></svg>
        </div>
    )
}

export default Waves