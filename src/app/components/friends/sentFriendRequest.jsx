export default function SentFriendRequest({ request }) {
    
    const handleDelete = async() =>{
        console.log('deleting')

        try{
            const response = await fetch(`/api/friends/respondRequest`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ requestSender: request.senderUserName , requestResponder: request.receiverUserName, action: 'REJECT' }),
                });
            if (response.ok) {
                console.log('Friend request rejected');
            } else {
                const errorData = await response.json();
                console.error('Error rejecting request:', errorData.error);
            }  
        }catch(error){
            console.log('there was an error ', error)
        }
    }

    return (
      <div>
        <span className="text-xl font-medium">To: {request.receiverUserName}</span>
        <button onClick={handleDelete}>delete</button>
      </div>
    );
}