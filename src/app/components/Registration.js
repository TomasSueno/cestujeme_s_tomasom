"use client"

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import password_hidden from '../resources/images/password_hidden.png'
import password_eye from '../resources/images/password_eye.png'

export default function Registration() {

    const [passwordIcon, setPasswordIcon] = useState('\'password_hidden\'')
    function changeImage() {
        if(passwordIcon = 'password_hidden') {
            setPasswordIcon('password_eye')
        } else {
            setPasswordIcon('password_hidden')
        }
        
    }
   
    return(
        <div className="registrationPageBody">
            <form className="registration_form">
            <h1>Sign in</h1>
            <label>Email</label>
            <input type="email" required></input>

            <label>Password</label>
            <input type="password" required></input>
            {/* <Image onClick={changeImage} src={passwordIcon} width={10} height={10} alt="hidden password"></Image> */}

            <button type="submit">Sign in</button>
            <Link href="\"><button>Registrate</button></Link>
           
        </form>
        </div>
    )
}