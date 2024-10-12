import {Link} from 'react-router-dom'
import "../Home/Home.scss"

export function Home() {

    return(
        <div className="container">
             <h1 className="title">Simulador</h1>
             <span>Selecione uma opção:</span>
             <Link to="/expressaoregular">Expressões Regulares</Link>
             <Link to="/gramaticaregular">Gramática Regular</Link>
             <Link to="/automatofinito">Autômatos</Link>
        </div>
    )
    
  }