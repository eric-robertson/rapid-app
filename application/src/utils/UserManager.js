import * as API from './API'
import * as Local from './LocalStorage';
import Config from './Config'
import { useState } from 'react/cjs/react.development';

let userData = undefined;

export const userAccountExists = async ( exists ) => {
    let user = await Local.userIdExists()
    exists( user )
}

export const pullUser = async ( ) => {
    let id = await Local.getUserId()
    userData = await API.requestRoutePromise( 'read', {id} )
    return userData
}

export const createUser = async ( data ) => {
    // Application specific info here
    let accountData = {}
    accountData[Config.appSignup] = data

    // Create account
    let response = await API.requestRoutePromise( 'create', {item:accountData} )
    console.log({response})
    let id = response.id

    // Save id
    await Local.setUserId(id)

    // Pull User
    await pullUser()

}

export const useUser = ( ) => {
    const [user,setUser] = useState( undefined )

    if ( ! user )
        pullUser().then( setUser )

    return user
}