'use client';
import { FormEvent, useEffect, useRef, useState } from "react";
import { createClient } from '@supabase/supabase-js';
import Image from "next/image";
import HomeImage from '../../assets/img/happy_day.png';
import downloadjs from 'downloadjs';
import html2canvas from 'html2canvas';
import React, { forwardRef, useImperativeHandle } from 'react';


const FormComponent = forwardRef((props, ref) => {

    
    

    const supabaseUrl = 'https://cbrpwbonvjolaknkszsg.supabase.co'
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNicnB3Ym9udmpvbGFrbmtzenNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI1NTQ3NDUsImV4cCI6MjAzODEzMDc0NX0.K2xSMHzs77KsxqwqDjzk9i-L98ABoCg18_dAhP3cD1U';
    const supabase = createClient(supabaseUrl, supabaseKey);
    const [send, setSend] = useState('Participar');
    const [enviado, setEnviado] = useState(false);
    const [motherName, setMotherName] = useState('');
    const elementRef = useRef(null);
    const [tag, setTag] = useState<any>();



    useImperativeHandle(ref, () => ({
        showAlert() {
            const name = localStorage.getItem('name');
        
            if(name){
                setMotherName(name);   
            }else{
                setMotherName('<span>E</span><span>l</span><span>l</span><span>a</span>');
            }

            setTimeout(()=>{
                htmlToImageConvert();
            }, 50)
        }
      }));


    const sendForm = async (e : FormEvent) => {
        e.preventDefault();

        const form : HTMLFormElement = e.target as HTMLFormElement;
        const allInputs : NodeListOf<HTMLInputElement> = form.querySelectorAll('input');
        const items: any = {};

        if(!validateForm(allInputs)){
            return;
        }

        setSend('Guardando...')


        allInputs.forEach(e => {

            const query = e.getAttribute('name');
            const value = e.value; 

            if(query){
                items[query] = value;
                e.disabled = true;
            }

        })

        try{



            const { data, error } : any = await supabase
                .from('Participantes')
                .insert([
                    {
                        tools: items["tools"],
                        full_name: items['full_name'],
                        code: items['code'],
                        phone: items['phone'],
                        email: items['email'],
                        terms: items['terms']
                    },
                ])
                .select()
            
            if(data){
                setEnviado(true);
            }else{
                alert('Ocurrio un error')
            }

            allInputs.forEach(e => {
                e.value = '';
                e.disabled = false;
            })

            setSend('Participar');

            
            
        }catch(err){
            alert('Ocurrio un error, intentelo mas tarde')
        }

        setTimeout(() => {
            htmlToImageConvert();
        }, 100)


    }

    const validateForm = (element: NodeListOf<HTMLInputElement>) => {

        let send = true;

        element.forEach(e => {
            const query = e.type;
            const value = e.value;
            const parent = e.parentElement;
            const errorElement = parent?.querySelector('.error');
            const phonePattern = /^[0-9]{8}$/;

            if(query == 'text' && !value.length){
                send = false;
                if(!errorElement){
                    parent?.insertAdjacentHTML('beforeend', '<p class="error">Este campo es requerido</p>')
                }else{
                    errorElement.textContent = 'Este campo es requerido';
                }
            }else if(query == 'text' && value.length){
                errorElement?.remove();
            }

            if(query == 'number' && !value.length){

                send = false;
                if(!errorElement){
                    parent?.insertAdjacentHTML('beforeend', '<p class="error">Este campo es requerido</p>')
                }

            }else if(query == 'number' && !phonePattern.test(value)){
                send = false;
                if(!errorElement){
                    parent?.insertAdjacentHTML('beforeend', '<p class="error">El número de teléfono no es válido</p>')
                }else{
                    errorElement.textContent = 'Este campo es requerido';
                }
            }else if(query == 'number'){
                errorElement?.remove();
            }


            if(query == 'email' && !value.length){

                send = false;
                if(!errorElement){
                    parent?.insertAdjacentHTML('beforeend', '<p class="error">Este campo es requerido</p>')
                }else{
                    errorElement.textContent = 'Este campo es requerido';
                }

            }else if(query == 'email' && !validateEmail(value)){
                send = false;
                if(!errorElement){
                    parent?.insertAdjacentHTML('beforeend', '<p class="error">El correo electrónico no es válido</p>')
                }else{
                    errorElement.textContent = 'El correo electrónico no es válido';
                }
            }else if(query == 'email'){
                errorElement?.remove();
            }

            if(query == 'checkbox' && !value){
                send = false;
                if(!errorElement){
                    parent?.insertAdjacentHTML('beforeend', '<p class="error">Los terminos y condiciones son requeridos</p>')
                }else{
                    errorElement.textContent = 'Los terminos y condiciones son requeridos';
                }
            }else{
                errorElement?.remove();
            }



        });

        return true;

    }

    const validateEmail = (email: string) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
    };


    const htmlToImageConvert = async () => {


        const dowloadImage : HTMLElement | null = document.querySelector('.image_descargar');

        console.log('Cargo')

        if(dowloadImage){
            console.log('Entro');

            const canvas = await html2canvas(dowloadImage);

            console.log(canvas);
            // const dataURL = canvas.toDataURL('image/png');
            // const response = await fetch(dataURL);
            // const imageBlob = await response.blob();
            // const imageUrl = URL.createObjectURL(imageBlob);
            // console.log(imageUrl);
        }

        if(elementRef.current){

            const canvas = await html2canvas(elementRef.current, { useCORS: true, allowTaint: true });
            const dataURL = canvas.toDataURL('image/png');
            const response = await fetch(dataURL);
            const imageBlob = await response.blob();
            const imageUrl = URL.createObjectURL(imageBlob);
            setTag(imageUrl);

        }
    };

    return(
        <section className="form">
                <section className="container">
                    <section className="box">
                        {
                            enviado ? (
                                <h1 className="responsive-box">Ya estás participando por un regalo para tu mamá.</h1>
                            ) : (
                                <>
                                    <h3 className="responsive-box">Llená este formulario y</h3>
                                    <h1 className="responsive-box">Participá por tarjetas de regalo digitales para tu mamá</h1>
                                </>   
                            )
                        }
                    </section>
                    {
                        enviado ? (
                            <form className="responsive-box" onSubmit={sendForm}>
                                <section className="form">
                                    <span className="center">Si querés descargá esta imagen, compartila en tus stories y etiquetanos.</span>
                                </section>
                                <section className="double insert_button_dowload ">
                                    <a className="send" href={tag} download target="_black">Descargar</a>
                                    {/* <a href="">
                                        <Image  className="logo" src={InstagramIcon.src} alt="El Lagar" width={InstagramIcon.width} height={InstagramIcon.height}/>
                                    </a> */}
                                </section>
                            </form>
                        ) : (
                            <form className="responsive-box" onSubmit={sendForm}>
                                <section className="form">
                                    <label className="item" htmlFor="tools">
                                        <span>¿Cuál herramienta para la vida te dió tu mamá?</span>
                                        <input type="text" name="tools" id="tools" required/>
                                    </label>
                                    <label className="item" htmlFor="full_name">
                                        <span>Tu nombre completo</span>
                                        <input type="text" name="full_name" id="full_name" required/>
                                    </label>
                                    <section className="medium-two-columns item">
                                        <label htmlFor="phone">Tu número de teléfono</label>
                                        <section>
                                            <input type="text" name="code" id="code" disabled value="+506"/>
                                            <input type="number" name="phone" id="phone" required/>
                                        </section>
                                    </section>
                                    <label className="item" htmlFor="email">
                                        <span>Tu correo electrónico</span>
                                        <input type="email" name="email" id="email" required/>
                                    </label>
                                    <label className="item terms" htmlFor="terms">
                                        <input type="checkbox" name="terms" id="terms" required/>
                                        <span>Aceptar términos y condiciones</span>
                                    </label>
                                </section>
                                <button className="send" type="submit" disabled={send === 'Guardando...' ? true : false}>{send}</button>
                            </form>
                        )
                    }
                </section>
                    <div 
                        ref={elementRef}
                        className="image_descargar"
                        style={{
                            width: "400px",
                            height: "500px",
                            position: "relative",
                            overflow: "hidden",
                            zIndex: 999,
                            display: enviado ? "flex" : "none",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundImage: `url(${HomeImage.src})`
                        }}
                    >

                        {/*<Image 
                            src={HomeImage.src} 
                            alt="El Lagar dia de la madre" 
                            width={HomeImage.width} 
                            height={HomeImage.height}
                            style={{
                                width: "400px",
                                height: "500px",
                                position: "absolute",
                                top: "0px",
                                left: "0px",
                                zIndex: -1,
                                objectFit: "cover",
                            }}
                        />*/}

                        <section 
                            className="text"
                            style={{
                                transform: "translateY(80px)",
                                textAlign: "center",
                                width: "300px",
                                top: "-15px",
                                position: "relative",
                            }}
                        >
                                <h4 
                                    className="title_image"
                                    dangerouslySetInnerHTML={{__html: motherName ? motherName : '<span style="color:#FDB913">E</span><span style="color:#FDB913">l</span><span>l</span><span>a</span>'}} 
                                    aria-hidden="true"
                                    style={{
                                        fontSize: "50px",
                                        margin: "0px",
                                        color: "#ED1C24"
                                    }}
                                ></h4>
                                <p 
                                    dangerouslySetInnerHTML={{__html: `Las mejores herramientas, son las que da ${motherName ? motherName : '<span>E</span><span>l</span><span>l</span><span>a</span>'}`}}
                                    style={{
                                        fontSize: "15px",  
                                        margin: "0px",
                                        color: "#96877C",
                                    }}
                                ></p>
                        </section>

                    </div>
        </section>
    )

});

FormComponent.displayName = 'FormComponent';

export default FormComponent;