import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'
import { api } from '@/lib/axios'
import logo from '../assets/logo.jpg' 
import Swal from 'sweetalert2'
const inter = Inter({ subsets: ['latin'] })

export default function cadastro() {
    const [email,    setEmail]     = useState('');
    const [senha,    setSenha]     = useState('');
    const [nome,     setNome]      = useState('');
    const [urlavatar,seturlavatar] = useState('');
    const router = useRouter();
    
    async function Cadastro(event: FormEvent){
        event.preventDefault()
        try {
          const response = await api.post("/usuario",{
            nome : nome,
	          urlavatar: urlavatar,
	          email : email,
	          senha : senha
          })
            if(response.status === 200){
              setEmail("")
              setSenha("")
              seturlavatar("")
              setNome("")
              alert("Usuario cadastrado com sucesso!")
              router.push("/login")
            }
            
        } catch (error) {
          console.log(error)
          Swal.fire({
            icon: 'error',
            title: 'Preencha todos os campos',
            text: 'Insira seus dados corretamente!', 
          }) 
        }
    } 


  return (<>
   <nav>
          <ul>
            <li><a href="/">
              <Image src={logo} className='logo' alt=''/>
              </a></li>
            <li><a href="#"></a></li>
            <li><a href="#"></a></li>
            <li><a href="#"></a></li>
            <li><a href="#"></a></li>
            
            <li><a href="#"> </a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/cadastro">Cadastro</a></li>
          </ul>
        </nav>
      <Head>
        <title>Cadastro</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="https://curso.guilhermegulias.com/wp-content/uploads/2022/01/cropped-LOGO-NYNO-SEM-BORDA-PRA-LOGO.jpg" />
      </Head>
      <main className={styles.main}>
       
        <h1><img src='https://curso.guilhermegulias.com/wp-content/uploads/2022/01/cropped-LOGO-NYNO-SEM-BORDA-PRA-LOGO.jpg' width={30}></img>
            Cadastre-se
        </h1>
        <form onSubmit={Cadastro}>
          <br></br>
          <input type="text"  onChange={event => setNome(event.target.value)}     value={nome} className='input' id="" placeholder="Digite seu nome"/>
          <br></br>
          <input type="email" onChange={event => setEmail(event.target.value)}    value={email} className='input' id="" placeholder="Digite seu e-mail"/>
          <br></br>
          <input type="text"  onChange={event => seturlavatar(event.target.value)} value={urlavatar} className='input' id="" placeholder="Cole a URL da sua foto"/>
          <br></br>
          <input type="text"  onChange={event => setSenha(event.target.value)}    value={senha} className='input' name="senha" id="" placeholder="Digite sua senha" />
          <br></br>
          <div align="right">
            <a href="/">Ja tenho uma conta</a>
          </div>
          <div align="center">
            <input type="submit" id='enviar' value="Cadastrar" />
          </div>   
          <br></br> 
          <br></br> 
          <br></br> 
          <br></br> 
          <br></br> 
        </form>
      </main>
  </>)
}