// Config Class
class WebConfigFile {
    constructor() {
        // Property Initialization
        this.API_DOMAIN_URL = "";
    }
}

// Config Instance
const webConfig = new WebConfigFile();

// for local below url
 webConfig.API_DOMAIN_URL = "http://localhost:2700";

//for production below url
// webConfig.API_DOMAIN_URL = "https://rasta.aiunika.com:2000";

export default webConfig;
