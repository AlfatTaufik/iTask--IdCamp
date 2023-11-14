const {promisify} = require('util');

function getUser(isOffline, callback){
    setTimeout(() => {
        const users = ['jaenal', 'arif', 'dimas', 'mampang'];

        if (isOffline) {
            callback(new Error("Usermu langka sing online"), null);
            return;
        };

        callback(null, users);
    });
}

const callbackToPromise = promisify(getUser);

// panggil function yang sudah menjadi promise bukan callback