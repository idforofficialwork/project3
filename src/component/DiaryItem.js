import { useNavigate } from "react-router-dom";
/* 리액트 앱에서 뒤로 가기 이벤트가 동작하려면 react-router-dom의 useNavigate 훅을 이용해야 한다 */

import { getEmotionImgById } from "../util";
import "./DiaryItem.css";
import Button from "./Button";

const DiaryItem = ( {id, emotionId, content, date}) => {
    const navigate = useNavigate();
    const goDetail = () => {
        navigate(`/diary/${id}`);
    }
    /* 이미지 섹션을 클릭하면 해당 일기를 상세 조회하는 페이지로 이동하는 이벤트 핸들러를 만든다. */

    const goEdit = () => {
        navigate(`/edit/${id}`)
    }

    return (
        <div className="DiaryItem">
            <div onClick={goDetail} className={["img_section", `img_section_${emotionId}`].join(" ")}>
                <img alt={`emotion${emotionId}`} src={getEmotionImgById(emotionId)} />
            </div>
            <div onClick={goDetail} className="info_section">
                <div className="date_wrapper">
                    {new Date(parseInt(date)).toLocaleDateString()}
                </div>
                <div className="content_wrapper">
                    {content.slice(0, 25)}
                </div>
            </div>
            <div className="button_section">
                <Button onClick={goEdit} text={"수정하기"} />
            </div>
        </div>
    );
}
export default DiaryItem;