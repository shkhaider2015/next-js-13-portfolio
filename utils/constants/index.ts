const devURL = 'http://localhost:3000/';
const prodURL = 'https://nextjswithtypescript-three.vercel.app/';

class Constants {
    private DEV_URL:string =  'http://localhost:3000/';
    private PROD_URL:string = 'http://localhost:3000/';
    
    public getBaseUrl() {
        if(process.env.NODE_ENV === 'production') return this.PROD_URL;
        else return this.DEV_URL
    }
}

const constants = new Constants();

export default constants