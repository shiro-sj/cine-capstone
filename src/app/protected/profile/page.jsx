'use client';
import { useUser } from '@clerk/nextjs';
import { useState, useEffect } from 'react';
import axios from 'axios';
import FriendRequest from '@/app/components/friends/FriendRequest';
import NavBar from "@/app/components/navbar";
import FriendsList from '@/app/components/friends/FriendsList';
import FriendRequestList from '../../components/friends/FriendRequestList';
import CSVUploader from '@/app/components/csvUploader';

export default function Profile() {
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
        <div>
            <NavBar />
            <div className='p-7'>
                <div className='flex justify-between'>
                    <div className='flex items-center'>
                        <img 
                            src={user?.imageUrl} 
                            alt="description of image" 
                            className='w-24 h-24 rounded-full object-cover'
                        />
                        <div className='ml-3'>
                            <h1 className='font-semibold text-xl'>{user?.username}</h1>
                            <FriendsList friends={friends} isUser = {isUser}/>
                        </div>
                    </div>
                    {/* Friend requests positioned on the top right */}
                    {isSignedIn && !isUser && (
                        <div className='ml-auto'>
                            <FriendRequest 
                                sessionUserId={user?.username || user?.id} 
                                requestUserId={profileData?.username}  
                            />
                        </div>
                    )}
                    <div className='mt-5'>
                        <FriendRequestList receivedRequests={receivedRequests} sentRequests={sentRequests} />
                    </div>
                </div>
                <br />
                <CSVUploader/>
                <div>
                    <h1>Favorites</h1>

                    <h1>Watchlist</h1>

                    <h1>Stats</h1>
                </div>
                
            </div>
        </div>
    );
}
