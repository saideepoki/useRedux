// Copyright 2024 Saideep
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     https://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import React from 'react';
import { useReducer } from 'react';

export default function UseReducer() {

    const reducer = (state,action) => {
        console.log(action);
        if(action.type === 'INC') {
            return {count: state.count + 1};
        }
        else if(action.type === 'DEC') {
            return {count: state.count - 1};
        }
    }


    const[state, dispatch] = useReducer(reducer,{count:0});

    function handleInc() {
        dispatch({type: 'INC'})
    }

    function handleDec() {
        dispatch({type:'DEC'});
    }


    return (
        <div>
           <h1>{state.count}</h1>
           <button onClick = {handleInc}>+</button>         
           <button onClick = {handleDec}>-</button>         
        </div>
    )
}