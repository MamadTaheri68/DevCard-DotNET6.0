import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import styled from "styled-components";
import { getArticlesAPI } from "../../actions";
import PostModal from "./PostModal";

const MainSideComponent = (props) => {
    const [showModal, setShowModal]  = useState("close");
    console.log(props.articles)

    useEffect(() => {
        props.getArticles();
    }, [])

    const handleClick = e => {
        e.preventDefault();
        if (e.target !== e.currentTarget) {
            return;
        }
        switch (showModal) {
            case "open":
                setShowModal("close");
                break;
            case "close":
                setShowModal("open");
                break;
           
        }
    }
 
    return (
        <>
        {
        props.articles.length === 0 ? (
         <p>Ther are no articles</p>
        ) : (
        <Container>
            <ShareBox>
            <div>
                {
                    props.user && props.user.photoURL ? 
                        <img src={props.user.photoURL} alt="user" />
                        :
                        <img src="/images/user.svg" alt="user" />

                }
                <button 
                 disabled={props.loading ? true : false} 
                 onClick={handleClick}
                 >
                     Start a post</button>
            </div>
            <div>
                <button>
                    <img src="/images/photo.png" alt="photo" />
                    <span>Photo</span>
                </button>
                <button>
                    <img src="/images/video.png" alt="video" />
                    <span>Video</span>
                </button>
                <button>
                    <img src="/images/poll.png" alt="video" />
                    <span>Poll</span>
                </button>
                <button>
                    <img src="/images/article.png" alt="article" />
                    <span>Write Article</span>
                </button>
            </div>
            </ShareBox>
            <Content>
                {
                   props.loading && <img src="/images/spinner.png" alt="spinner" />
                }
                {
                    props.articles. length > 0 &&
                    props.articles.map((article, key) => (
                    <Article >
                        <SharedActor>
                            <a>
                                <img src={article.actor.image} alt="user" />
                                <div>
                                    <span>{article.actor.title}</span>
                                    <span>{article.actor.description}</span>
                                    <span>{article.actor.date.toDate().toString()}</span>
                                </div>
                            </a>
                            <button>
                                <img src="/images/ellipsis.svg" alt="ellipsis" />
                            </button>
                        </SharedActor>
                        <Description>{article.description}</Description>
                        <SharedImg>
                            <a>
                                {
                                    !article.sharedImg && article.video ? 
                                    <ReactPlayer width={'100%'} url={article.video} /> 
                                    :
                                    (
                                        article.sharedImg && <img src={article.sharedImg} alt="aaaaa" />
                                    )
                                }
                            </a>
                        </SharedImg>
                        <SocialCounts>
                            <li>
                                <button>
                                    <img src="/images/like.png" alt="like" />
                                    <img src="/images/celebrate.png" alt="celebrate" />
                                    <span>75</span>
                                </button>
                            </li>
                            <li><a>{article.comments} comments</a></li>
                        </SocialCounts>
                        <SocialActions>
                            <button>
                                <img src="/images/btnlike.png" alt="btnlike" />
                                <span>Like</span>
                            </button>
                            <button>
                                <img src="/images/btncomment.png" alt="btncomment" />
                                <span>Comments</span>
                            </button>
                            <button>
                                <img src="/images/btnshare.png" alt="btnshare" />
                                <span>Share</span>
                            </button>
                            <button>
                                <img src="/images/btnsend.png" alt="btnsend" />
                                <span>Send</span>
                            </button>
                        </SocialActions>
                    </Article>
                    ))
                }
            
            </Content>
            <PostModal showModal={showModal} handleClick={handleClick} />
        </Container>
        )}
        </>
    );
}

const Container = styled.div`
    grid-area: main;
`;

const CommonCard = styled.div`
    text-align: center;
    overflow: hidden;
    margin-bottom: 8px;
    background-color: #fff;
    border-radius: 5px;
    position: relative;
    border: none;
    box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb90 0 0 / 20% ;
`;
const ShareBox = styled(CommonCard)`
    display: flex;
    flex-direction: column;
    color: #958b7b;
    margin: 0 0 8px;
    background: white;
    div {
        button {
            outline: none;
            color: rgba(0,0,0,0.6);
            font-size: 14px;
            line-height: 1.5;
            min-height: 48px;
            background: transparent;
            border: none;
            display: flex;
            align-items: center;
            font-weight: 600; 
            img {
                width: 40px;
                height: 40px;
            }
        }
        &:first-child {
            display: flex;
            align-items: center;
            padding: 8px 16px 0px 16px;
            img {
                width: 48px;
                border-radius: 50%;
                margin-right: 8px;
            }
            button {
                margin: 4px 0;
                flex-grow: 1;
                border-radius: 35px;
                padding-left: 16px;
                border: 1px solid rgba(0,0,0,0.15);
                background-color: white;
                text-align: left;
            }
        }
        &:nth-child(2) {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            padding-bottom: 4px;
            button {
                img {
                    margin: 0 4px 0 -2px;
                }
                span {
                    color: #70b5f9;
                }
            }
        }
    }
`;

const Article = styled(CommonCard)`
    padding: 0;
    margin: 0 0 8px;
    overflow: visible;
`;

const SharedActor = styled.div`
    padding-right: 40px;
    flex-wrap: nowrap;
    padding: 12px 16px 0;
    margin-bottom: 8px;
    align-items: center;
    display: flex;
    a {
        margin-right: 12px;
        flex-grow: 1;
        overflow: hidden;
        display: flex;
        text-decoration: none;
        img {
            width: 48px;
            height: 48px;
        }
        & > div {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            flex-basis: 0;
            margin-left: 8px;
            overflow: hidden;
            span {
                text-align: left;
                &:first-child {
                    font-size: 14px;
                    font-weight: 700;
                    color: rgba(0,0,0,1);
                }
                &:nth-child(n+1) {
                    font-size: 12px;
                    color: rgba(0,0,0,0.6);
                }
            }
        }
    }
    button {
        position: absolute;
        right: 12px;
        top: 0;
        background: transparent;
        border: none;
        outline: none;
        cursor: pointer;
        border-radius: 50%;
        img {
            width: 20px;
            height: 20px;
        }
        &:hover {
            background-color: rgba(0,0,0,0.1);
        }
    }
`;

const Description = styled.div`
    padding: 0 16px;
    overflow: hidden;
    color: rgba(0,0,0,0.9);
    font-size: 14px;
    text-align: left;
`;

const SharedImg = styled.div`
    margin-top: 8px;
    width: 100%;
    display: block;
    position: relative;
    background-color: #f9fafb;
    img {
        object-fit: contain;
        width: 100%;
        height: 100%;
    }
`;

const SocialCounts = styled.ul`
    line-height: 1.3;
    display: flex;
    align-items: center;
    overflow: auto;
    margin: 0 16px;
    padding: 8px 0;
    border-bottom: 1px solid #e9e5df;
    list-style: none;
    li {
        margin-right: 5px;
        font-size: 12px;
        button {
            display: flex;
            align-items: center;
            justify-content: center;
            border: none;
            outline: none;
            background-color: white;
            img {
                width: 20px;
                height: 20px;
            }
        }
    }
`;

const SocialActions = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: 0;
    min-height: 40px;
    padding: 4px 8px;
    button {
        display: inline-flex;
        align-items: center;
        padding-left: 8px;
        color: #0a66c2;
        border: none;
        outline: none;
        background-color: white;
        img {
            width: 40px;
            height: 40px;
        }
        @media (min-width: 768px) {
            span {
                margin-left: 8px;
            }
        }
    }
`;

const Content = styled.div`
    text-align: center;
    &>img {
        width: 90px;
    }
`;

const mapStateToProps = state => {
    return {
        loading: state.articleState.loading,
        user: state.userState.user,
        articles: state.articleState.articles,
    }
}

const mapDispatchToProps = dispatch => ({
    getArticles: () => dispatch(getArticlesAPI()),

});

export default connect(mapStateToProps, mapDispatchToProps)(MainSideComponent);