import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../header/header';
import homeImage from './home1.png';
import "../Home/Home.scss";

export function Home() {
    const [modalContent, setModalContent] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = (content) => {
        setModalContent(content);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
        <Header />
        <div className="container">
            <h1 className="title">Simulador</h1>
            <span className="subtitle">Selecione uma opção:</span>

            {/* Links organizados em grade */}
            <div className="link-buttons">
                <Link to="/expressaoregular">Expressões Regulares</Link>
                <Link to="/gramaticaregular">Gramática Regular</Link>
                <Link to="/automatofinito">Autômatos</Link>
            </div>

            {/* Botões informativos */}
            <div className="info-buttons">
                <button onClick={() => handleOpenModal('Expressões Regulares')}>
                    O que são Expressões Regulares?
                </button>
                <button onClick={() => handleOpenModal('Gramática Regular')}>
                    O que é Gramática Regular?
                </button>
                <button onClick={() => handleOpenModal('Autômatos')}>
                    O que são Autômatos?
                </button>
            </div>
            
            <div className="image-container">
                <img src={homeImage} alt="automatos" />
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="modal-background" onClick={handleCloseModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>{modalContent}</h2>
                        <p>{getModalText(modalContent)}</p>
                        <button onClick={handleCloseModal}>Fechar</button>
                    </div>
                </div>
            )}
        </div>
        </>
    );
}

function getModalText(content) {
    if (content === 'Expressões Regulares') {
        return 'Expressões Regulares são padrões usados para correspondência em cadeias de texto. Elas são usadas em diversas aplicações como validação de entradas e busca em texto.';
    } else if (content === 'Gramática Regular') {
        return 'Gramática Regular é um conjunto de regras que definem uma linguagem formal. É usada para descrever as estruturas das cadeias de símbolos em linguagens formais.';
    } else if (content === 'Autômatos') {
        return 'Autômatos são modelos matemáticos de máquinas que realizam computação através de transições de estados, usados para representar e resolver problemas de linguagens formais.';
    }
    return '';
}
