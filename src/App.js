import React, { useReducer, useRef, useEffect, useState } from "react";
import {Routes, Route} from "react-router-dom";
import './App.css';
import Home from "./pages/Home";
import New from "./pages/New";
import Diary from "./pages/Diary";
import Edit from "./pages/Edit";

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function reducer(state, action) {
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      return [action.data, ...state];
    }
    case "UPDATE": {
      return state.map((it) =>
        String(it.id) === String(action.data.id) ? {...action.data} : it
      );
    }
    case "DELETE": {
      return state.filter((it) => String(it.id) !== String(action.targetId));
    }
    default: {
      return state;
    }
  }
}
const mockData = [
  {
    id: "mock1",
    date: new Date().getTime() - 1,
    content: "mock1",
    emotionId: 1,
  },
  {
    id: "mock2",
    date: new Date().getTime() - 2,
    content: "mock2",
    emotionId: 2,
  },
  {
    id: "mock3",
    date: new Date().getTime() - 3,
    content: "mock3",
    emotionId: 3,
  },
]

function App() {
  const [isDataLoadded, setIsDataLoaded] = useState(false);
  const [data, dispatch] = useReducer(reducer, []);
  /* 
    useRecure를 이용하면 컴포넌트에서 상태변화코드를 분리한다. --> 컴포넌트 내부에서 작성했던 상태변화코드를 외부에 작성할 수 있다.
    useState를 이용해 State를 생성하면 상태변화코드는 반드시 컴포넌트 안에 작성해야 한다.
    배열의 첫 번째 요소는 State 변수이고 두 번째 요소는 상태변화를 촉발하는 함수 dispatch이다. 
    const [state변수, 상태변화촉발함수] = 생성자(상태변화함수, 초깃값)
  */
  const idRef = useRef(0);
  /* 
    Ref로 돔(DOM) 요소들을 조작할 수 있음. useRef로 Ref 객체 생성
  */
  useEffect(() => {
    dispatch({
      type: "INIT",
      data: mockData,
    })
    setIsDataLoaded(true)
  }, [])
  /*
    useEffect는 어떤 값이 변경될 때마다 특정코드를 실행하는 리액트 훅
    useEffect(콜백함수, 의존성배열)
    의존성 배열이 빈 배열이면 콜백함수는 마운트 시점에 호출되어 함수 dispatch 호출
  */
  const onCreate = (date, content, emotionId) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current,
        date: new Date(date).getTime(),
        content,
        emotionId,
      },
    });
  }
  const onUpdate = (targetId, date, content, emotionId) => {
    dispatch({
      type: "UPDATE",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotionId,
      }
    })
  }
  const onDelete = (targetId) => {
    dispatch({
      type: "DELETE",
      targetId,
    })
  }
  if (!isDataLoadded) {
    return <div>데이터를 불러오는 중입니다.</div>
  }
  else {
    return (
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider
          value={{
            onCreate,
            onUpdate,
            onDelete,
          }}
        >
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/diary/:id" element={<Diary />} />
              <Route path="/edit/:id" element={<Edit />} />
            </Routes>
          </div>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    );
  }
}

export default App;
