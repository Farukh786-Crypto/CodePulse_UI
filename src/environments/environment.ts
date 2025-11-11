export let CODEBASEURL = "";

if(typeof window !== 'undefined'){
    switch(window.location.hostname){
        case 'localhost':
            CODEBASEURL = 'http://localhost:5029/api/'; 
            break;
        // case 'dev.example.com':
        //     CODEBASEURL = 'http://dev.example.com/api/';
        //     break;
        default:
            CODEBASEURL = 'http://localhost:5029/api/';
            break;
    }
}


export const environment = {
    CODEBASEURL: 'http://localhost:5029/api/',
    production: false
};
