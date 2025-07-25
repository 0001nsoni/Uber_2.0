import { Server } from 'socket.io';
import userModel from './models/user.model.js';
import captainModel from './models/captain.model.js';
let io;

function initializeSocket(server) {
    io = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    });
    io.on('connection', (socket) => {
        console.log(`Client connected: ${socket.id}`);
        socket.on('join', async (data) => {
            const { userId, userType } = data;
            try {
                if (userType === 'user') {
                    // console.log("got request for user")
                    await userModel.findByIdAndUpdate(userId, {
                        socketId: socket.id
                    });
                } else if (userType === 'captain') {
                    await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
                }

            } catch (err) {
                console.error('Error updating socketId:', err);
            }
        });
        socket.on('update-location-captain',async (data)=>{
            const {userId,location}=data;
            if(!location||!location.ltd||!location.lng)
            {
                return socket.emit('error',{message:"Invalid location data"})
            }
            console.log(`User ${userId} update location to ${location}`);
                await captainModel.findByIdAndUpdate(userId,{location:{
                    ltd:location.ltd,
                    lng:location.lng
                }})
            
        })
        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
}

function sendMessageToSocketId(socketId, event, message) {
    if (io) {
        io.to(socketId).emit(event, message);
    } else {
        console.log('Socket.io not initialized');
    }
}

export { initializeSocket, sendMessageToSocketId };