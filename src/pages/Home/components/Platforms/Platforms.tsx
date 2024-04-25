import style from './Platforms.module.scss';
import type { Platforms } from '../../../../model/types';
import windows from '../../../../assets/images/windows.svg';
import linux from '../../../../assets/images/linux.svg';
import macos from '../../../../assets/images/macos.svg';
import android from '../../../../assets/images/android.svg';
import playstation from '../../../../assets/images/playstation.svg';
import xbox from '../../../../assets/images/xbox.svg';

interface IPlatforms {
    data: Platforms[]
}

export default function Platforms({ data }: IPlatforms) {
    const platforms = [
        {
            name: 'windows',
            flag: false,
            img: windows
        },
        {
            name: 'linux',
            flag: false,
            img: linux
        },
        {
            name: 'macos',
            flag: false,
            img: macos
        },
        {
            name: 'android',
            flag: false,
            img: android
        },
        {
            name: 'playstation',
            flag: false,
            img: playstation
        },
        {
            name: 'xbox',
            flag: false,
            img: xbox
        }
    ];

    platforms.forEach((plat, index) => {
        if(data.find(el => el.platform.name.toLowerCase().includes(plat.name.toLowerCase()))) {
            platforms[index].flag = true;
        }
    })

    return(
        <div className={style.container}>
            {platforms.map(el => {
                return el.flag && <img src={el.img} alt={el.name} key={el.name} />
            })}            
        </div>
    )
}