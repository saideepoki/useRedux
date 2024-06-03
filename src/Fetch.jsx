import React from 'react';
import { useReducer } from 'react';


export default function Fetch() {

    const initialState = {
        data: [],
        isLoading: false,
        error: null
    };

    const reducer = (state, action) => {
        console.log(state,action);
         switch(action.type) {
           case 'FETCH_DATA_START': {
               return {
                   ...state,
                   isLoading: true
               }
           }

           case 'FETCH_DATA_SUCCESS': {
            return {
              data: action.payload,
              isLoading: false,
              error: null
            }
           }

           case 'FETCH_DATA_ERROR': {
            return {
                ...state,
                isLoading: false,
                error: true
            }
           }

           case 'ADD_DATA': {
            return {
                ...state,
                data: [...state.data,action.payload],
            }
           }

           case 'DEL_DATA': {
            console.log(state.data);
            return {
                ...state,
                data: state.data.filter((item) =>
                   item.id !== action.payload
                )
            }
           }

           default: {
           }

        }
    }
    
    const [users,dispatch] = useReducer(reducer, initialState);

    async function fetchData() {
      dispatch({type: 'FETCH_DATA_START'});

      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        dispatch({
            type: 'FETCH_DATA_SUCCESS',
            payload: data
        })
        console.log(data);
      }catch(error) {
        dispatch({
            type:'FETCH_DATA_ERROR',
            error: error.message
        });
      }
    }

    function addData(newData) {
       dispatch({
        type:'ADD_DATA',
        payload: newData});
    }

    function deleteData (id) {
       dispatch({
        type: 'DEL_DATA',
        payload: id
       }
      )
    }

    return (
        <div>
        <button onClick = {fetchData}>Fetch data</button>
        {users.isLoading && <h2>Loading....</h2>}
        {users.error && <h2>{users.error}</h2>}
        <ul>
           {
            users.data.map((item) => {
                return (
                <div>
                <li key = {item.id}>{item.name}
                <button onClick = {()=> deleteData(item.id)}>Delete</button>
                </li>
                </div>
                );
            })
           }
        </ul>
        <form onSubmit = {(event) => {
            event.preventDefault();
            console.log(event);
            addData({
                id: Date.now(),
                name: event.target.add.value
            })
            event.target.reset();
        }}>
        <input type = 'text' name = 'add'/>
        <button type = 'submit'>Add Data</button>    
        </form>
        </div>
    )
}

