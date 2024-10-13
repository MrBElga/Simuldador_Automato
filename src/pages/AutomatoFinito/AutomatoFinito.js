import { useState } from "react";
import { useEffect } from "react";
import { Graphviz } from 'graphviz-react'
import {Header} from "../header/header"
import Modal from 'react-modal';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

import "./AutomatoFinito.scss";
import "./ModalState.scss";
import "./ModalTransition.scss"
import "./ModalClickNode.scss"



Modal.setAppElement('body')

export function AutomatoFinito() {
    const [graphString, setGraphString] = useState(`digraph{}`)
    const [startCheck, setStartCheck] = useState(false)
    const [finalCheck, setFinalCheck] = useState(false)
    const [clickedNode, setClickedNode] = useState("")
    const [countState, setCountState] = useState(1)
    const [states, setStates] = useState([]) //{ id: 1, name: "", start: false, final: false}
    const [countTransition, setCountTransition] = useState(1)
    const [transitions, setTransitions] = useState([]) //{ id: 1, origin_state: "", input_char: "", dest_state: ""}
    const [nodesName, setNodesName] = useState([])
    const [singleTest, setSingleTest] = useState({ id: 1, string: "", accepted: "" })
    const [count, setCount] = useState(2)
    const [tests, setTests] = useState([{ id: 1, string: "", accepted: "" },])
    const [, setStepStringArray] = useState([]);
    let stepString = []


    //Add State
    const [modalAddStateIsOpen, setModalAddStateIsOpen] = useState(false)

    const handleAddStateModal = () => {
        setModalAddStateIsOpen(prev => !prev)
    }

    const [modalClickNodeIsOpen, setModalClickNodeIsOpen] = useState(false)

    const handleClickNodeModal = () => {
        setModalClickNodeIsOpen(prev => !prev)
    }

    //Add Transition
    const [modalAddTransitionIsOpen, setModalAddTransitionIsOpen] = useState(false)

    const handleAddTransitionModal = () => {
        setModalAddTransitionIsOpen(prev => !prev)
    }
    const [modalRemoveTransitionIsOpen, setModalRemoveTransitionIsOpen] = useState(false)

    const handleRemoveTransitionModal = () => {
        setModalRemoveTransitionIsOpen(prev => !prev)
    }

    const [modalRemoveStateIsOpen, setModalRemoveStateIsOpen] = useState(false)

    const handleRemoveStateModal = () => {
        setModalRemoveStateIsOpen(prev => !prev)
    }


    useEffect(() => {
        const handleGraphvizString = () => {
            let transitionsArray = transitions

            let statesArray = states

            let string = `digraph{`
            let color = "#61DAFB"
            for (const element of statesArray) {
                string += element.name + `[shape=${element.final ? 'doublecircle' : 'circle'} style=filled  fillcolor="${element.start ? color : ''}"];`
            }
            for (const element of transitionsArray) {
                string += element.origin_state + "->" + element.dest_state + `[label=${element.input_char}]`
            }
            string += `bgcolor=transparent}`
            setGraphString(string)
        }
        handleGraphvizString();
    });


    const handleClickNode = (e) => {
        let node = e.target.textContent
        let aux = false
        if (node.length > 0 && typeof node !== "undefined") {
            aux = true
            setClickedNode(node)
            for (const element of states) {
                if (element.name === node) {
                    setStartCheck(element.start)
                    setFinalCheck(element.final)
                }
            }
            setModalClickNodeIsOpen(aux)
        }
    }

    useEffect(() => {
        let nodes = document.querySelectorAll(".graph .node")
        nodes.forEach(node => {
            node.addEventListener('dblclick', (event) => handleClickNode(event))
        })

        return () => {
            nodes.forEach(node => {
                node.removeEventListener('dblclick', (event) => handleClickNode(event))
            })
        };
    });

    const addNewState = () => {
        let value = (document.getElementsByName("add-state-input")[0].value);
        if (value !== "") {
            let aux = true
            for (const element of states) {
                if (element.name === value) {
                    aux = false
                }
            }
            if (aux) {
                let statesArray = ([...states, { id: countState, name: value, start: false, final: false }])
                setStates(statesArray)
                setCountState(countState + 1)
            }
            handleAddStateModal()
        }
    }

    const addNewTransition = () => {
        let value = (document.getElementsByName("add-transition-input")[0].value);
        let start = (document.querySelector("#add-start-transition-input")).value;

        let final = (document.querySelector("#add-final-transition-input")).value;
        if (typeof value !== 'string' || value.length < 1) {
            value = "λ"
        }
        if (value !== "") {
            let transitionsArray = ([...transitions, { id: countTransition, origin_state: start, input_char: value, dest_state: final }])
            let aux = []
            for (const element of transitionsArray) {
                aux.push({ origin_state: element.origin_state, input_char: element.input_char, dest_state: element.dest_state })
            }
            const uniqueTransitions = new Set();
            aux = aux.filter(a => {
                const key = JSON.stringify(a);
                if (uniqueTransitions.has(key)) {
                    return false;
                } else {
                    uniqueTransitions.add(key);
                    return true;
                }
            });

            transitionsArray = []
            for (let i = 0; i < aux.length; i++) {
                let id = i + 1
                transitionsArray.push({ id: id, origin_state: aux[i].origin_state, input_char: aux[i].input_char, dest_state: aux[i].dest_state })
            }

            setTransitions(transitionsArray)
            setCountTransition(countTransition + 1)
            handleAddTransitionModal()
        }
    }

    const removeState = () => {
        let stateId = parseInt((document.querySelector("#remove-state-input").value))
        let values = []
        let stateName = ""
        for (const element of states) {
            if (element.id !== stateId) {
                values.push(element)
            }
            if (element.id === stateId) {
                stateName = element.name
            }
        }
        setStates(values)
        values = []

        for (const element of transitions) {
            if (element.dest_state !== stateName && element.origin_state !== stateName) {
                values.push(element)
            }
        }
        setTransitions(values)
        handleRemoveStateModal()

    }

    const removeTransition = () => {
        let transitionId = parseInt((document.querySelector("#remove-transition-input").value))
        let values = []
        for (const element of transitions) {
            if (element.id !== transitionId) {
                values.push(element)
            }
        }
        setTransitions(values)
        handleRemoveTransitionModal()
    }

    //Tests
    const changeTestType = (event) => {
        let arrClass = event.target.classList;

        if (arrClass[2] !== "is-active") {
            event.target.classList.toggle("is-active");

            if (arrClass[0] === "single-test") {
                let multi = (document.getElementsByClassName("multi-test"))[0];
                multi.classList.toggle("is-active");

                let multi_box = (document.getElementsByClassName("multi-box"))[0];
                multi_box.style.display = "none";

                let single_box = (document.getElementsByClassName("single-box"))[0];
                single_box.style.display = "flex";

            }
            else {
                let single = (document.getElementsByClassName("single-test"))[0];
                single.classList.toggle("is-active");

                let single_box = (document.getElementsByClassName("single-box"))[0];
                single_box.style.display = "none";

                let multi_box = (document.getElementsByClassName("multi-box"))[0];
                multi_box.style.display = "block";
            }
        }
    }


    const handleClickedNodeChanges = () => {
        let startCheckbox = document.querySelector("#start-checkbox").checked
        let finalCheckbox = document.querySelector("#final-checkbox").checked
        let values = []

        if (startCheckbox) {
            for (const element of states) {
                if (element.name === clickedNode) {
                    values.push({ id: element.id, name: element.name, start: startCheckbox, final: finalCheckbox })
                }
                else {
                    values.push({ id: element.id, name: element.name, start: false, final: element.final })
                }
            }

        }

        else {
            for (const element of states) {
                if (element.name === clickedNode) {
                    values.push({ id: element.id, name: element.name, start: startCheckbox, final: finalCheckbox })
                }
                else {
                    values.push({ id: element.id, name: element.name, start: element.start, final: element.final })
                }
            }
        }
        setStates(values)
        setModalClickNodeIsOpen(false)
    }


    const AFtoGLUD = () => {
        let charCode = 65
        let transitionsAF = JSON.parse(JSON.stringify(transitions))
        let statesAF = JSON.parse(JSON.stringify(states))
        let grammar = []

        let nodeNameArray = []

        statesAF = statesAF.map(node => {
            const nonterminal = String.fromCharCode(charCode++);
            transitionsAF.forEach(tr => {
                if (tr.origin_state === node.name) tr.origin_state = nonterminal
                if (tr.dest_state === node.name) tr.dest_state = nonterminal
            })
            nodeNameArray.push({ nodeName: node.name, nodeGRName: nonterminal })
            node.name = nonterminal
            return node
        })

        for (const element of transitionsAF) {
            let rules = grammar.find(row => row.nonterminal === element.origin_state)
            if (!rules) {
                if (element.input_char === 'λ') grammar.push({ nonterminal: element.origin_state, terminal: [element.dest_state] })
                else grammar.push({ nonterminal: element.origin_state, terminal: [element.input_char + element.dest_state] })
            }
            else if (element.input_char === 'λ') rules.terminal.push(element.dest_state)
                else rules.terminal.push(element.input_char + element.dest_state)
        }

        for (const element of statesAF) {
            if (element.final) {
                let rules = grammar.find(row => row.nonterminal === element.name)
                if (!rules)
                    grammar.push({ nonterminal: element.name, terminal: ['λ'] })
                else
                    rules.terminal.push('λ')
            }
        }

        for (const element of statesAF) {
            if (element.start) {
                let rules = grammar.find(row => row.nonterminal === element.name)
                grammar = grammar.filter(item => item !== rules)
                grammar.unshift(rules)
            }
        }
        setNodesName(nodeNameArray)
        return grammar

    }

    const validateAFMult = (inputTest) => {
        let str = ""
        if (typeof inputTest !== "undefined") {
            str = inputTest
        }

        if (transitions.length > 0) {
            const grammar = AFtoGLUD()
            let currNode = ""
            for (const element of nodesName) {
                if (element.nodeGRName === grammar[0].nonterminal) {
                    currNode = element
                }
            }

            for (let rule of grammar[0].terminal) {
                stepString = []
                if (validateRule(grammar, rule, str, currNode)) {
                    setStepStringArray(stepString)
                };
            }
            return false
        }
    }

    const validateAF = (inputTest) => {
        const stateInitial = states.filter(state => state.start)
        const stateFinalArray = states.filter(state => state.final)

        if (stateInitial.length > 0 && stateFinalArray.length > 0) {
            const str = inputTest.string
            const grammar = AFtoGLUD()
            let currNode = ""
            for (const element of nodesName) {
                if (element.nodeGRName === grammar[0].nonterminal) {
                    currNode = element
                }
            }

            for (let rule of grammar[0].terminal) {
                stepString = []
                if (validateRule(grammar, rule, str, currNode)) {
                    setSingleTest({ id: inputTest.id, string: str, accepted: true })
                    setStepStringArray(stepString)
                    return true
                };
            }
            setSingleTest({ id: inputTest.id, string: str, accepted: false })
            return false
        }
        else {
            alert("Autômato inválido, defina um estado inicial e final")
        }
    }

    const validateRule = (grammar, rule, string, currNode) => {
        let currState = currNode
        if (rule.length - 1 > string.length) return false

        let proxRule = rule[rule.length - 1]

        let nextNode = ""
        for (const element of nodesName) {
            if (element.nodeGRName === proxRule) {
                nextNode = element
            }
        }
        if (proxRule === 'λ' && (rule.slice(0, rule.length - 1) === string && rule.slice(0, rule.length - 1).length === string.length)) {
            return true
        }
        if (typeof proxRule !== 'undefined') {
            if (proxRule === proxRule.toLowerCase()) {
                return rule === string
            }
        }
        let receives = rule[rule.length - 2]

        if (rule.length > 1 && rule.slice(0, rule.length - 1) !== string.slice(0, rule.length - 1)) return false

        const rules = grammar.find(row => row.nonterminal === proxRule)
        if (!rules) return false

        for (let r of rules.terminal) {
            stepString.push(`Estado atual: ${currState.nodeName} => Caractere Atual: ${receives} => Próximo estado: ${nextNode.nodeName}`)
            if (validateRule(grammar, rule.replace(proxRule, r), string, nextNode)) {
                return true
            }
        }
    }


    const handleAddTests = () => {
        setTests([...tests, { id: count, string: "" }])
        setCount(count + 1)
    }

    const handleRemoveTests = id => {
        const values = [...tests];
        values.splice(values.findIndex(value => value.id === id), 1);
        setTests(values);
    }

    const handleChangeInput = (id, event) => {
        const newInputFields = tests.map(i => {
            if (id === i.id) {
                let value = event.target.value
                i[event.target.name] = value
            }
            return i;
        })
        setTests(newInputFields)
    }

    const handleMultTest = () => {

        const stateInitial = states.filter(state => state.start)
        const stateFinalArray = states.filter(state => state.final)

        if (stateInitial.length > 0 && stateFinalArray.length > 0) {
            const newInputTests = []
            for (const element of tests) {
                let accepted = validateAFMult(element.string)
                newInputTests.push({ id: element.id, string: element.string, accepted: accepted })
            }
            setTests(newInputTests)
        }
        else {
            alert("Autômato inválido, defina um estado inicial e final")
        }

    }

    return (
        <>
        <Header />
        <div>
        
            <div className="container">

                
                <Modal
                    closeTimeoutMS={100}
                    isOpen={modalClickNodeIsOpen}
                    onRequestClose={handleClickNodeModal}
                    className="click-node-content"
                    overlayClassName="click-node-overlay"
                >
                    <div className="click-node-box">
                        <h2>Estado selecionado: {clickedNode}</h2>
                        <div className="checkbox-box">
                            <div className="checkbox-container">
                                <input type="checkbox" name="start" id="start-checkbox" checked={startCheck} onChange={() => setStartCheck(!startCheck)} />
                                <label htmlFor="start">Estado inicial</label>
                            </div>
                            <div className="checkbox-container">
                                <input type="checkbox" name="final" id="final-checkbox" checked={finalCheck} onChange={() => setFinalCheck(!finalCheck)} />
                                <label htmlFor="final">Estado final</label>
                            </div>
                        </div>


                        <div className="click-node-buttons">
                            <button className="click-node-button" onClick={handleClickedNodeChanges} >Confirmar</button>
                            <button className="cancel-node-button" onClick={handleClickNodeModal}>Cancelar</button>
                        </div>
                    </div>
                </Modal>

                <Modal
                    closeTimeoutMS={100}
                    isOpen={modalAddStateIsOpen}
                    onRequestClose={handleAddStateModal}
                    className="add-state-content"
                    overlayClassName="add-state-overlay"
                >
                    <div className="add-state-box">
                        <h2>Novo Estado</h2>
                        <p>Insira o nome do novo estado abaixo e confirme: </p>
                        <input type="text" name="add-state-input" maxLength={10} placeholder="Ex: q1" />
                        <div className="add-state-buttons">
                            <button className="add-state-button" onClick={addNewState}>Adicionar</button>
                            <button className="cancel-state-button" onClick={handleAddStateModal}>Cancelar</button>
                        </div>
                    </div>
                </Modal>

                <Modal
                    closeTimeoutMS={100}
                    isOpen={modalAddTransitionIsOpen}
                    onRequestClose={handleAddTransitionModal}
                    className="add-transition-content"
                    overlayClassName="add-transition-overlay"
                >
                    <div className="add-transition-box">
                        <h2>Nova Transição</h2>
                        <p>Insira o caractere da nova transição abaixo e confirme: </p>
                        <p>(Obs: deixe para vazio para caractere vazio)</p>
                        <input type="text" name="add-transition-input" maxLength={1} placeholder="Ex: a" />
                        <div className="select-box">
                            <div>
                                <h3>Origem:</h3>
                                <select id="add-start-transition-input">
                                    {states.map(state => (
                                        <option key={state.name} value={state.name}>{state.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <h3>Destino:</h3>
                                <select id="add-final-transition-input">
                                    {states.map((state, index) => (
                                        <option key={state.name} value={state.name}>{state.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="add-transition-buttons">
                            <button className="add-transition-button" onClick={addNewTransition}>Adicionar</button>
                            <button className="cancel-transition-button" onClick={handleAddTransitionModal}>Cancelar</button>
                        </div>
                    </div>
                </Modal>

                <Modal
                    closeTimeoutMS={100}
                    isOpen={modalRemoveStateIsOpen}
                    onRequestClose={handleRemoveStateModal}
                    className="remove-state-content"
                    overlayClassName="remove-state-overlay"
                >
                    <div className="remove-state-box">
                        <h2>Remover Estado</h2>
                        <p>Selecione o Estado que deseja remover:</p>
                        <div className="select-box">
                            <div>
                                <select id="remove-state-input">
                                    {states.map((state) => (
                                        <option key={state.id} value={state.id}>{state.name}</option>
                                    ))}
                                </select>
                            </div>

                        </div>
                        <div className="remove-state-buttons">
                            <button className="remove-state-button" onClick={removeState}>Remover</button>
                            <button className="cancel-state-button" onClick={handleRemoveStateModal}>Cancelar</button>
                        </div>
                    </div>
                </Modal>

                <Modal
                    closeTimeoutMS={100}
                    isOpen={modalRemoveTransitionIsOpen}
                    onRequestClose={handleRemoveTransitionModal}
                    className="remove-transition-content"
                    overlayClassName="remove-transition-overlay"
                >
                    <div className="remove-transition-box">
                        <h2>Remover Transição</h2>
                        <p>Selecione a Transição que deseja remover:</p>
                        <div className="select-box">
                            <div>
                                <select id="remove-transition-input">

                                    {transitions.map((transition, index) => (
                                        <option key={transition.id} value={transition.id}>{transition.origin_state + "->" + transition.dest_state + `[label: ${transition.input_char}]`}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="remove-transition-buttons">
                            <button className="remove-transition-button" onClick={removeTransition}>Remover</button>
                            <button className="cancel-transition-button" onClick={handleRemoveTransitionModal}>Cancelar</button>
                        </div>
                    </div>
                </Modal>

                <h1 className="title">Simulador de Autômatos</h1>
                <div className="page-content">
                    <div className="automaton-menu">
                        <button className="menu-button" onClick={handleAddStateModal}>Adicionar Estado</button>
                        <button className="menu-button" onClick={handleAddTransitionModal} disabled={states.length < 1} >Adicionar Transição</button>
                        <button className="menu-button" disabled={states.length < 1} onClick={handleRemoveStateModal}>Remover Estado</button>
                        <button className="menu-button" disabled={transitions.length < 1} onClick={handleRemoveTransitionModal}>Remover Transição</button>
                    </div>
                    <div id="automaton" className="automaton-box">
                        <Graphviz options={{ fit: true, scale: 1, zoom: false }} dot={graphString} />
                    </div>


                    <div className="select-test">
                        <button className="single-test select is-active" onClick={event => changeTestType(event)} >Entrada única</button>
                        <button className="multi-test select" onClick={event => changeTestType(event)} >Entradas múltiplas</button>
                    </div>
                    <div className="test-box">
                        <div className="single-box">
                            <label id="automaton-label" htmlFor="automaton-input"> TESTAR STRING</label>
                            <input type="text" name="automaton-input" placeholder="insira sua string de teste aqui" onChange={event => setSingleTest({ string: event.target.value, accepted: "" })} className={`${singleTest.accepted === true ? 'accepted' : ''}` || `${singleTest.accepted === false ? 'rejected' : ''}`} />
                            <div className="single-buttons">
                                <button className="test-button" onClick={() => validateAF(singleTest)}>Testar</button>
                                {/*<button className="step-button" onClick={handleStepByStepModal}>Step-by-step</button>*/}
                            </div>
                        </div>
                        <div className="multi-box">
                            <div className="tests-container">
                                {tests.map(test => (
                                    <div className="string-container" key={test.id}>
                                        <RemoveCircleOutlineIcon className={`remove-button ${test.id === 1 ? 'disable-button' : ''}`} disabled={test.id === 1} onClick={() => handleRemoveTests(test.id)} />
                                        <div className={`box-string ${test.id === 1 ? 'fix-margin' : ''}`}>
                                            <label htmlFor="string">TESTAR STRING</label>
                                            <input type="text" name="string" className={`${test.accepted === true ? 'accepted' : ''}` || `${test.accepted === false ? 'rejected' : ''}`} onChange={event => handleChangeInput(test.id, event)} placeholder="insira sua string de teste aqui" />
                                        </div>
                                    </div>
                                ))}
                                <div className="mult-buttons">
                                    <button className="test-button" onClick={handleMultTest} >Testar</button>
                                    <button className="add-button" onClick={handleAddTests} >+ Adicionar Teste</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}