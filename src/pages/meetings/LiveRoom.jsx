import React, { useState } from 'react';
import { Video, Mic, Share, Users } from 'lucide-react';

const LiveRoom = () => {
    const [joined, setJoined] = useState(false);
    const roomName = "ShalomvillePTA_General";

    if (!joined) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-4">
                <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 mb-6 animate-pulse">
                    <Video className="w-10 h-10" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Live Meeting Room</h1>
                <p className="text-gray-500 max-w-md mb-8">
                    Join the Virtual PTA meeting to discuss school updates and student progress. 
                    Camera and Microphone access will be requested.
                </p>
                <div className="flex flex-col gap-3 w-full max-w-xs">
                    <button 
                        onClick={() => setJoined(true)}
                        className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary-500/20 transition-all flex items-center justify-center gap-2"
                    >
                        <Video className="w-5 h-5" />
                        Join Meeting Now
                    </button>
                    <button className="bg-white border border-gray-200 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-50 transition-all">
                        Test Microphone
                    </button>
                </div>
                <p className="mt-8 text-xs text-gray-400">Powered by Jitsi Meet (Secure & Encrypted)</p>
            </div>
        );
    }

    return (
        <div className="h-[calc(100vh-100px)] bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-800 relative">
            <iframe
                src={`https://meet.jit.si/${roomName}#config.prejoinPageEnabled=false`}
                allow="camera; microphone; fullscreen; display-capture; autoplay"
                className="w-full h-full border-0"
                title="Shalomville Meeting"
            ></iframe>
            
            {/* Overlay Controls (Mock for visual richness if iframe covers them, usually Jitsi handles its own controls) */}
        </div>
    );
};

export default LiveRoom;
