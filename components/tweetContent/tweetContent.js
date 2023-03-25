import Layout from "../Layout";
import Navigate from "../Navigate";
import Cover from "../Cover";
import TweetText from "./tweetText";
import CommentBox from "./commentBox";
import CommentText from "./commentText";

export default function TweetContent(){
    return(
        <div className="w-full flex flex-col justify-center items-center">
            <div className="w-full justify-start items-stretch pb-10">
                <div className="px-5 pt-2">
                    <Navigate title="Tweet"/>
                </div>
                <div>
                    <TweetText content="testing testing" time="Mar 23" />
                </div>
                <div>
                    <CommentBox />
                </div>
                <div>
                    <CommentText />
                </div>
                <div>
                    <CommentText content="test1" nopic="true" />
                </div>
                <div>
                    <CommentText authorname="John Doe" authorid="johndoe" avatarpic="https://picsum.photos/id/1005/40/40" content="test2" picture="https://pbs.twimg.com/media/EKJt7R6XYAEzdvt.png" />
                </div>
                <div>
                    <CommentText authorname="beeper" authorid="c_beeper" content="reply (unfinished)" avatarpic="https://1.gravatar.com/avatar/69119e7cc6b6fed2cbc852051081eda0" picture="https://ksbeeper.files.wordpress.com/2020/11/e5b18fe5b995e688aae59bbe-2021-02-23-163818.gif" />
                </div>
            </div>
        </div>
    );
}