import { useParams } from "react-router-dom";
import { DisplayReviews } from "../../Review/displayReviews";
export function DocReviews(){
    const { id } = useParams();
    return(
        <div>
            <DisplayReviews docId={id} patId=""></DisplayReviews>
        </div>
    )
}