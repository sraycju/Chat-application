const users = [];

//Join to chat
function userJoin(id, username){
    const user = {id, username};
    users.push(user);

    return user;
}

//Get current user
function getCurrentUser(id){
    return users.find(user => user.id === id)
}
//User leaves chat
function userLeave(id){
    const index = users.findIndex(user => user.id === id);

    if(index !== -1){
        return users.splice(index,1)[0];
    }    
}

// Get room users
function getChatUsers(name) {
    return users.filter(user => user.username === name);
  }


module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getChatUsers
};