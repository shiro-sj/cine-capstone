export default function FriendsList({ friend, isUser }){

    const handleUnfriend = async () =>{
        try{
            const response = await fetch(`/api/friends/deleteFriend`, {
                method: "POST",
                headers: { 'Content-Type' : 'application/json' },
                body: JSON.stringify({user: friend.username , friend : friend.friendname}),
              });
        }catch(error){
            console.log(error)
        }
    }

    return (
    <div className="flex">
        <p>{friend.friendname}</p>
        {isUser &&
        
        <button 
        onClick= {handleUnfriend} 
        className="">
        Unfriend</button>
        }
          
    </div>
    )
}