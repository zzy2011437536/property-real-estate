const urlConstants = {
    baseURL: 'http://127.0.0.1:8000/',
    baseAvatar: 'http://s4.music.126.net/style/web2/img/default/default_avatar.jpg?param=60y60',

    register: '/user/register',
    login: '/user/login',

    getAllData: '/main/getAllData',
    getAllList: '/main/getAllList',
    getDetail: (id: string) =>  `/main/getDetail/${id}`,
    search: (id: string) => `/main/search/${id}`,

    changeStar: '/api/changeStar',
    getStars: '/api/getStars'
}

export default urlConstants