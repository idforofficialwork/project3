import { useEffect, useState } from "react";
import Button from "./Button";
import "./DiaryList.css";
import { useNavigate } from "react-router-dom";
import DiaryItem from "./DiaryItem";

const sortOptionList = [
    {value: "latest", name: "최신순"},
    {value: "oldest", name: "오래된 순"},
];

const DiaryList = ({data}) => {
    const onChangeSortType = (e) => {
        setSortType(e.target.value);
    }
    const navigate = useNavigate();
    const onClickNew = () => {
        navigate("/new");
    }
    const [sortType, setSortType] = useState(["latest"]);
    const [sortedData, setSortedData] = useState([]);

    useEffect(() => {
        const compare = (a, b) => {
            if (sortType === 'latest') {
                return Number(b.date) - Number(a.date);
            } else {
                return Number(a.date) - Number(b.date);
            }
        }
        const copyList = JSON.parse(JSON.stringify(data));
        copyList.sort(compare);
        setSortedData(copyList);
    }, [data, sortType]);
    /*
        useEffect - 어떤값이 변경될 때마다 특정 코드를 실행하는 리액트 훅 
        useEffect(콜백함수, 의존성배열)
        JSON.stringfy() - Javascript 값이나 객체를 JSON 문자열로 변환
        JSON.parse() - JSON 문자열의 구문을 분석하고, 그 결과를 Javascript 값이나 객체로 생성
        sort 메서드는 원본 배열을 정렬해서 정렬결과를 별도의 배열로 만들기 위해 복사함
    */
    return (
        <div className="DiaryList">
            <div className="menu_wrapper">
                <div className="left_col">
                    <select value={sortType} onChange={onChangeSortType}>
                        {sortOptionList.map((it, idx) => (
                            <option key={idx} value={it.value}>
                                {it.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="right_col">
                    <Button type={"positive"} text={"새 일기 쓰기"} onClick={onClickNew}/>
                </div>
            </div>
            <div className="list_wrapper">
                {sortedData.map((it)=> (
                    <DiaryItem key={it.id} {...it} />
                ))}
            </div>
        </div>
    );    
};
export default DiaryList;