'use client';
import { useUser } from '@clerk/nextjs';
import { useState, useEffect } from 'react';
import axios from 'axios';
<<<<<<< HEAD
import CSVUploader from '@/components/statistics/csvUploader';

export default function Profile() {

=======
import FriendRequest from '@/app/components/friendRequest';
import RespondRequest from '@/app/components/respondRequest';
import CSVUploader from "@/app/components/csvUploader";

export default function Profile() {
>>>>>>> 39b33c88769eecb77bab96a1ee8a96fb96f1a7f6
    const { user, isSignedIn } = useUser();
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [receivedRequests, setReceivedRequests] = useState([]);
    const [sentRequests, setSentRequests] = useState([]);
    const [friends, setFriends] = useState([]);
    const [isUser, setIsUser] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('/api/prisma/currentUser');
                const data = response.data;

                if (response.status === 200) {
                    setProfileData(data.currentUser);
                    setReceivedRequests(data.recievedFriendRequests || []);
                    setSentRequests(data.sentFriendRequests || []);
                    setFriends(data.friends || []);

                    // Check if the profile matches the logged-in user
                    if (data.currentUser.username === user?.username || data.user?.id === user?.id) {
                        setIsUser(true);
                    }
                } else {
                    setError(data.error || 'An error occurred');
                }
            } catch (err) {
                setError("Error fetching profile data");
                console.error(err);  // Log the error for debugging
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchProfile();
        }
    }, [user]);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }
    return (
        <div className='main-div'>
            <div className='main-content'>
                <h1>Profile</h1>
                <CSVUploader />
                <h1>Welcome, {user?.username}</h1>

                {/* Friend request actions */}
                {isSignedIn && !isUser && (
                    <FriendRequest 
                        sessionUserId={user?.username || user?.id} 
                        requestUserId={profileData?.username}  
                    />

                )}
                <br />
                {/* Friends List */}
                <h1>Friends</h1>
                {friends.length > 0 ? (
                    <ul>
                        {friends.map((friend) => (
                            <li key={friend.id}>
                                <p>Username: {friend.friendname}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No friends found.</p>
                )}
                <br />
                {/* Friend requests */}
                <h1>Friend Requests</h1>
                <h3>Received Requests</h3>
                <ul>
                    {receivedRequests.length > 0 ? (
                        receivedRequests.map((request) => (
                            <li key={`${request.id}-${request.senderUsername}`}>
                                <RespondRequest 
                                    key={request.id} 
                                    senderUsername={request.senderUserName} 
                                    receiverUserName={request.receiverUserName} 
                                />
                            </li>
                        ))
                    ) : (
                        <p>No received friend requests.</p>
                    )}
                </ul>
                <h3>Sent Requests</h3>
                <ul>
                    {sentRequests.length > 0 ? (
                        sentRequests.map((request) => (
                            <li key={request.id}>
                                To: {request.receiverUserName}
                            </li>
                        ))
                    ) : (
                        <p>No sent friend requests.</p>
                    )}
                </ul>
            </div>
        </div>
    );
}
