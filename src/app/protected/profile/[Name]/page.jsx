'use client';
import { useUser } from '@clerk/nextjs';
import { useState, useEffect } from 'react';
import RespondRequest from '@/app/components/respondRequest';
import NavBar from '@/app/components/navbar';

export default function ProfilePage({ params }) {
    const { user, isSignedIn } = useUser();
    const username = params.Name;

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
                const response = await fetch(`/api/profile?username=${username}`);
                const data = await response.json();

                if (response.ok) {
                    setProfileData(data.user);
                    setReceivedRequests(data.recievedFriendRequests || []);
                    setSentRequests(data.sentFriendRequests || []);
                    setFriends(data.friends || []);

                    // Check if the profile matches the logged-in user
                    if (data.user.username === user?.username || data.user.id === user?.id) {
                        setIsUser(true);
                    }

                } else {
                    setError(data.error || 'An error occurred');
                }
                
            } catch (err) {
                setError('Error fetching profile data');
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchProfile();
        }
    }, [username, user]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <NavBar/>
            <h1>Profile of {profileData?.username}</h1>
            <h3>You are: {user?.username || user?.id}</h3> {/* Fallback to id if username is not available */}

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

            <br></br>
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
    );
}
