export const getUsersFromStackOverflow = () => {
    return new Promise( (resolve,reject)=> {
        fetch('https://api.stackexchange.com/2.2/users?pagesize=20&order=desc&sort=reputation&site=stackoverflow')
        .then((response) => response.json())
        .then((json) => {
          resolve(json);
        })
        .catch((error) => {
          reject(error);
        });
    })
  };
  