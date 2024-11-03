
import WatchHistory from '../../components/statistics/watchHistory'
import { UserButton } from '@clerk/nextjs'

export default function Home(){
    return(
        <div>
            <UserButton/>
            <WatchHistory/>
        </div>
    )
};