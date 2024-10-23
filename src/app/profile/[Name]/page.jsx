'use client';
import { useUser } from '@clerk/nextjs';
import { useState, useEffect } from 'react';
import FriendRequest from '../../../components/friendRequest';
import RespondRequest from '../../../components/sentRequests';

export default function ProfilePage({ params }) {
    const { user, isSignedIn } = useUser(); // userId = clerkId

    const username = params.Name; 

    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [receivedRequests, setReceivedRequests] = useState([]);
    const [sentRequests, setSentRequests] = useState([]);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/profile?username=${username}`);
                const data = await response.json();

                if (response.ok) {
                    setProfileData(data.user);  // Assuming the response structure
                    setReceivedRequests(data.recievedFriendRequests);
                    setSentRequests(data.sentFriendRequests);
                } else {
                    setError(data.error || 'An error occurred');
                }
            } catch (err) {
                setError('Error fetching profile data');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [username]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            {isSignedIn ? (
                <FriendRequest 
                    sessionUserId={user.username} 
                    requestUserId={profileData.username}  
                />
            ) : (
                <p>You are not logged in</p>
            )}
            <h1>Profile of {profileData?.username}</h1>
            <h2>User ID: {profileData?.id}</h2>
            <p>Email: {profileData?.email}</p>
            <p>Profile Clerk ID: {profileData?.clerkId}</p>
            <h3>Current User Clerk ID: {user.username}</h3>
            <br />
            <h1>Friend Requests</h1>
            <h3>Received Requests</h3>
            <ul>
                {receivedRequests.map((request) => (
                    <ul>
                    {receivedRequests.map((request) => (
                        <RespondRequest key={request.id} request={request} />
                    ))}
                </ul>
                
                ))}
            </ul>
            <h3>Sent Requests</h3>
            <ul>
                {sentRequests.map((request) => (
                    <li key={request.id}>
                        To: {request.receiverId}
                    </li>
                ))}
            </ul>
        </div>
    );
}
