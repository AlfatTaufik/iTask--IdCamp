// promise untuk melihat apakah user offline atau tidak, dengan asynchronus proses

function getUser(isOffline) {

    return new Promise((resolve, reject) => {
// asynch
setTimeout(() => {
        const users = ["Dandy", "Ikbal", "Fandy"];
        if(isOffline) {
            reject(new Error("Sorry mad user lagi offline"));
            return;
        };

        resolve(users);


        } ,3000);
    });
}

getUser(false)
    .then(users => console.log(users))
    .catch(error => console.log(error.message))