import CSVUploader from "@/app/components/csvUploader"
import NavBar from "@/app/components/navbar"

export default function Profile(){
    return(
        <div>
            <NavBar/>
            <h1>Profile</h1>
            <CSVUploader/>
        </div>
    )
}