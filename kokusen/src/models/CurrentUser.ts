import { genRandomString } from '@/utils/helper';

export default class CurrentUser {
  static userIdStorageKey = 'user_id';
  static getOrCreate() {
    const userId = localStorage.getItem(this.userIdStorageKey);
    if (userId) {
      return userId;
    }
    const newUserId = genRandomString();
    localStorage.setItem(this.userIdStorageKey, newUserId);
    return newUserId;
  }
}
