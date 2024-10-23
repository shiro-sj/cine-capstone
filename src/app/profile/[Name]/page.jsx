'use client';
import { useAuth } from '@clerk/nextjs';
import { useState, useEffect } from 'react';
import FriendRequest from '../../../components/friendRequest'

export default function ProfilePage({ params }) {

    const { userId, isSignedIn } = useAuth(); //userId = clerkId

    const username = params.Name; 

    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/profile?username=${username}`);
                const data = await response.json();

                if (response.ok) {
                    setProfileData(data.user);  // Assuming the response structure
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
            {isSignedIn? (
                <FriendRequest 
                    sessionUserId = {userId} //clerkId
                    requestUserId = {profileData.id} //DB Id
                />
                ) : <p>youre not logged in</p>
            }
            <h1>Profile of {profileData?.username}</h1>
            <h2>User ID: {profileData?.id}</h2>
            <p>Email: {profileData?.email}</p>
            <p>Profile clerk id: {profileData.clerkId}</p>
            <h3>Current User ID: {userId}</h3>
            <br></br>
            <h1>Friends</h1>
            <p>sent friend requests:{profileData.sentRequests}</p>
        </div>
    );
}
