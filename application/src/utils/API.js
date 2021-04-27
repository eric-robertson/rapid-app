import React, { useState } from 'react'
import * as Local from './LocalStorage'
import config from './Config'

const baseURL = config.baseUrl
const getRoute = route => `${baseURL}${route}`

// Request a given route directly
export const requestRoute = async (route, body) => {
    return await fetch( getRoute(route), {
        method: 'POST',
        body: JSON.stringify( body )
    })
}

export const requestRouteCallback = async ( route, data, setResponse ) => {
    let response = await requestRoute( route, data )
    console.log({ route, code: response.status })
    let text = await response.text()
    setResponse( JSON.parse( text ).payload )
}

export const requestRoutePromise = async ( route, data ) => {
    let response = await requestRoute( route, data )
    console.log({ route, code: response.status })
    let text = await response.text()
    return JSON.parse(text).payload
}
