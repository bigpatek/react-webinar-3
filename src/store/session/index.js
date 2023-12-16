import StoreModule from "../module";

class SessionState extends StoreModule{
    
    initState() {
        return {
        username: "",
        x_token: "",
        error: "",
        isAuth: false,
        isWaiting: true,
        }
    }

    deleteError(){
        this.setState({
            ...this.getState,
            error: ""
        } 
        )
    }

    async login(user){
        await fetch('api/v1/users/sign', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: { 'Content-Type' : 'application/json'}
        })
        .then(res => res.json())
        .then(json => {
            if(!json.error){
                this.setState({
                    ...this.getState,
                    username: json.result.user.profile.name,
                    x_token: json.result.token,
                    isAuth: true
                } 
                )
                localStorage.setItem('x_token', json.result.token)
            }
            else{
                this.setState(
                    {
                        ...this.getState,
                        error: json.error.message
                    }
                )
            }
            
        }
        )
    }

    async logout(){
        await fetch('api/v1/users/sign', {
            method: 'DELETE',
            headers: { 
                'Content-Type' : 'application/json',
                'X-Token' : localStorage.getItem('x_token')
                }
        })
        .then(res => res.json())
        .then(json => {
            if(json.result === true){
                this.setState({
                    ...this.getState,
                    username: "",
                    x_token: "",
                    error: "",
                    isAuth: false,
                    isWaiting: false,
                } 
                )
                localStorage.removeItem('x_token')
            }
        })
    }

    async getProfile() {
        if(localStorage.getItem('x_token')){
            await fetch('api/v1/users/self?fields=*', {
                method: 'GET',
                headers: { 
                    'Content-Type' : 'application/json',
                    'X-Token' : localStorage.getItem('x_token').toString()
                    }
            })
            .then(res => res.json())
            .then(json => {
                this.setState({
                    ...this.getState,
                    username: json.result.profile.name,
                    isAuth: true,
                    isWaiting: false
                } 
                )
            })
        }
    else{
            this.setState({
                ...this.getState,
                isWaiting: false
            } 
            )
        }
    }
}

export default SessionState;