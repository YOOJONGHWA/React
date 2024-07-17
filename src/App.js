/* eslint-disable */

import './App.css';
import { useState } from 'react';

function App() {
  let [글제목 , 글제목변경] = useState(['남자 코트 추천','여자 코트 추천','아동 코트 추천']);
  let [logo , setLogo] = useState('ReactBlog');
  let [좋아요, count] = useState([0,0,0]);
  let [modal, setModal] = useState(false);
  let [title, setTitle] = useState(0);
  let [입력값, 입력값변경] = useState('');

  return (
    <div className="App">
      <div className="black-nav">
        <h4 style={ {color : 'red', fontSize : '20px'} }>{logo}</h4>
      </div>
      { 
        글제목.map(function(a, i){
            return (
              <div className="list" key={i}>
                <h4 onClick={() => {setModal(!modal); setTitle(i)}}>{ 글제목[i] } 
                  <span onClick={(e)=>{ e.stopPropagation(); let copy = [...좋아요];copy[i] = copy[i] + 1;count(copy)}}>👍</span> {좋아요[i]} 
                </h4>
                <p>2월 18일 발행</p>
                <button onClick={()=>{ 
                  let copy = [...글제목];
                  copy.splice(i, 1);
                  글제목변경(copy);
                  let 좋아요Copy = [...좋아요];
                  좋아요Copy.splice(i, 1);
                  count(좋아요Copy);
                 }}>삭제</button>             
              </div> )
        }) 
      }

      <div>
        <input value={입력값} onChange={ (e)=>{ 입력값변경(e.target.value) } } />
        <button onClick={()=>{ 
          if (!입력값.trim()) {
            return;
          }
          let copy = [...글제목];
          copy.unshift(입력값);
          글제목변경(copy);
          입력값변경('');
          count([0, ...좋아요]);
        }} disabled={!입력값.trim()}>글발행</button>
      </div>

      { 
        modal ? <Modal title={title} 글제목변경={글제목변경} color="yellow" 글제목={글제목} /> : null
      }

    </div>
  );
}

function Modal(props) {
  return (
    <div className='modal' style={ {background : props.color} }>
      <h4>{ props.글제목[props.title] }</h4>
      <p>날짜</p>
      <p>상세내용</p>
      <button onClick={() => {
          let copy = [...props.글제목];
          copy[props.title] = '여자코트 추천';
          props.글제목변경(copy);
      }}>글수정</button>
    </div>
  )
}

export default App;
