import Layout from "../Layout";
import Navigate from "../Navigate";
import Cover from "../Cover";
import TweetText from "./tweetText";
import CommentBox from "./commentBox";

export default function TweetContent(){
    return(
        <div className="w-full flex flex-col justify-center items-center">
            <div className="w-full justify-start items-stretch pb-10">
                <div className="px-5 pt-2">
                    <Navigate title="Tweet"/>
                </div>
                <div>
                    <TweetText content="testing testing"/>
                </div>
                <div>
                    <CommentBox />
                </div>
            </div>
            <div>
                reply (unfinished)
            </div>
        </div>
    );
}