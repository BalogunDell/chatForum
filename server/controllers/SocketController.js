import moment from 'moment';
import {
  decodeToken,
  saveMessage,
  getForumMessages,
  getPrivateMessages,
  getResource,
} from '../utils/helpers';

import { forum, user, privatemessage } from '../models';

/**
 * @description Socket events
 *
 * @class SocketController
 */
class SocketController {
  /**
   * @static
   *
   * @param {object} socket
   *
   * @memberof SocketController
   *
   * @returns {object} response from server
   */
  static onConnet(socket) {
    // Define array to hold all conneted users
    let connectedUsers = [];

    // Connect
    socket.on('connect', (client) => {
      const clientConnectionToken = client.handshake.query.token;

      // deconde token
      decodeToken(clientConnectionToken, client)
        .then((decoded) => {
          const {
            id
          } = decoded;
          
          getResource(user, id)
            .then((response) => {
              response.dataValues.sessionId = client.id;
              const {
                username,
                sessionId
              } = response.dataValues;

              const result = connectedUsers.find(connectedUser =>
                connectedUser.username === username);
    
                // Check if the user is not already in the online users list
              if (!result) {
                connectedUsers.push({ username, sessionId, id });
              }
    
              // Check upon page refresh if user id has changed and the user is
              // still active, replace sessionId and keep user
              connectedUsers.map((connectedUser, index) => {
                if (connectedUser.sessionId !== client.id
                  &&
                  connectedUser.username === username) {
                  connectedUsers.splice(index, 1);
                  connectedUsers.push({
                    username: result.username,
                    sessionId: client.id,
                    id
                  });
                }
              });
    
              /**
               * @description returns list of users online except present socket
               *
               * @param {object} error
               *
               * @param {array} clients
               *
               * @returns {object} List of users
               */
              socket.sockets.emit('all users online', {
                clientId: client.id,
                users: connectedUsers
              });
    
              /**
               * @description broadcast that a new member is here
               *
               * @param {object} error
               *
               * @param {array} clients
               *
               * @returns {object} List of users
               */
              client.broadcast.emit('new joined', ({ username }));
    
    
              /**
               * @description get all message and broadcast to all
               *
               * @param {object} forum model to fetch from
               *
               *
               * @returns {object} Forum messages
               */
              getForumMessages(forum)
                .then((forumMessages) => {
                  client.emit('forum messages', forumMessages);
                })
                .catch(() => { });
            })
            .catch(() => {
              client.emit('authentication error', ('invalid/expired token'));
            });
        })
        .catch(() => {
          connectedUsers.map((connectedUser, index) => {
            if (connectedUser.sessionId !== client.id) {
              connectedUsers.splice(index, 1);
              client.emit('authentication error', ('invalid/expired token'));
            }
          });
        });

      /**
       * @description saves and returns saved message
       *
       * @param {string} -- connection string
       *
       *
       * @returns {object} update list of users
       */
      client.on('typing', (userTyping) => {
        client.broadcast.emit('user typing', userTyping);
      });


      /**
       * @description Updates all users when a user starts typing
       *
       * @param {string} -- connection string
       *
       *
       * @returns {object} update list of users
       */
      client.on('new message', (messageObject) => {
        const timeSent = moment().format('MMMM Do YYYY, h:mm a');
        const { message, senderId } = messageObject;
        const payload = {
          message,
          senderId,
          timeSent
        };
        // Save message to database
        saveMessage(forum, payload)
          .then((response) => {
            const savedMessage = {
              message: response.dataValues.message,
              sender: messageObject.sender,
              timeSent: response.dataValues.timeSent
            };
            // Emit saved message back to client
            socket.sockets.emit('new saved message', savedMessage);
          })
          .catch((error) => {
            socket.sockets.emit('error saving message', error);
          });
      });

      /**
       * @description Updates all users when a user starts typing
       *
       * @param {string} -- connection string
       *
       *
       * @returns {object} update list of users
       */
      client.on('new private message', (messageObject) => {
        const timeSent = moment().format('MMMM Do YYYY, h:mm a');
        const {
          senderId,
          receiverId,
          message,
          receiverSessionId,
          users
        } = messageObject;
        const payload = {
          message,
          senderId,
          receiverId,
          receiverSessionId,
          timeSent,
          users
        };
        // Save new private message to database
        saveMessage(privatemessage, payload)
          .then((response) => {
            client.to(receiverSessionId)
              .emit('saved private message', response);
            client.emit('saved private message', response);
          })
          .catch((error) => {
            console.log(error);
          });
      });

      /**
       * @description fetch private message history
       *
       * @param {object} -- user IDs
       *
       *
       * @returns {object} chat history
       */
      client.on('fetch chat history', (payload) => {
        const { currentUser, chatPartnerUserId } = payload;
        getPrivateMessages(privatemessage, currentUser, chatPartnerUserId)
          .then((response) => {
            client.emit('chat history', response);
          })
          .catch((error) => {
            console.log(error);
          });
      });

      /**
       * @description Updates number of people online
       *
       * @param {string} -- connection string
       *
       *
       * @returns {object} update list of users
       */
      client.on('disconnect', () => {
        const remainingUsers = connectedUsers.filter(connectedUser =>
          connectedUser.sessionId !== client.id);
        connectedUsers = remainingUsers;
        socket.sockets.emit('all users online', {
          clientId: client.id,
          users: connectedUsers,
        });
      });
    });
  }
}
export default SocketController;
