import { useState } from 'react';
import Friend from './Friend';

export default function FriendsList({ friends, isUser}) {
    const [showOverlay, setShowOverlay] = useState(false);

    const handleOverlayToggle = () => setShowOverlay(!showOverlay);

    return (
        <div>
            {/* Display number of friends and trigger overlay */}
            <div 
                onClick={handleOverlayToggle} 
                className="cursor-pointer space-x-1 text-white"
            >
                <p className='text-xs'>{friends.length} Friends</p>
            </div>

            {/* Overlay */}
            {showOverlay && (
                <div className="fixed inset-0 bg-[#121212] bg-opacity-95 flex justify-center items-center z-50">
                    <div className="bg-[#1E1E1E] p-5 rounded-lg w-80 text-white">
                        <h2 className="text-lg font-bold mb-4">Friends List</h2>
                        <ul>
                            {friends.map(friend => (
                                <li key={friend.id} className="mb-2">
                                    <Friend friend={friend} isUser = {isUser}/>
                                </li>
                            ))}
                        </ul>
                        <button 
                            onClick={handleOverlayToggle} 
                            className="mt-4 bg-blue-700 text-white py-1 px-4 rounded hover:bg-blue-600 transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
