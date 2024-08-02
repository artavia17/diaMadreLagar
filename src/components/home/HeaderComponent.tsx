'use client';

import Image from "next/image";
import LogoLagar from '../../assets/img/lagar_logo.svg';
import { FormEvent, useState } from "react";

const HeaderComponent = () => {

    const [name, setName] = useState('<span>E</span><span>l</span><span>l</span><span>a</span>');

    const registerName = (e : FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        
        const value = e.currentTarget.value;

        if(value.length){
            const arrayValue = value.split('').map(letter => `<span>${letter}</span>`).join('');
            setName(arrayValue);
            localStorage.setItem('name',arrayValue);
        }else{
            setName('<span>E</span><span>l</span><span>l</span><span>a</span>');
            localStorage.setItem('name','<span>E</span><span>l</span><span>l</span><span>a</span>');
        }

    }

    return (
        <header>
            <section className="lagar-logo">
                <Image src={LogoLagar.src} alt="El Lagar" width={LogoLagar.width} height={LogoLagar.height}/>
            </section>
            <section className="responsive-box">
                <form className="" onSubmit={e => e.preventDefault()}>
                    <label htmlFor="name">¿Cómo se llama tu mamá?</label>
                    <input onInput={registerName} type="text" name="name" id="name" placeholder="Escribe aquí el nombre..."/>
                </form>
                <section className="box-name">
                    <h2 aria-hidden="true" dangerouslySetInnerHTML={{ __html: name }}></h2>
                    <p dangerouslySetInnerHTML={{__html: `Las mejores herramientas, son las que da ${name}`}}></p>
                </section>
            </section>
        </header>
    )

}

export default HeaderComponent;