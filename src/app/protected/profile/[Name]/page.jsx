'use client';
import { useUser } from '@clerk/nextjs';
import { useState, useEffect } from 'react';
import NavBar from '@/app/components/navbar';
import FriendRequest from '../../../components/friends/friendRequest';
import FriendsList from '../../../components/friends/FriendsList';

export default function ProfilePage({ params }) {
    const { user, isSignedIn } = useUser();
    const username = params.Name;

    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [friends, setFriends] = useState([]);
    
    const [isUser, setIsUser] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch(`/api/profile?username=${username}`);
                const data = await response.json();

                if (response.ok) {
                    setProfileData(data.user);
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
            <div className='p-5'>
                <div className='flex justify-between'>
                    <div>
                        <h1 className='text-2xl font-semibold'>Profile of {profileData?.username}</h1>
                        <h3 className='text-lg'>You are: {user?.username || user?.id}</h3>
                    </div>
                    {/* Friend request actions */}
                    {isSignedIn && !isUser && (
                        <div className='ml-auto'>
                            <FriendRequest 
                                sessionUserId={user?.username || user?.id} 
                                requestUserId={profileData?.username}  
                            />
                        </div>
                    )}
                </div>
                <br />
                {/* Friends List */}
                    <FriendsList friends={friends} />
                <br />
            </div>
        </div>
    );
}
