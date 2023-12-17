import StoreModule from "../module";

class ProfileState extends StoreModule{

    initState() {
        return {
        username: "",
        phone: "",
        email: "",
        }
    }

    async setUser(token) {
        if(token){
            await fetch('api/v1/users/self?fields=*', {
                method: 'GET',
                headers: { 
                    'Content-Type' : 'application/json',
                    'X-Token' : token
                    }   
            })
            .then(res => res.json())
            .then(json => {
                if(json.result){
                    this.setState({
                        ...this.getState,
                        username: json.result.profile.name,
                        phone: json.result.profile.phone,
                        email: json.result.email,
                    } 
                    )
                }
            })
        }
    }
    
}

export default ProfileState;