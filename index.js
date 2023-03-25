// Importa el hook useState de React
import { useState } from 'react'

// Importa el hook useRouter de Next.js
import { useRouter } from 'next/router'

// Define el componente Profile
export default function Profile() {
  
  // Usa el hook useRouter para obtener acceso al objeto Router
  const router = useRouter()
  
  // Define dos estados iniciales usando el hook useState
  const [id, setId] = useState('') // id es el id de Steam del usuario
  const [profileData, setProfileData] = useState(null) // profileData son los datos del perfil del usuario

  // Define una función asincrónica handleSubmit que se ejecuta cuando se envía el formulario
  async function handleSubmit(event) {
    event.preventDefault() // Evita que la página se recargue cuando se envía el formulario

    // Hace una solicitud a la API de Steam para obtener los datos del perfil del usuario
    const response = await fetch(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key="""API KEY"""&steamids=${id}`)
    const data = await response.json() // Convierte la respuesta a un objeto JSON
    setProfileData(data.response.players[0]) // Establece los datos del perfil del usuario en el estado del componente
  }

  // Si no se ha obtenido aún ningún dato del perfil del usuario, muestra un formulario
  if (!profileData) {
    return (
      <form onSubmit={handleSubmit}>
        <label>
          Ingrese su ID de Steam:
          <input type="text" value={id} onChange={event => setId(event.target.value)} />
          {/* Cuando el usuario escribe su ID de Steam, actualiza el estado del componente */}
        </label>
        <button type="submit">Buscar</button>
      </form>
    )
  }

  // Si se han obtenido los datos del perfil del usuario, muestra la información del perfil
  var status;
  if (profileData.personastate==1) {
    status="Online"; // Si el usuario está en línea, establece el estado en "Online"
  } else
  if (profileData.personastate==0) {
    status="Offline"; // Si el usuario está fuera de línea, establece el estado en "Offline"
  } else {
    status="Absent"; // Si el usuario está ausente, establece el estado en "Absent"
  }
// Define una variable bannedStatus para mostrar el estado de baneo del usuario
  const bannedStatus = profileData.vacbanned ? 'Baneado por VAC' : 'No baneado por VAC';

  return (
    <div>
      <h1>{profileData.personaname}</h1>
      <p>Steam ID: {profileData.steamid}</p>
      <p>Nombre real: {profileData.realname}</p>
      <p>Fecha de creación: {new Date(profileData.timecreated * 1000).toLocaleString()}</p>
      <p>Pais: {profileData.loccountrycode}</p>
      <p>Status: {status}</p>
      <p>Estado de baneo: {bannedStatus}</p>
      <p>Url de perfil: {profileData.profileurl}   <br></br> <a href={`https://steamcommunity.com/profiles/${profileData.steamid}`}>Ir al perfil de Steam</a></p> 
      <p>Ultima sesion: {new Date(profileData.lastlogoff * 1000).toLocaleString()}</p>
     
      
      {/* Muestra la información del perfil del usuario, incluyendo su estado actual */}
      <img src={profileData.avatarfull} alt="Avatar" />
    </div>
  )
}
