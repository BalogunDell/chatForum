import socketioJWT from 'socketio-jwt';
import { decodeToken } from '../utils/helpers';

const secret = process.env.SECRET;

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
          decoded.sessionId = client.id;
          const {
            username,
            sessionId
          } = decoded;
          
          const result = connectedUsers.find(user =>
            user.username === username);

            // Check if the user is not already in the online users list
          if (!result) {
            connectedUsers.push({ username, sessionId });
          }

          // Check upon page refresh if user id has changed and the user is
          // still active, replace sessionId and keep user
          connectedUsers.map((user, index) => {
            if (user.sessionId !== client.id && user.username === username) {
              connectedUsers.splice(index, 1);
              connectedUsers.push({
                username: result.username,
                sessionId: client.id
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
          

          client.on('message', (message) => {
            console.log(message, 'recived');
          });
        })
        .catch(() => {
          connectedUsers.map((user, index) => {
            if (user.sessionId !== client.id) {
              connectedUsers.splice(index, 1);
              client.emit('authentication error', ('invalid/expired token'));
            }
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
        const remainingUsers = connectedUsers.filter(user =>
          user.sessionId !== client.id);
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
