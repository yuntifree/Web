import Cookies from 'js-cookie';

const user = {
    state: {
      url: 'http://120.76.236.185:9898/',
      users: {
        uid: '',
        token: ''
      }
    },
    mutations: {
        logout (state, vm) {
            Cookies.remove('user');
            localStorage.clear();
        }
    }
};

export default user;
