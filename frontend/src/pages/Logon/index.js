import React, { useState } from 'react'
import { FiLogIn } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'

import api from '../../services/api'
import './style.css'
import heroesImg from '../../assets/heroes.png'
import logoImg from '../../assets/logo.svg'

const Logon = () => {
  const [id, setId] = useState('')

  const history = useHistory()

  if (localStorage.getItem('ongId') && localStorage.getItem('ongName')) {
    history.push('/profile')
  }

  const handleLogon = async (e) => {
    e.preventDefault()
    try {
      const response = await api.post('sessions', { id })
      localStorage.setItem('ongId', id)
      localStorage.setItem('ongName', response.data.name)
      history.push('/profile')
    } catch (e) {
      alert('Falha no login, tente novamente')
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be the Hero" />
        <form onSubmit={handleLogon}>
          <h1>Faça seu logon</h1>
          <input
            type="text"
            placeholder="Sua ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <button className="button" type="submit">Entrar</button>

          <Link className="nav-link" to="/register">
            <FiLogIn size={16} color="#E02041" />
            Não tenho cadastro
          </Link>
        </form>
      </section>

      <img src={heroesImg} alt="Ilustração de pessoas se abraçando" />
    </div>
  )
}

export default Logon
