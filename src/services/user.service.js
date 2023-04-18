import { storageService } from "./async-storage.service";
const STORAGE_KEY_LOGGEDIN_USER = "loggedinUser";

export const userService = {
  getUser,
  login,
  logout,
  signup,
  transferCoins,
};

function getUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER));
}

async function login(userCred) {
  const users = await storageService.query("user");
  const user = users.find((user) => user.username === userCred.username);
  // const user = await httpService.post('auth/login', userCred)
  if (user) {
    return saveLocalUser(user);
  }
}

async function logout() {
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER);
  // return await httpService.post('auth/logout')
}

async function signup(userCred) {
  console.log("userCred: ", userCred);
  userCred.coins = 100;
  userCred.moves = [];
  // if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
  const user = await storageService.post("user", userCred);
  // const user = await httpService.post('auth/signup', userCred)
  return saveLocalUser(user);
}

function saveLocalUser(user) {
  user = {
    _id: user._id,
    fullname: user.fullname,
    username: user.username,
    coins: user.coins,
    moves: user.moves,
  };
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user));
  return user;
}

function _createMove(contact, amount) {
  const newMove = {
    toId: contact._id,
    to: contact.name,
    at: Date.now(),
    amount,
  };
  return newMove;
}

function transferCoins(contact, amount) {
  const user = getUser();
  if (!user) return;

  const move = _createMove(contact, amount);
  user.moves = [move, ...user.moves];
  console.log("amount: ", amount);
  console.log("user.coins: ", user.coins);
  user.coins -= amount

  storageService.put("user", user);
  return saveLocalUser(user);
}
