import React, { useState } from 'react';


const Form = ({ setInputText, todos, setTodos, inputText, setStatus }) => {
    const [isError, setIsError] = useState(false);

    const inputTextHandler = (e) => {
        setInputText(e.target.value);
    };

    const submitTodoHandler = (e) => {
        e.preventDefault();

        if (inputText === '') {
            setIsError(true);
            return;
        }
        setIsError(false);

        setTodos([
            ...todos,
            { text: inputText, completed: false, id: Math.random() * 1000 }
        ]);
        setInputText("");
    };

    const statusHandler = (e) => {
        setStatus(e.target.value);
    }

    return (
        <form>
            <input
                value={inputText}
                onChange={inputTextHandler}
                type="text"
                className="todo-input"
            />
            <button onClick={submitTodoHandler} className="todo-button" type="submit">
                <i className="fas fa-plus-square"></i>
            </button>
            <div className="select">
                <select onChange={statusHandler} name="todos" className="filter-todo">
                    <option value="all">Tudo</option>
                    <option value="completed">Feitas</option>
                    <option value="uncompleted">Nao Feitas</option>
                </select>
            </div>
            {isError && (
                <p>Preencha o campo</p>
            )}
        </form>
    );
};

export default Form;