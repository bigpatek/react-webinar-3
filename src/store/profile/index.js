import StoreModule from "../module";

class ProfileState extends StoreModule{

    initState() {
        return {
        username: "",
        phone: "",
        email: "",
        x_token: "",
        isAuth: false,
        error: ""
        }
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
                    phone: json.result.user.profile.phone,
                    email: json.result.user.email,
                    x_token: json.result.token,
                    isAuth: true
                } 
                )
                console.log(json)
                localStorage.setItem('x_token', json.result.token)
            }
            else{
                this.setState(
                    {
                        ...this.getState,
                        error: json.error.message
                    }
                )
                console.log(json.error)
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
                    phone: "",
                    email: "",
                    x_token: "",
                    isAuth: false
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
                    phone: json.result.profile.phone,
                    email: json.result.email,
                    isAuth: true
                } 
                )
                console.log(json)
            })
        }
      }

      

}

export default ProfileState;