import { useState } from "react";
import { Header } from "../header/header";
import Image from './exp.png';
import QuizIcon from '@mui/icons-material/Quiz';
import DeleteIcon from '@mui/icons-material/Delete';
import CodeIcon from '@mui/icons-material/TextFields';


import "./ExpressaoRegular.scss"


export function ExpressaoRegular() {
    const [count, setCount] = useState(2)
    const [tests, setTests] = useState([{ id: 1, string: "", accepted: ""},])

    const handleChangeRegex = () => {
        let newInputFields;
        let regex_input = document.getElementsByName("regex-input")[0];
        let regex_label = document.getElementById("regex-label");

        if(validate("") === "error"){
            regex_input.style.background = "red";
            regex_label.innerHTML = "EXPRESSÃO REGULAR <span class='error-msg'>(Erro de síntaxe)</span> ";

            newInputFields = tests.map(i => {
                i['accepted'] = "";
                
                return i;
            })
        }
        else{
            regex_input.style.background = "#D8D2C2";
            regex_label.innerHTML = "EXPRESSÃO REGULAR";

            newInputFields = tests.map(i => {
                i['accepted'] = validate(i.string);
                
                return i;
            })
        }

        setTests(newInputFields);
        console.log(tests)
    }

    const handleAddTests = () => {
        let validation = validate("");;
        setTests([...tests, { id: count, string: "", accepted: ((validation === "error") ? "" : validation) }])
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
                let value = event.target.value;
                let validation = validate(value);
                i[event.target.name] = value;
                if(validation === "error"){
                    i['accepted'] = "";
                }
                else{
                    i['accepted'] = validation;
                }
            }
            return i;
        })
        
        setTests(newInputFields);
    }

    const validate = value => {
        try{
            let regex_input = (document.getElementsByName("regex-input")[0]).value;
            let regex = new RegExp(regex_input);
            return (regex_input === "") ? "" : (regex.test(value) ? "true"  : "false");
        }
        catch(e){
            return "error";
        }
        
    }
    return (
        <div> 
            <Header />
          <div className="container">
          <h1 className="title">
            <CodeIcon style={{ fontSize: 40, marginRight: '10px' }} />
            Expressão Regular
          </h1>

            <div className="page-content">
              <div className="RegEX">
                <label id="regex-label" htmlFor="regex-input">EXPRESSÃO REGULAR</label>
                <input 
                  type="text" 
                  name="regex-input" 
                  onChange={handleChangeRegex} 
                  placeholder="Insira sua expressão regular aqui" 
                />
              </div>
      
              <div className="tests-title">
                <QuizIcon className="science-icon" />
                <h2>Testes</h2>
              </div>
      
              <div className="tests-container">
                {tests.map(test => (
                  <div className="string-container" key={test.id}>
                    <DeleteIcon 
                      className={`remove-button ${test.id === 1 ? 'disable-button' : ''}`} 
                      disabled={test.id === 1} 
                      onClick={() => handleRemoveTests(test.id)}
                    />
      
                    <div className={`box-string ${test.id === 1 ? 'fix-margin'  : ''}`}>
                      <label htmlFor={`string-${test.id}`}>String de Teste</label>
                      <input 
                        type="text" 
                        name="string" 
                        className={`input-string ${test.accepted === '' ? 'base' : test.accepted === "true" ? 'accepted' : 'rejected'}`} 
                        value={test.string} 
                        onChange={event => handleChangeInput(test.id, event)} 
                        placeholder="Insira sua string de teste aqui" 
                      />
                    </div>
                  </div>
                ))}
      
                <div className="box-button">
                  <button className="add-button" onClick={handleAddTests}>+ Adicionar Teste</button>
                </div>
              </div>
            </div>
            <div className="image-container">
                <img src={Image} alt="automatos" />
            </div>
          </div>
          
        </div>
      );
      
}